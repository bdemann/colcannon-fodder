import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {chooseTargetIndex, type TargetCandidate} from './tower-targeting.js';

const tower = {
    x: 0,
    y: 0,
    rangePx: 100,
    appliesEffect: 'cut',
} as const;

function candidate({
    x,
    distancePx,
    cut = false,
    mashHp = 100,
}: {
    x: number;
    distancePx: number;
    cut?: boolean;
    mashHp?: number;
}): TargetCandidate {
    return {
        x,
        y: 0,
        distancePx,
        processing: {
            cut,
            cooked: false,
            mashHp,
            maxMashHp: 100,
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

    it('prefers potatoes that lack the effect', () => {
        assert.strictEquals(
            chooseTargetIndex(tower, [
                candidate({
                    x: 10,
                    distancePx: 50,
                    cut: true,
                }),
                candidate({
                    x: 10,
                    distancePx: 5,
                }),
            ]),
            1,
        );
    });

    it('falls back to potatoes that already have the effect', () => {
        assert.strictEquals(
            chooseTargetIndex(tower, [
                candidate({
                    x: 10,
                    distancePx: 5,
                    cut: true,
                }),
                candidate({
                    x: 10,
                    distancePx: 50,
                    cut: true,
                }),
            ]),
            1,
        );
    });

    it('targets the furthest potato when the tower applies no effect', () => {
        assert.strictEquals(
            chooseTargetIndex(
                {
                    ...tower,
                    appliesEffect: undefined,
                },
                [
                    candidate({
                        x: 10,
                        distancePx: 5,
                    }),
                    candidate({
                        x: 10,
                        distancePx: 50,
                        cut: true,
                    }),
                ],
            ),
            1,
        );
    });

    it('never targets fully mashed potatoes', () => {
        assert.strictEquals(
            chooseTargetIndex(tower, [
                candidate({
                    x: 10,
                    distancePx: 50,
                    mashHp: 0,
                }),
            ]),
            -1,
        );
        assert.strictEquals(
            chooseTargetIndex(tower, [
                candidate({
                    x: 10,
                    distancePx: 50,
                    mashHp: 0,
                }),
                candidate({
                    x: 10,
                    distancePx: 5,
                    cut: true,
                }),
            ]),
            1,
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
