import {orderConfig, waveConfig} from '../config/game-config.js';
import {type PotatoSizeWeights} from '../potato/potato-size.js';
import {type RunState} from './run-state.js';

/**
 * One spawn moment: the spawner releases one potato per path (plus `bossCount` bosses), sizes
 * picked from these weights.
 */
export type WaveSpawn = {
    sizeWeights: PotatoSizeWeights;
    bossCount: number;
    chuteShare: number;
};

/** The spawner's countdown to its next spawn. It lives in the spawner entity's params. */
export type SpawnTimer = {msUntilNextSpawn: number};

/** Time between a wave's gulls, so they are spread through the wave. */
export function getSeagullIntervalMs(wave: {
    potatoCount: number;
    spawnIntervalMs: number;
    seagullCount: number;
}): number {
    return (wave.potatoCount * wave.spawnIntervalMs) / (wave.seagullCount + 1);
}

/**
 * The wave state machine. Mutates `runState` (wave fields only) and `timer`, and returns the spawns
 * to make this frame. Pure apart from those mutations, so it is easy to unit test.
 */
export function advanceWaves(
    runState: RunState,
    timer: SpawnTimer,
    msElapsed: number,
): WaveSpawn[] {
    const spawns: WaveSpawn[] = [];

    if (runState.wavePhase === 'break') {
        runState.breakRemainingMs -= msElapsed;
        if (runState.breakRemainingMs <= 0) {
            runState.wavePhase = 'spawning';
            runState.spawnedInWave = 0;
            const startingWave = waveConfig.waves[runState.waveIndex];
            runState.seagullsSpawnedInWave = 0;
            if (startingWave) {
                runState.beltSpeedPxPerMs = startingWave.speedPxPerMs;
                runState.msUntilNextSeagull = getSeagullIntervalMs(startingWave);
            }
            timer.msUntilNextSpawn = 0;
            runState.msUntilNextOrder = orderConfig.firstOrderDelayMs;
        }
        return spawns;
    } else if (runState.wavePhase === 'done') {
        return spawns;
    } else {
        const wave = waveConfig.waves[runState.waveIndex];
        if (!wave) {
            runState.wavePhase = 'done';
            return spawns;
        }

        timer.msUntilNextSpawn -= msElapsed;

        while (timer.msUntilNextSpawn <= 0 && runState.wavePhase === 'spawning') {
            spawns.push({
                sizeWeights: wave.sizeWeights,
                // Bosses ride in at the wave's halfway spawn.
                bossCount:
                    runState.spawnedInWave === Math.floor(wave.potatoCount / 2)
                        ? wave.bossCount
                        : 0,
                chuteShare: wave.chuteShare,
            });
            runState.spawnedInWave++;
            timer.msUntilNextSpawn += wave.spawnIntervalMs;

            if (runState.spawnedInWave >= wave.potatoCount) {
                if (runState.waveIndex >= waveConfig.waves.length - 1) {
                    runState.wavePhase = 'done';
                } else {
                    runState.waveIndex++;
                    runState.wavePhase = 'break';
                    runState.breakRemainingMs = waveConfig.breakMs;
                }
            }
        }

        return spawns;
    }
}
