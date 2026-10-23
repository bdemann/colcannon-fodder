import {assert, assertWrap} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {waveConfig} from '../config/game-config.js';
import {createInitialRunState, type RunState} from './run-state.js';
import {advanceWaves} from './waves.js';

const wave1 = waveConfig.waves[0];
const lastIndex = waveConfig.waves.length - 1;
const lastWave = assertWrap.isDefined(waveConfig.waves[lastIndex]);

/** Reads the phase through a function so TypeScript doesn't narrow it after an assignment. */
function getPhase(runState: RunState): RunState['wavePhase'] {
    return runState.wavePhase;
}

describe(advanceWaves.name, () => {
    it('counts down the break without spawning', () => {
        const runState = createInitialRunState();
        const timer = {
            msUntilNextSpawn: 0,
        };
        assert.deepEquals(advanceWaves(runState, timer, 1000), []);
        assert.strictEquals(getPhase(runState), 'break');
        assert.strictEquals(runState.breakRemainingMs, waveConfig.breakMs - 1000);
    });

    it('starts spawning when the break ends', () => {
        const runState = createInitialRunState();
        runState.breakRemainingMs = 500;
        runState.spawnedInWave = 3;
        const timer = {
            msUntilNextSpawn: 999,
        };
        assert.deepEquals(advanceWaves(runState, timer, 500), []);
        assert.strictEquals(getPhase(runState), 'spawning');
        assert.strictEquals(runState.spawnedInWave, 0);
        assert.strictEquals(timer.msUntilNextSpawn, 0);
    });

    it('sets the belt speed from the wave when it starts spawning', () => {
        const runState = createInitialRunState();
        assert.strictEquals(runState.beltSpeedPxPerMs, wave1.speedPxPerMs);

        runState.waveIndex = 2;
        runState.breakRemainingMs = 10;
        const timer = {
            msUntilNextSpawn: 0,
        };
        advanceWaves(runState, timer, 10);
        const wave3Speed: number = assertWrap.isDefined(waveConfig.waves[2]).speedPxPerMs;
        assert.isTrue(runState.beltSpeedPxPerMs === wave3Speed);
    });

    it('spawns on the wave interval', () => {
        const runState = createInitialRunState();
        runState.wavePhase = 'spawning';
        const timer = {
            msUntilNextSpawn: 0,
        };
        assert.deepEquals(advanceWaves(runState, timer, 16), [
            {
                sizeWeights: wave1.sizeWeights,
            },
        ]);
        assert.strictEquals(runState.spawnedInWave, 1);
        assert.strictEquals(timer.msUntilNextSpawn, wave1.spawnIntervalMs - 16);
        assert.deepEquals(advanceWaves(runState, timer, 16), []);
        assert.strictEquals(runState.spawnedInWave, 1);
    });

    it('produces several spawns for a large elapsed time', () => {
        const runState = createInitialRunState();
        runState.wavePhase = 'spawning';
        const timer = {
            msUntilNextSpawn: 0,
        };
        const spawns = advanceWaves(runState, timer, wave1.spawnIntervalMs * 2.5);
        assert.strictEquals(spawns.length, 3);
        assert.strictEquals(runState.spawnedInWave, 3);
    });

    it('moves to the next break after the last potato of a wave', () => {
        const runState = createInitialRunState();
        runState.wavePhase = 'spawning';
        runState.spawnedInWave = wave1.potatoCount - 1;
        runState.breakRemainingMs = 0;
        const timer = {
            msUntilNextSpawn: 0,
        };
        assert.strictEquals(advanceWaves(runState, timer, 1).length, 1);
        assert.strictEquals(getPhase(runState), 'break');
        assert.strictEquals(runState.waveIndex, 1);
        assert.strictEquals(runState.breakRemainingMs, waveConfig.breakMs);
    });

    it('spawns exactly the wave potato count even for a huge elapsed time', () => {
        const runState = createInitialRunState();
        runState.wavePhase = 'spawning';
        const timer = {
            msUntilNextSpawn: 0,
        };
        const spawns = advanceWaves(runState, timer, 1_000_000);
        assert.strictEquals(spawns.length, wave1.potatoCount);
        assert.strictEquals(getPhase(runState), 'break');
    });

    it('is done after the last wave and then does nothing', () => {
        const runState = createInitialRunState();
        runState.wavePhase = 'spawning';
        runState.waveIndex = lastIndex;
        const timer = {
            msUntilNextSpawn: 0,
        };
        const spawns = advanceWaves(runState, timer, 1_000_000);
        assert.strictEquals(spawns.length, lastWave.potatoCount);
        assert.strictEquals(getPhase(runState), 'done');
        assert.strictEquals(runState.waveIndex, lastIndex);
        assert.deepEquals(advanceWaves(runState, timer, 10_000), []);
    });
});
