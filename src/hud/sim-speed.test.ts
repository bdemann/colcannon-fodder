import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {frameConfig} from '../config/game-config.js';
import {createSimSpeedTracker} from './sim-speed.js';

describe(createSimSpeedTracker.name, () => {
    it('measures the ratio of sim time to real time', () => {
        const tracker = createSimSpeedTracker(1000);
        let ratio: number | undefined;
        for (let now = 0; now <= 2000; now += 100) {
            ratio = tracker.sample({
                elapsedMs: now / 2,
                nowMs: now,
                running: true,
            });
        }
        assert.isDefined(ratio);
        assert.isAbove(ratio, 0.49);
        assert.isBelow(ratio, 0.51);
    });

    it('does not count a frozen sim as slow', () => {
        const tracker = createSimSpeedTracker(1000);
        for (let now = 0; now <= 500; now += 100) {
            tracker.sample({
                elapsedMs: now,
                nowMs: now,
                running: true,
            });
        }
        assert.isUndefined(
            tracker.sample({
                elapsedMs: 500,
                nowMs: 600,
                running: false,
            }),
        );
        assert.isUndefined(
            tracker.sample({
                elapsedMs: 500,
                nowMs: 700,
                running: true,
            }),
        );
    });

    it('restarts when the run resets', () => {
        const tracker = createSimSpeedTracker(1000);
        for (let now = 0; now <= 500; now += 100) {
            tracker.sample({
                elapsedMs: now,
                nowMs: now,
                running: true,
            });
        }
        assert.isUndefined(
            tracker.sample({
                elapsedMs: 0,
                nowMs: 600,
                running: true,
            }),
        );
    });
});

describe('frame timing', () => {
    it('is about 30 frames per second', () => {
        assert.isAbove(frameConfig.frameMs, 30);
        assert.isBelow(frameConfig.frameMs, 36);
    });
});
