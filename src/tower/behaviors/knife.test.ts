import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {getKnifeLine, isOnSlice} from './knife.js';

const origin = {
    x: 0,
    y: 0,
};

describe(getKnifeLine.name, () => {
    it('points right at 0 degrees with the full length', () => {
        const {start, end} = getKnifeLine({
            origin,
            angleDeg: 0,
            lengthPx: 200,
        });
        assert.deepEquals(start, origin);
        assert.isTrue(Math.abs(end.x - 200) < 1e-9);
        assert.isTrue(Math.abs(end.y) < 1e-9);
    });

    it('points down at 90 degrees from an offset origin', () => {
        const {end} = getKnifeLine({
            origin: {
                x: 10,
                y: 20,
            },
            angleDeg: 90,
            lengthPx: 100,
        });
        assert.isTrue(Math.abs(end.x - 10) < 1e-9);
        assert.isTrue(Math.abs(end.y - 120) < 1e-9);
    });
});

describe(isOnSlice.name, () => {
    const segment = getKnifeLine({
        origin,
        angleDeg: 0,
        lengthPx: 200,
    });

    it('hits every potato on the line', () => {
        const xs = [
            20,
            90,
            150,
            199,
        ];
        for (const x of xs) {
            assert.isTrue(
                isOnSlice({
                    point: {
                        x,
                        y: 3,
                    },
                    radius: 10,
                    segment,
                }),
            );
        }
    });

    it('misses a potato in range but off the line', () => {
        assert.isFalse(
            isOnSlice({
                point: {
                    x: 100,
                    y: 60,
                },
                radius: 10,
                segment,
            }),
        );
    });

    it('misses a potato past the end of the line', () => {
        assert.isFalse(
            isOnSlice({
                point: {
                    x: 260,
                    y: 0,
                },
                radius: 10,
                segment,
            }),
        );
    });

    it('follows the angle', () => {
        const down = getKnifeLine({
            origin,
            angleDeg: 90,
            lengthPx: 200,
        });
        assert.isTrue(
            isOnSlice({
                point: {
                    x: 0,
                    y: 100,
                },
                radius: 10,
                segment: down,
            }),
        );
        assert.isFalse(
            isOnSlice({
                point: {
                    x: 100,
                    y: 0,
                },
                radius: 10,
                segment: down,
            }),
        );
    });
});
