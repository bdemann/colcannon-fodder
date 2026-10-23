import {waveConfig} from '../config/game-config.js';
import {type RunState} from './run-state.js';

/** One spawn moment: the spawner releases one potato per path with this speed. */
export type WaveSpawn = {speedPxPerMs: number};

/** The spawner's countdown to its next spawn. It lives in the spawner entity's params. */
export type SpawnTimer = {msUntilNextSpawn: number};

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
            timer.msUntilNextSpawn = 0;
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
                speedPxPerMs: wave.speedPxPerMs,
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
