import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {type LevelDefinition} from '../../level/level.js';
import {defaultLevel} from '../../level/levels.js';
import {TowerType, towerTypes} from '../tower-type.js';
import {getKnifeLine, getPerpendicularKnifeAngle, isOnSlice} from './knife.js';

const bendLevel: LevelDefinition = {
    ...defaultLevel,
    paths: [
        {
            pathId: 'bend',
            ownerSlot: 0,
            widthPx: 80,
            waypoints: [
                {
                    x: 0,
                    y: 500,
                },
                {
                    x: 500,
                    y: 500,
                },
                {
                    x: 500,
                    y: 1000,
                },
            ],
        },
    ],
};

function angleAt({x, y}: Readonly<{x: number; y: number}>): number {
    return Math.round(
        getPerpendicularKnifeAngle(bendLevel, {
            x,
            y,
        }),
    );
}

describe(getPerpendicularKnifeAngle.name, () => {
    it('points straight across a horizontal leg, from above or below', () => {
        assert.strictEquals(
            angleAt({
                x: 200,
                y: 420,
            }),
            90,
        );
        assert.strictEquals(
            angleAt({
                x: 200,
                y: 580,
            }),
            -90,
        );
    });

    it('points straight across a vertical leg, from either side', () => {
        assert.strictEquals(
            angleAt({
                x: 420,
                y: 800,
            }),
            0,
        );
        assert.strictEquals(
            angleAt({
                x: 580,
                y: 800,
            }),
            180,
        );
    });

    it('aims at the corner from the outside of a bend', () => {
        assert.strictEquals(
            angleAt({
                x: 560,
                y: 440,
            }),
            135,
        );
    });
});

describe('Laser stats', () => {
    it('are exactly the old Knife stats', () => {
        const laser = towerTypes[TowerType.Laser];
        assert.strictEquals(laser.damage, 4);
        assert.strictEquals(laser.rangePx, 220);
        assert.strictEquals(laser.cooldownMs, 250);
        assert.strictEquals(laser.behavior, 'line');
        assert.strictEquals(laser.appliesEffect, 'cut');
    });
});

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
