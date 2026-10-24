import {EntityStore2d} from '@antha/entity-2d';
import {createMockPixi} from '@antha/graphics-2d';
import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {crossroadsLevel, twoRoadsLevel, windingWayLevel} from '../level/levels.js';
import {createInitialRunState, isCoopRun, RunStatus, type RunState} from '../run/run-state.js';
import {gameCommandHandlers, isSpectatorCommand} from './game-command-handlers.js';
import {GameCommandType, type GameCommand} from './game-command.js';
import {gameEntities} from './game-entities.js';
import {type FullGameState} from './game-state.js';

function createInstance(): FullGameState {
    const state: Partial<FullGameState> = {};

    state.entityStore = new EntityStore2d({
        pixi: createMockPixi() as any,
        state,
        assetLoader: {} as any,
        preregisteredEntities: gameEntities,
    });
    state.runState = createInitialRunState();

    return state as FullGameState;
}

async function send(state: FullGameState, sourceClientId: string, command: GameCommand) {
    /** Mirrors the lockstep mod: spectator commands never reach a handler. */
    if (isSpectatorCommand(state, sourceClientId, command.type)) {
        return;
    }
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

async function createLobby(state: FullGameState, levelId: string) {
    await send(state, 'host', {
        type: GameCommandType.StartRun,
        ready: true,
        levelId,
        seed: 'seed',
    });
}

describe('co-op lobby', () => {
    it('takes every peer from the lobby to Playing on the same frame', async () => {
        const first = createInstance();
        const second = createInstance();
        const commands: Array<
            [
                string,
                GameCommand,
            ]
        > = [
            [
                'host',
                {
                    type: GameCommandType.StartRun,
                    ready: true,
                    levelId: windingWayLevel.levelId,
                    seed: 's',
                },
            ],
            [
                'guest',
                {
                    type: GameCommandType.JoinRun,
                },
            ],
            [
                'host',
                {
                    type: GameCommandType.StartRun,
                    ready: true,
                    levelId: twoRoadsLevel.levelId,
                    seed: 's',
                },
            ],
            [
                'host',
                {
                    type: GameCommandType.BeginRun,
                },
            ],
        ];

        for (const [
            clientId,
            command,
        ] of commands) {
            await send(first, clientId, command);
            await send(second, clientId, command);
            assert.strictEquals(getRun(first).status, getRun(second).status);
        }
        assert.strictEquals(getRun(first).status, RunStatus.Playing);
        assert.isTrue(isCoopRun(getRun(first)));
        assert.deepEquals(getRun(first).slotNames, {
            0: 'Player 1',
            1: 'Player 2',
        });
    });

    it('keeps joined players when the host changes the map', async () => {
        const state = createInstance();

        await createLobby(state, windingWayLevel.levelId);
        await send(state, 'guest', {
            type: GameCommandType.JoinRun,
        });
        await send(state, 'host', {
            type: GameCommandType.StartRun,
            ready: true,
            levelId: twoRoadsLevel.levelId,
            seed: 'again',
        });

        assert.strictEquals(getRun(state).levelId, twoRoadsLevel.levelId);
        assert.strictEquals(getRun(state).slotByClientId['guest'], 1);
        assert.strictEquals(getRun(state).scoreBySlot[1], 0);
    });

    it('only the host can start, and only on a map that fits the players', async () => {
        const state = createInstance();

        await createLobby(state, windingWayLevel.levelId);
        await send(state, 'guest', {
            type: GameCommandType.JoinRun,
        });
        await send(state, 'host', {
            type: GameCommandType.BeginRun,
        });
        assert.strictEquals(getRun(state).status, RunStatus.Ready, 'a 1-player map for 2 players');

        await send(state, 'host', {
            type: GameCommandType.StartRun,
            ready: true,
            levelId: twoRoadsLevel.levelId,
            seed: 'two',
        });
        await send(state, 'guest', {
            type: GameCommandType.BeginRun,
        });
        assert.strictEquals(getRun(state).status, RunStatus.Ready, 'guest cannot start');

        await send(state, 'host', {
            type: GameCommandType.BeginRun,
        });
        assert.strictEquals(getRun(state).status, RunStatus.Playing);
    });

    it('a leaver in the lobby disappears and the others renumber', async () => {
        const state = createInstance();

        await createLobby(state, crossroadsLevel.levelId);
        await send(state, 'one', {
            type: GameCommandType.JoinRun,
        });
        await send(state, 'two', {
            type: GameCommandType.JoinRun,
        });
        await send(state, 'host', {
            type: GameCommandType.LeaveRun,
            clientId: 'one',
        });

        assert.deepEquals(getRun(state).slotByClientId, {
            host: 0,
            two: 1,
        });
        assert.deepEquals(Object.keys(getRun(state).slotNames), [
            '0',
            '1',
        ]);
    });

    it('a mid-run drop marks the slot disconnected and the run continues', async () => {
        const state = createInstance();

        await createLobby(state, twoRoadsLevel.levelId);
        await send(state, 'guest', {
            type: GameCommandType.JoinRun,
        });
        await send(state, 'host', {
            type: GameCommandType.BeginRun,
        });
        await send(state, 'host', {
            type: GameCommandType.LeaveRun,
            clientId: 'guest',
        });

        assert.strictEquals(getRun(state).status, RunStatus.Playing);
        assert.strictEquals(getRun(state).connected[1], false);
        assert.strictEquals(getRun(state).slotByClientId['guest'], 1);
    });

    it('a late joiner reclaims a free slot or becomes a spectator', async () => {
        const state = createInstance();

        await createLobby(state, twoRoadsLevel.levelId);
        await send(state, 'guest', {
            type: GameCommandType.JoinRun,
        });
        await send(state, 'host', {
            type: GameCommandType.BeginRun,
        });
        await send(state, 'host', {
            type: GameCommandType.LeaveRun,
            clientId: 'guest',
        });
        await send(state, 'late', {
            type: GameCommandType.JoinRun,
        });
        assert.strictEquals(getRun(state).slotByClientId['late'], 1);

        await send(state, 'spectator', {
            type: GameCommandType.JoinRun,
        });
        assert.isFalse('spectator' in getRun(state).slotByClientId);

        await send(state, 'spectator', {
            type: GameCommandType.TogglePause,
        });
        await send(state, 'spectator', {
            type: GameCommandType.StartRun,
            levelId: windingWayLevel.levelId,
            seed: 'x',
        });
        assert.isFalse(getRun(state).paused);
        assert.strictEquals(getRun(state).levelId, twoRoadsLevel.levelId);
    });

    it('singleplayer: a lone StartRun then BeginRun plays as before', async () => {
        const state = createInstance();

        await createLobby(state, windingWayLevel.levelId);
        await send(state, 'host', {
            type: GameCommandType.BeginRun,
        });
        assert.strictEquals(getRun(state).status, RunStatus.Playing);
        assert.isFalse(isCoopRun(getRun(state)));
    });
});
