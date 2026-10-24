import {EntityStore2d} from '@antha/entity-2d';
import {createMockPixi} from '@antha/graphics-2d';
import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {type LevelDefinition} from '../level/level.js';
import {defaultLevel, levels} from '../level/levels.js';
import {createInitialRunState, RunStatus, type RunState} from '../run/run-state.js';
import {TowerType} from '../tower/tower-type.js';
import {TowerEntity} from '../tower/tower.entity.js';
import {gameCommandHandlers} from './game-command-handlers.js';
import {GameCommandType, type GameCommand} from './game-command.js';
import {gameEntities} from './game-entities.js';
import {type FullGameState} from './game-state.js';

/** Slot 0 defends a path along the top, slot 1 along the bottom. */
const twoSlotLevel: LevelDefinition = {
    ...defaultLevel,
    paths: [
        {
            pathId: 'top',
            ownerSlot: 0,
            waypoints: [
                {
                    x: 0,
                    y: 200,
                },
                {
                    x: 800,
                    y: 200,
                },
            ],
            widthPx: 60,
        },
        {
            pathId: 'bottom',
            ownerSlot: 1,
            waypoints: [
                {
                    x: 0,
                    y: 900,
                },
                {
                    x: 800,
                    y: 900,
                },
            ],
            widthPx: 60,
        },
    ],
    restaurant: {
        x: 1500,
        y: 540,
        sizePx: 200,
    },
};

function createInstance(): FullGameState {
    const state: Partial<FullGameState> = {
        level: twoSlotLevel,
    };

    state.entityStore = new EntityStore2d({
        pixi: createMockPixi() as any,
        state,
        assetLoader: {} as any,
        preregisteredEntities: gameEntities,
    });
    state.runState = createInitialRunState();
    state.runState.status = RunStatus.Playing;

    return state as FullGameState;
}

async function send(state: FullGameState, sourceClientId: string, command: GameCommand) {
    await (
        gameCommandHandlers[command.type] as (params: {
            detail: unknown;
            state: FullGameState;
        }) => unknown
    )({
        detail: {
            packet: command,
            sourceClientId,
        },
        state,
    });
}

/** Avoids stale type narrowing of `state.runState` across awaited commands. */
function getRun(state: FullGameState): RunState {
    return state.runState;
}

function getTowers(state: FullGameState) {
    return [...state.entityStore.getEntities(TowerEntity)];
}

describe('player slots', () => {
    it('assigns slots in join order and ignores a repeated JoinRun', async () => {
        const state = createInstance();

        await send(state, 'a', {
            type: GameCommandType.JoinRun,
            name: 'Ann',
        });
        await send(state, 'b', {
            type: GameCommandType.JoinRun,
        });
        await send(state, 'a', {
            type: GameCommandType.JoinRun,
        });
        await send(state, 'b', {
            type: GameCommandType.JoinRun,
        });

        assert.deepEquals(state.runState.slotByClientId, {
            a: 0,
            b: 1,
        });
        assert.deepEquals(state.runState.slotNames, {
            0: 'Ann',
            1: 'Player 2',
        });
        assert.deepEquals(getRun(state).connected, {
            0: true,
            1: true,
        });
    });

    it('StartRun gives the sender slot 0', async () => {
        const state = createInstance();

        await send(state, 'host', {
            type: GameCommandType.StartRun,
            seed: 's',
        });
        await send(state, 'guest', {
            type: GameCommandType.JoinRun,
        });

        assert.deepEquals(state.runState.slotByClientId, {
            host: 0,
            guest: 1,
        });
    });

    it('places towers owned by the sender slot', async () => {
        const state = createInstance();
        await send(state, 'a', {
            type: GameCommandType.JoinRun,
        });
        await send(state, 'b', {
            type: GameCommandType.JoinRun,
        });

        await send(state, 'b', {
            type: GameCommandType.PlaceTower,
            towerType: TowerType.Knife,
            x: 400,
            y: 800,
        });

        assert.strictEquals(getTowers(state).length, 1);
        assert.strictEquals(getTowers(state)[0]?.params.ownerSlot, 1);
    });

    it('rejects placement far from the sender slot own path', async () => {
        const state = createInstance();
        await send(state, 'a', {
            type: GameCommandType.JoinRun,
        });
        await send(state, 'b', {
            type: GameCommandType.JoinRun,
        });

        /** Fine for slot 0 (near the top path) but 600 px from slot 1's path. */
        await send(state, 'b', {
            type: GameCommandType.PlaceTower,
            towerType: TowerType.Knife,
            x: 400,
            y: 300,
        });
        assert.strictEquals(getTowers(state).length, 0);

        await send(state, 'a', {
            type: GameCommandType.PlaceTower,
            towerType: TowerType.Knife,
            x: 400,
            y: 300,
        });
        assert.strictEquals(getTowers(state).length, 1);
        assert.strictEquals(getTowers(state)[0]?.params.ownerSlot, 0);
    });

    it('lets any slot sell any tower (team play default policy)', async () => {
        const state = createInstance();
        await send(state, 'a', {
            type: GameCommandType.JoinRun,
        });
        await send(state, 'b', {
            type: GameCommandType.JoinRun,
        });
        await send(state, 'a', {
            type: GameCommandType.PlaceTower,
            towerType: TowerType.Knife,
            x: 400,
            y: 300,
        });
        const coinsBefore = state.runState.coins;
        const towerId = getTowers(state)[0]?.params.towerId ?? -1;

        await send(state, 'b', {
            type: GameCommandType.SellTower,
            towerId,
        });

        assert.isTrue(state.runState.coins > coinsBefore);
    });

    it('LeaveRun frees the slot and a new client reclaims it', async () => {
        const state = createInstance();
        await send(state, 'a', {
            type: GameCommandType.JoinRun,
        });
        await send(state, 'b', {
            type: GameCommandType.JoinRun,
        });

        await send(state, 'host', {
            type: GameCommandType.LeaveRun,
            clientId: 'a',
        });
        assert.deepEquals(state.runState.connected, {
            0: false,
            1: true,
        });

        await send(state, 'c', {
            type: GameCommandType.JoinRun,
        });
        assert.deepEquals(state.runState.slotByClientId, {
            b: 1,
            c: 0,
        });
        assert.deepEquals(getRun(state).connected, {
            0: true,
            1: true,
        });

        await send(state, 'd', {
            type: GameCommandType.JoinRun,
        });
        assert.strictEquals(getRun(state).slotByClientId['d'], 2);
    });

    it('singleplayer: commands from any client resolve to slot 0 and placement is unrestricted', async () => {
        const state = createInstance();
        state.level = defaultLevel;

        await send(state, 'solo', {
            type: GameCommandType.PlaceTower,
            towerType: TowerType.Knife,
            x: 1000,
            y: 900,
        });

        assert.strictEquals(getTowers(state).length, 1);
        assert.strictEquals(getTowers(state)[0]?.params.ownerSlot, 0);
    });

    it('has a score entry for every slot a level defines', () => {
        for (const level of levels) {
            const {scoreBySlot} = createInitialRunState(level.levelId);

            for (const path of level.paths) {
                assert.strictEquals(scoreBySlot[path.ownerSlot], 0);
            }
        }
    });
});

describe('shared run rules', () => {
    async function createCoopRun() {
        const state = createInstance();
        await send(state, 'host', {
            type: GameCommandType.StartRun,
            seed: 's',
        });
        await send(state, 'b', {
            type: GameCommandType.JoinRun,
        });
        await send(state, 'c', {
            type: GameCommandType.JoinRun,
        });
        getRun(state).status = RunStatus.Playing;
        return state;
    }

    it('ignores StartRun from a non-host and accepts it from the host', async () => {
        const state = await createCoopRun();
        getRun(state).coins = 12_345;

        await send(state, 'b', {
            type: GameCommandType.StartRun,
            seed: 'other',
        });
        assert.strictEquals(getRun(state).coins, 12_345);

        await send(state, 'host', {
            type: GameCommandType.StartRun,
            seed: 'other',
        });
        assert.notStrictEquals(getRun(state).coins, 12_345);
    });

    it('lets the pauser or the host resume, but not others', async () => {
        const state = await createCoopRun();

        await send(state, 'b', {
            type: GameCommandType.TogglePause,
        });
        assert.isTrue(getRun(state).paused);
        assert.strictEquals(getRun(state).pausedBySlot, 1);

        await send(state, 'c', {
            type: GameCommandType.TogglePause,
        });
        assert.isTrue(getRun(state).paused);

        await send(state, 'host', {
            type: GameCommandType.TogglePause,
        });
        assert.isFalse(getRun(state).paused);

        await send(state, 'b', {
            type: GameCommandType.TogglePause,
        });
        await send(state, 'b', {
            type: GameCommandType.TogglePause,
        });
        assert.isFalse(getRun(state).paused);
    });

    it('ignores SetSpeed and ArmSpeedReset in co-op', async () => {
        const state = await createCoopRun();

        await send(state, 'host', {
            type: GameCommandType.SetSpeed,
            speed: 2,
        });
        await send(state, 'host', {
            type: GameCommandType.ArmSpeedReset,
        });

        assert.strictEquals(getRun(state).speed, 1);
        assert.isFalse(getRun(state).resetSpeedOnIncome);
    });

    it('resets speed to 1x when a second player joins', async () => {
        const state = createInstance();
        await send(state, 'host', {
            type: GameCommandType.StartRun,
            seed: 's',
        });
        getRun(state).status = RunStatus.Playing;
        await send(state, 'host', {
            type: GameCommandType.SetSpeed,
            speed: 2,
        });
        assert.strictEquals(getRun(state).speed, 2);

        await send(state, 'b', {
            type: GameCommandType.JoinRun,
        });
        assert.strictEquals(getRun(state).speed, 1);
    });

    it('singleplayer: restart, pause, resume and speed work as before', async () => {
        const state = createInstance();
        await send(state, 'solo', {
            type: GameCommandType.StartRun,
            seed: 's',
        });
        getRun(state).status = RunStatus.Playing;

        await send(state, 'solo', {
            type: GameCommandType.SetSpeed,
            speed: 2,
        });
        assert.strictEquals(getRun(state).speed, 2);
        await send(state, 'solo', {
            type: GameCommandType.ArmSpeedReset,
        });
        assert.isTrue(getRun(state).resetSpeedOnIncome);

        await send(state, 'solo', {
            type: GameCommandType.TogglePause,
        });
        assert.isTrue(getRun(state).paused);
        await send(state, 'solo', {
            type: GameCommandType.TogglePause,
        });
        assert.isFalse(getRun(state).paused);
    });
});
