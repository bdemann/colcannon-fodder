import {EntityStore2d} from '@antha/entity-2d';
import {createMockPixi} from '@antha/graphics-2d';
import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {defaultLevel, levels} from '../level/levels.js';
import {RunStatus} from '../run/run-state.js';
import {TowerType} from '../tower/tower-type.js';
import {gameCommandHandlers} from './game-command-handlers.js';
import {GameCommandType, type GameCommand} from './game-command.js';
import {gameEntities} from './game-entities.js';
import {
    createGameStateHash,
    createGameStateSync,
    loadGameStateSync,
    runGameFrameUpdate,
} from './game-lockstep.mod.js';
import {type FullGameState} from './game-state.js';

const frameMs = 1000 / 60;

/** A headless simulation: the same handlers and frame update the real lockstep mod uses. */
function createInstance(): FullGameState {
    const state: Partial<FullGameState> = {
        level: defaultLevel,
    };

    const assetLoader: any = {};
    state.entityStore = new EntityStore2d({
        pixi: createMockPixi() as any,
        state,
        assetLoader,
        preregisteredEntities: gameEntities,
    });

    return state as FullGameState;
}

async function runFrame(state: FullGameState, commands: ReadonlyArray<GameCommand>) {
    for (const command of commands) {
        await (
            gameCommandHandlers[command.type] as (params: {
                detail: unknown;
                state: FullGameState;
            }) => unknown
        )({
            detail: {
                packet: command,
                sourceClientId: 'test',
            },
            state,
        });
    }
    await runGameFrameUpdate({
        state,
        msSinceLastExecute: frameMs,
    } as Parameters<typeof runGameFrameUpdate>[0]);
}

const otherLevel = levels.find((level) => level.levelId !== defaultLevel.levelId) ?? defaultLevel;

function buildScript(frameCount: number): GameCommand[][] {
    const script: GameCommand[][] = [];
    for (let frame = 0; frame < frameCount; frame++) {
        script.push([]);
    }
    script[0] = [
        {
            type: GameCommandType.StartRun,
            levelId: otherLevel.levelId,
            seed: 'test-seed',
        },
    ];
    script[30] = [
        {
            type: GameCommandType.PlaceTower,
            towerType: TowerType.Knife,
            x: 600,
            y: 500,
        },
        {
            type: GameCommandType.SetSpeed,
            speed: 2,
        },
    ];
    return script;
}

describe('co-op safe simulation', () => {
    it('keeps two instances fed the same commands in lockstep', async () => {
        const a = createInstance();
        const b = createInstance();
        const script = buildScript(900);

        for (const commands of script) {
            await runFrame(a, commands);
            await runFrame(b, commands);
            assert.strictEquals(
                createGameStateHash({
                    state: a,
                }),
                createGameStateHash({
                    state: b,
                }),
            );
        }

        assert.strictEquals(a.runState.status, RunStatus.Playing);
        assert.isTrue(a.runState.elapsedMs > 0);
    });

    it('syncs the level to a joiner started on a different level', async () => {
        assert.notStrictEquals(otherLevel.levelId, defaultLevel.levelId);

        const a = createInstance();
        const b = createInstance();
        const script = buildScript(200);

        for (const commands of script) {
            await runFrame(a, commands);
        }
        assert.strictEquals(a.level.levelId, otherLevel.levelId);
        assert.strictEquals(b.level.levelId, defaultLevel.levelId);

        await loadGameStateSync({
            state: b,
            stateSync: JSON.parse(
                JSON.stringify(
                    createGameStateSync({
                        state: a,
                    }),
                ),
            ),
        });

        assert.strictEquals(b.level.levelId, a.level.levelId);
        assert.strictEquals(
            createGameStateHash({
                state: a,
            }),
            createGameStateHash({
                state: b,
            }),
        );

        /** They keep agreeing after the sync. */
        for (let frame = 0; frame < 200; frame++) {
            await runFrame(a, []);
            await runFrame(b, []);
            assert.strictEquals(
                createGameStateHash({
                    state: a,
                }),
                createGameStateHash({
                    state: b,
                }),
            );
        }
    });
});
