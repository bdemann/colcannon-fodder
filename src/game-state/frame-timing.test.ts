import {EntityStore2d} from '@antha/entity-2d';
import {createMockPixi} from '@antha/graphics-2d';
import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {frameConfig} from '../config/game-config.js';
import {defaultLevel} from '../level/levels.js';
import {PotatoEntity} from '../potato/potato.entity.js';
import {gameCommandHandlers} from './game-command-handlers.js';
import {GameCommandType} from './game-command.js';
import {gameEntities} from './game-entities.js';
import {runGameFrameUpdate} from './game-lockstep.mod.js';
import {type FullGameState} from './game-state.js';

/** Runs a singleplayer-style simulation for `simMs` of game time using frames of `frameMs`. */
async function simulate({frameMs, simMs}: Readonly<{frameMs: number; simMs: number}>) {
    const state: Partial<FullGameState> = {
        level: defaultLevel,
    };
    state.entityStore = new EntityStore2d({
        pixi: createMockPixi() as any,
        state,
        assetLoader: {} as any,
        preregisteredEntities: gameEntities,
    });
    await (
        gameCommandHandlers[GameCommandType.StartRun] as (params: {
            detail: unknown;
            state: Partial<FullGameState>;
        }) => unknown
    )({
        detail: {
            packet: {
                type: GameCommandType.StartRun,
                seed: 'timing',
            },
            sourceClientId: 'test',
        },
        state,
    });

    const frames = Math.round(simMs / frameMs);
    for (let frame = 0; frame < frames; frame++) {
        await runGameFrameUpdate({
            state,
            msSinceLastExecute: frameMs,
        } as Parameters<typeof runGameFrameUpdate>[0]);
    }

    return state as FullGameState;
}

describe('frame timing and game speed', () => {
    it('advances game time by the frame length, not by the frame count', async () => {
        const oldFrame = await simulate({
            frameMs: 10,
            simMs: 15_000,
        });
        const newFrame = await simulate({
            frameMs: frameConfig.frameMs,
            simMs: 15_000,
        });

        /** Same game time passes per real second, whatever the frame length. */
        assert.isBelow(Math.abs(oldFrame.runState.elapsedMs - 15_000), 1);
        assert.isBelow(Math.abs(newFrame.runState.elapsedMs - 15_000), frameConfig.frameMs);
        assert.strictEquals(oldFrame.runState.waveIndex, newFrame.runState.waveIndex);
        assert.strictEquals(oldFrame.runState.wavePhase, newFrame.runState.wavePhase);
    });

    it('moves potatoes the same distance per game second', async () => {
        const oldFrame = await simulate({
            frameMs: 10,
            simMs: 20_000,
        });
        const newFrame = await simulate({
            frameMs: frameConfig.frameMs,
            simMs: 20_000,
        });
        const oldPotatoes = [...oldFrame.entityStore.getEntities(PotatoEntity)];
        const newPotatoes = [...newFrame.entityStore.getEntities(PotatoEntity)];

        assert.isAbove(oldPotatoes.length, 0);
        assert.strictEquals(oldPotatoes.length, newPotatoes.length);
        const first = oldPotatoes[0];
        const firstNew = newPotatoes[0];
        assert.isDefined(first);
        assert.isDefined(firstNew);
        /** Within one frame of travel at the fastest wave speed. */
        assert.isBelow(
            Math.hypot(first.params.x - firstNew.params.x, first.params.y - firstNew.params.y),
            15,
        );
    });
});
