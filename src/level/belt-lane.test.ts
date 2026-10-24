import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {getLaneOffset, getMaxLaneOffset} from './belt-lane.js';

describe(getMaxLaneOffset.name, () => {
    it('leaves the edge margin and potato radius', () => {
        assert.strictEquals(
            getMaxLaneOffset({
                beltWidthPx: 100,
                potatoRadius: 22,
            }),
            22,
        );
    });

    it('never goes negative', () => {
        assert.strictEquals(
            getMaxLaneOffset({
                beltWidthPx: 40,
                potatoRadius: 30,
            }),
            0,
        );
    });
});

describe(getLaneOffset.name, () => {
    it('spans the full range', () => {
        assert.strictEquals(
            getLaneOffset({
                roll: 0,
                maxOffset: 20,
            }),
            -20,
        );
        assert.strictEquals(
            getLaneOffset({
                roll: 0.5,
                maxOffset: 20,
            }),
            0,
        );
        assert.strictEquals(
            getLaneOffset({
                roll: 0.75,
                maxOffset: 20,
            }),
            10,
        );
    });
});
