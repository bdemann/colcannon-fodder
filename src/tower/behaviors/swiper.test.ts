import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {waveConfig} from '../../config/game-config.js';
import {swiperConfig} from '../../config/swiper-config.js';
import {distanceToSegment, getArmTip, getSwiperAngle, shouldSwipe} from './swiper.js';

const origin = {
    x: 0,
    y: 0,
};
const tip = {
    x: 100,
    y: 0,
};

describe(getArmTip.name, () => {
    it('points along the angle', () => {
        const result = getArmTip({
            center: {
                x: 10,
                y: 20,
            },
            angle: Math.PI / 2,
            lengthPx: 50,
        });
        assert.isTrue(Math.abs(result.x - 10) < 1e-9);
        assert.isTrue(Math.abs(result.y - 70) < 1e-9);
    });
});

describe(getSwiperAngle.name, () => {
    it('makes one turn per rotation', () => {
        assert.strictEquals(
            getSwiperAngle({
                elapsedMs: 1000,
                builtAtMs: 1000,
            }),
            0,
        );
        assert.strictEquals(
            getSwiperAngle({
                elapsedMs: 1000 + swiperConfig.rotationMs,
                builtAtMs: 1000,
            }),
            Math.PI * 2,
        );
    });
});

describe(distanceToSegment.name, () => {
    it('measures to the interior, the ends and a degenerate segment', () => {
        assert.strictEquals(
            distanceToSegment({
                point: {
                    x: 50,
                    y: 30,
                },
                a: origin,
                b: tip,
            }),
            30,
        );
        assert.strictEquals(
            distanceToSegment({
                point: {
                    x: 130,
                    y: 40,
                },
                a: origin,
                b: tip,
            }),
            50,
        );
        assert.strictEquals(
            distanceToSegment({
                point: {
                    x: -3,
                    y: 4,
                },
                a: origin,
                b: tip,
            }),
            5,
        );
        assert.strictEquals(
            distanceToSegment({
                point: {
                    x: 3,
                    y: 4,
                },
                a: origin,
                b: origin,
            }),
            5,
        );
    });
});

describe(shouldSwipe.name, () => {
    const base = {
        potatoRadius: 10,
        armStart: origin,
        armEnd: tip,
        lastSwipedAtMs: -1,
        elapsedMs: 10_000,
    };

    it('swipes a touched, never-swiped potato', () => {
        assert.isTrue(
            shouldSwipe({
                ...base,
                potato: {
                    x: 50,
                    y: 10,
                },
            }),
        );
    });
    it('misses a potato out of reach', () => {
        assert.isFalse(
            shouldSwipe({
                ...base,
                potato: {
                    x: 50,
                    y: swiperConfig.armHalfWidthPx + 11,
                },
            }),
        );
    });
    it('skips a potato swiped within the debounce window', () => {
        assert.isFalse(
            shouldSwipe({
                ...base,
                potato: {
                    x: 50,
                    y: 0,
                },
                lastSwipedAtMs: base.elapsedMs - swiperConfig.debounceMs + 1,
            }),
        );
        assert.isTrue(
            shouldSwipe({
                ...base,
                potato: {
                    x: 50,
                    y: 0,
                },
                lastSwipedAtMs: base.elapsedMs - swiperConfig.debounceMs,
            }),
        );
    });
});

describe('swiper timing', () => {
    it('can never leave a potato permanently stuck', () => {
        const slowestBeltSpeed = Math.min(...waveConfig.waves.map((wave) => wave.speedPxPerMs));
        // x2: at a corner the arm can cross two legs of the path in one turn.
        assert.isBelow(swiperConfig.pushBackPx * 2, slowestBeltSpeed * swiperConfig.rotationMs);
    });
});
