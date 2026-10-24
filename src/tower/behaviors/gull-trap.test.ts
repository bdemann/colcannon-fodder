import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {chooseTrapGullIndex, type TrapGullCandidate} from './gull-trap.js';

const tower = {
    x: 0,
    y: 0,
    rangePx: 100,
};

function gull(overrides: Partial<TrapGullCandidate>): TrapGullCandidate {
    return {
        x: 10,
        y: 0,
        carrying: false,
        fed: false,
        hp: 60,
        ...overrides,
    };
}

describe(chooseTrapGullIndex.name, () => {
    it('prefers a carrying gull over a nearer one', () => {
        assert.strictEquals(
            chooseTrapGullIndex(tower, [
                gull({
                    x: 5,
                }),
                gull({
                    x: 80,
                    carrying: true,
                }),
            ]),
            1,
        );
    });

    it('picks the nearest otherwise', () => {
        assert.strictEquals(
            chooseTrapGullIndex(tower, [
                gull({
                    x: 50,
                }),
                gull({
                    x: 20,
                }),
            ]),
            1,
        );
    });

    it('ignores fed, dead and out-of-range gulls', () => {
        assert.strictEquals(
            chooseTrapGullIndex(tower, [
                gull({
                    fed: true,
                    carrying: true,
                }),
                gull({
                    hp: 0,
                }),
                gull({
                    x: 500,
                }),
            ]),
            -1,
        );
    });

    it('maps back to the original index when earlier gulls are skipped', () => {
        assert.strictEquals(
            chooseTrapGullIndex(tower, [
                gull({
                    fed: true,
                }),
                gull({
                    x: 30,
                }),
            ]),
            1,
        );
    });
});
