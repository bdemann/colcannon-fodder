import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {chooseTargetIndex, type TargetCandidate} from './tower-targeting.js';

const tower = {
    x: 0,
    y: 0,
    rangePx: 100,
    processes: 'cut',
} as const;

function candidate({
    x,
    distancePx,
    cut = false,
}: {
    x: number;
    distancePx: number;
    cut?: boolean;
}): TargetCandidate {
    return {
        x,
        y: 0,
        distancePx,
        processing: {
            cut,
            cooked: false,
            mashed: false,
        },
    };
}

describe(chooseTargetIndex.name, () => {
    it('returns -1 for an empty list', () => {
        assert.strictEquals(chooseTargetIndex(tower, []), -1);
    });

    it('ignores potatoes out of range', () => {
        assert.strictEquals(
            chooseTargetIndex(tower, [
                candidate({
                    x: 101,
                    distancePx: 5,
                }),
            ]),
            -1,
        );
        assert.strictEquals(
            chooseTargetIndex(tower, [
                candidate({
                    x: 100,
                    distancePx: 5,
                }),
            ]),
            0,
        );
    });

    it('ignores potatoes already processed', () => {
        assert.strictEquals(
            chooseTargetIndex(tower, [
                candidate({
                    x: 10,
                    distancePx: 5,
                    cut: true,
                }),
            ]),
            -1,
        );
    });

    it('picks the potato furthest along the path', () => {
        assert.strictEquals(
            chooseTargetIndex(tower, [
                candidate({
                    x: 10,
                    distancePx: 5,
                }),
                candidate({
                    x: 20,
                    distancePx: 50,
                }),
                candidate({
                    x: 30,
                    distancePx: 20,
                }),
            ]),
            1,
        );
    });

    it('breaks ties with the lower index', () => {
        assert.strictEquals(
            chooseTargetIndex(tower, [
                candidate({
                    x: 10,
                    distancePx: 5,
                }),
                candidate({
                    x: 20,
                    distancePx: 5,
                }),
            ]),
            0,
        );
    });
});
