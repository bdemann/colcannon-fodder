import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {
    chooseAreaTargetIndexes,
    chooseGullTargetIndex,
    chooseTargetIndex,
    getGullsInRange,
    type TargetCandidate,
} from './tower-targeting.js';

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

describe(chooseAreaTargetIndexes.name, () => {
    it('returns nothing for an empty list', () => {
        assert.deepEquals(chooseAreaTargetIndexes(tower, []), []);
    });

    it('ignores potatoes out of range', () => {
        assert.deepEquals(
            chooseAreaTargetIndexes(tower, [
                candidate({
                    x: 101,
                    distancePx: 5,
                }),
            ]),
            [],
        );
    });

    it('excludes fully mashed potatoes', () => {
        assert.deepEquals(
            chooseAreaTargetIndexes(tower, [
                candidate({
                    x: 10,
                    distancePx: 5,
                    mashHp: 0,
                }),
                candidate({
                    x: 20,
                    distancePx: 5,
                }),
            ]),
            [1],
        );
    });

    it('returns every hit in candidate order', () => {
        assert.deepEquals(
            chooseAreaTargetIndexes(tower, [
                candidate({
                    x: 50,
                    distancePx: 1,
                }),
                candidate({
                    x: 500,
                    distancePx: 9,
                }),
                candidate({
                    x: 100,
                    distancePx: 5,
                }),
                candidate({
                    x: 10,
                    distancePx: 3,
                }),
            ]),
            [
                0,
                2,
                3,
            ],
        );
    });
});

describe(chooseGullTargetIndex.name, () => {
    it('ignores gulls out of range', () => {
        assert.strictEquals(
            chooseGullTargetIndex(tower, [
                {
                    x: 500,
                    y: 0,
                    carrying: true,
                },
            ]),
            -1,
        );
    });

    it('picks the nearest gull', () => {
        assert.strictEquals(
            chooseGullTargetIndex(tower, [
                {
                    x: 80,
                    y: 0,
                    carrying: false,
                },
                {
                    x: 30,
                    y: 0,
                    carrying: false,
                },
            ]),
            1,
        );
    });

    it('prefers a gull that is carrying over a nearer one', () => {
        assert.strictEquals(
            chooseGullTargetIndex(tower, [
                {
                    x: 30,
                    y: 0,
                    carrying: false,
                },
                {
                    x: 90,
                    y: 0,
                    carrying: true,
                },
            ]),
            1,
        );
    });
});

describe(getGullsInRange.name, () => {
    it('lists every gull within range', () => {
        assert.deepEquals(
            getGullsInRange(tower, [
                {
                    x: 50,
                    y: 0,
                    carrying: false,
                },
                {
                    x: 500,
                    y: 0,
                    carrying: false,
                },
                {
                    x: 0,
                    y: 99,
                    carrying: true,
                },
            ]),
            [
                0,
                2,
            ],
        );
    });
});
