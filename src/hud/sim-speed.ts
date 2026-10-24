import {frameConfig} from '../config/game-config.js';

/**
 * Measures how fast the simulation runs relative to real time: 1 means one simulated second per
 * real second. UI side only (it reads the wall clock), never call it from simulation code.
 */
export type SimSpeedTracker = {
    /**
     * Records a sample and returns the ratio over the recent window, or `undefined` until there is
     * enough data. Pass `running: false` while the sim is frozen (paused, title, game over) so that
     * does not read as a slowdown.
     */
    sample(
        params: Readonly<{elapsedMs: number; nowMs: number; running: boolean}>,
    ): number | undefined;
};

export function createSimSpeedTracker(
    windowMs: number = frameConfig.simSpeedWindowMs,
): SimSpeedTracker {
    let samples: Array<{elapsedMs: number; nowMs: number}> = [];

    return {
        sample({elapsedMs, nowMs, running}) {
            const last = samples[samples.length - 1];
            /** A reset run, a pause or a frozen sim breaks continuity: start measuring again. */
            if (!running || (last && elapsedMs < last.elapsedMs)) {
                samples = [];
            }
            if (!running) {
                return undefined;
            }

            samples.push({
                elapsedMs,
                nowMs,
            });
            samples = samples.filter((entry) => nowMs - entry.nowMs <= windowMs);
            const first = samples[0];
            if (!first || nowMs - first.nowMs < windowMs / 4) {
                return undefined;
            }

            return (elapsedMs - first.elapsedMs) / (nowMs - first.nowMs);
        },
    };
}
