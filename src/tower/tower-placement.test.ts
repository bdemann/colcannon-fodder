import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {towerConfig} from '../config/game-config.js';
import {defaultLevel} from '../level/level.js';
import {canPlaceTower, shouldShowTowerRange} from './tower-placement.js';
import {TowerType} from './tower-type.js';

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

describe(shouldShowTowerRange.name, () => {
    const tower = {
        x: 100,
        y: 100,
        towerType: TowerType.Knife,
    };

    it('shows when hovering inside the radius', () => {
        assert.isTrue(
            shouldShowTowerRange({
                tower,
                pointerWorld: {
                    x: 100 + towerConfig.radius,
                    y: 100,
                },
                selectedTowerType: undefined,
            }),
        );
    });

    it('hides when the pointer is just outside', () => {
        assert.isFalse(
            shouldShowTowerRange({
                tower,
                pointerWorld: {
                    x: 100 + towerConfig.radius + 1,
                    y: 100,
                },
                selectedTowerType: undefined,
            }),
        );
    });

    it('shows while placing a tower of the same type', () => {
        assert.isTrue(
            shouldShowTowerRange({
                tower,
                pointerWorld: {
                    x: 900,
                    y: 600,
                },
                selectedTowerType: TowerType.Knife,
            }),
        );
    });

    it('hides while placing a different type', () => {
        assert.isFalse(
            shouldShowTowerRange({
                tower,
                pointerWorld: {
                    x: 900,
                    y: 600,
                },
                selectedTowerType: TowerType.Masher,
            }),
        );
    });

    it('hides when neither, or with no pointer', () => {
        assert.isFalse(
            shouldShowTowerRange({
                tower,
                pointerWorld: {
                    x: 900,
                    y: 600,
                },
                selectedTowerType: undefined,
            }),
        );
        assert.isFalse(
            shouldShowTowerRange({
                tower,
                pointerWorld: undefined,
                selectedTowerType: undefined,
            }),
        );
    });
});
