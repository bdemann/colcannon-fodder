import {assert, assertWrap} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {getBossHp} from '../config/boss-config.js';
import {orderConfig, waveConfig} from '../config/game-config.js';
import {createInitialRunState, type RunState} from './run-state.js';
import {advanceWaves, getSeagullIntervalMs} from './waves.js';

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

    it('resets the seagull schedule when a wave starts spawning', () => {
        const runState = createInitialRunState();
        runState.breakRemainingMs = 100;
        runState.waveIndex = 2;
        runState.seagullsSpawnedInWave = 2;
        runState.msUntilNextSeagull = -50;
        advanceWaves(
            runState,
            {
                msUntilNextSpawn: 0,
            },
            100,
        );
        const wave3 = assertWrap.isDefined(waveConfig.waves[2]);
        assert.strictEquals(runState.seagullsSpawnedInWave, 0);
        assert.strictEquals(runState.msUntilNextSeagull, getSeagullIntervalMs(wave3));
        assert.strictEquals(
            getSeagullIntervalMs(wave3),
            (wave3.potatoCount * wave3.spawnIntervalMs) / (wave3.seagullCount + 1),
        );
    });

    it('delays the first order of a wave when it starts spawning', () => {
        const runState = createInitialRunState();
        runState.msUntilNextOrder = 1;
        runState.breakRemainingMs = 10;
        advanceWaves(
            runState,
            {
                msUntilNextSpawn: 0,
            },
            10,
        );
        assert.strictEquals(runState.msUntilNextOrder, orderConfig.firstOrderDelayMs);
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
                bossHp: getBossHp(0),
                bossCount: 0,
                chuteShare: wave1.chuteShare,
                hpMultiplier: wave1.hpMultiplier,
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

describe('boss spawns', () => {
    it('spawns the final wave boss once, at the halfway spawn', () => {
        const runState = createInitialRunState();
        runState.wavePhase = 'spawning';
        runState.waveIndex = lastIndex;
        const timer = {
            msUntilNextSpawn: 0,
        };
        const spawns = advanceWaves(runState, timer, 1_000_000);
        const bossSpawns = spawns
            .map((spawn, index) => {
                return {
                    index,
                    bossCount: spawn.bossCount,
                };
            })
            .filter((spawn) => spawn.bossCount > 0);
        assert.deepEquals(bossSpawns, [
            {
                index: Math.floor(lastWave.potatoCount / 2),
                bossCount: 1,
            },
        ]);
    });

    it('spawns no boss in earlier waves', () => {
        const runState = createInitialRunState();
        runState.wavePhase = 'spawning';
        const timer = {
            msUntilNextSpawn: 0,
        };
        const spawns = advanceWaves(runState, timer, 1_000_000);
        assert.isTrue(spawns.every((spawn) => spawn.bossCount === 0));
    });
});
