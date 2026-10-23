import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {defaultLevel} from '../level/level.js';
import {canPlaceTower} from './tower-placement.js';

function check(point: {x: number; y: number}, towers: {x: number; y: number}[] = []) {
    return canPlaceTower({
        level: defaultLevel,
        towers,
        point,
    });
}

describe(canPlaceTower.name, () => {
    it('accepts a clear spot', () => {
        assert.deepEquals(
            check({
                x: 400,
                y: 300,
            }),
            {
                valid: true,
            },
        );
    });

    it('rejects out of bounds', () => {
        assert.deepEquals(
            check({
                x: 10,
                y: 300,
            }),
            {
                valid: false,
                reason: 'Out of bounds',
            },
        );
        assert.deepEquals(
            check({
                x: 400,
                y: 1075,
            }),
            {
                valid: false,
                reason: 'Out of bounds',
            },
        );
    });

    it('rejects spots near the path', () => {
        assert.deepEquals(
            check({
                x: 400,
                y: 540,
            }),
            {
                valid: false,
                reason: 'Too close to the path',
            },
        );
        assert.deepEquals(
            check({
                x: 400,
                y: 540 - 74,
            }),
            {
                valid: false,
                reason: 'Too close to the path',
            },
        );
    });

    it('rejects the restaurant', () => {
        assert.deepEquals(
            check({
                x: 960,
                y: 540,
            }),
            {
                valid: false,
                reason: 'On the restaurant',
            },
        );
    });

    it('rejects towers that would overlap', () => {
        assert.deepEquals(
            check(
                {
                    x: 430,
                    y: 300,
                },
                [
                    {
                        x: 400,
                        y: 300,
                    },
                ],
            ),
            {
                valid: false,
                reason: 'Too close to another tower',
            },
        );
        assert.deepEquals(
            check(
                {
                    x: 470,
                    y: 300,
                },
                [
                    {
                        x: 400,
                        y: 300,
                    },
                ],
            ),
            {
                valid: true,
            },
        );
    });
});
