import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {
    chooseAreaTargetIndexes,
    chooseGullTargetIndex,
    chooseTargetIndex,
    getGullsInRange,
    isInRangeBox,
    type GullCandidate,
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

/** A tiny deterministic generator (mulberry32) so the random fixtures are reproducible. */
function createRandom(seed: number): () => number {
    let state = seed;

    return () => {
        state = (state + 0x6d_2b_79_f5) | 0;
        let t = Math.imul(state ^ (state >>> 15), 1 | state);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;

        return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296;
    };
}

describe('isInRangeBox box filter', () => {
    it('picks the same targets as scanning every candidate (random fixtures)', () => {
        const random = createRandom(127);

        for (let round = 0; round < 300; round++) {
            const rangePx = 40 + random() * 200;
            const rangeTower = {
                x: random() * 400,
                y: random() * 400,
                rangePx,
            };
            const candidates: TargetCandidate[] = Array.from(
                {
                    length: Math.floor(random() * 40),
                },
                () => {
                    return {
                        x: random() * 500,
                        y: random() * 500,
                        // Duplicates make ties, which must resolve to the same (first) candidate.
                        distancePx: Math.floor(random() * 20) * 25,
                        processing: {
                            cut: random() < 0.4,
                            cooked: random() < 0.4,
                            mashHp: random() < 0.15 ? 0 : 100,
                            maxMashHp: 100,
                        },
                    };
                },
            );
            const kept = candidates.filter((entry) => isInRangeBox(rangeTower, entry));
            const appliesEffect = (
                [
                    'cut',
                    'cooked',
                    undefined,
                ] as const
            )[Math.floor(random() * 3)];

            const fullIndex = chooseTargetIndex(
                {
                    ...rangeTower,
                    appliesEffect,
                },
                candidates,
            );
            const keptIndex = chooseTargetIndex(
                {
                    ...rangeTower,
                    appliesEffect,
                },
                kept,
            );
            assert.strictEquals(
                keptIndex < 0 ? undefined : kept[keptIndex],
                fullIndex < 0 ? undefined : candidates[fullIndex],
            );

            assert.deepEquals(
                chooseAreaTargetIndexes(rangeTower, kept).map((index) => kept[index]),
                chooseAreaTargetIndexes(rangeTower, candidates).map((index) => candidates[index]),
            );
        }
    });

    it('picks the same gulls as scanning every gull (random fixtures)', () => {
        const random = createRandom(131);

        for (let round = 0; round < 300; round++) {
            const rangeTower = {
                x: random() * 400,
                y: random() * 400,
                rangePx: 40 + random() * 200,
            };
            const gulls: GullCandidate[] = Array.from(
                {
                    length: Math.floor(random() * 12),
                },
                () => {
                    return {
                        x: random() * 500,
                        y: random() * 500,
                        carrying: random() < 0.3,
                    };
                },
            );
            const kept = gulls.filter((gull) => isInRangeBox(rangeTower, gull));

            const fullIndex = chooseGullTargetIndex(rangeTower, gulls);
            const keptIndex = chooseGullTargetIndex(rangeTower, kept);
            assert.strictEquals(
                keptIndex < 0 ? undefined : kept[keptIndex],
                fullIndex < 0 ? undefined : gulls[fullIndex],
            );
            assert.deepEquals(
                getGullsInRange(rangeTower, kept).map((index) => kept[index]),
                getGullsInRange(rangeTower, gulls).map((index) => gulls[index]),
            );
        }
    });

    it('keeps points exactly on the range edge', () => {
        assert.isTrue(
            isInRangeBox(
                {
                    x: 0,
                    y: 0,
                    rangePx: 100,
                },
                {
                    x: 100,
                    y: -100,
                },
            ),
        );
        assert.isFalse(
            isInRangeBox(
                {
                    x: 0,
                    y: 0,
                    rangePx: 100,
                },
                {
                    x: 100.5,
                    y: 0,
                },
            ),
        );
    });
});
