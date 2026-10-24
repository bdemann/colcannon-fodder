import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {getSliceSegment, isOnSlice} from './knife.js';

const origin = {
    x: 0,
    y: 0,
};

describe(getSliceSegment.name, () => {
    it('extends through the aim point to the full length', () => {
        const {start, end} = getSliceSegment({
            origin,
            aimAt: {
                x: 30,
                y: 40,
            },
            lengthPx: 200,
        });
        assert.deepEquals(start, origin);
        assert.isTrue(Math.abs(end.x - 120) < 1e-9);
        assert.isTrue(Math.abs(end.y - 160) < 1e-9);
    });

    it('also shortens when the aim point is past the length', () => {
        const {end} = getSliceSegment({
            origin,
            aimAt: {
                x: 500,
                y: 0,
            },
            lengthPx: 100,
        });
        assert.isTrue(Math.abs(end.x - 100) < 1e-9);
        assert.isTrue(Math.abs(end.y) < 1e-9);
    });

    it('slices right when aimed at the origin', () => {
        const {end} = getSliceSegment({
            origin,
            aimAt: origin,
            lengthPx: 50,
        });
        assert.deepEquals(end, {
            x: 50,
            y: 0,
        });
    });
});

describe(isOnSlice.name, () => {
    const segment = getSliceSegment({
        origin,
        aimAt: {
            x: 10,
            y: 0,
        },
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

    it('misses a potato beside the line', () => {
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

    it('misses a potato past the end of the slice', () => {
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
});
