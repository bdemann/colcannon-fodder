import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {getNearestPathPoint} from '../level/level.js';
import {getBeltCarry} from './gull-belt.js';
import {testLevel} from './gull-test-level.js';

describe(getBeltCarry.name, () => {
    it('carries a gull on the belt along the path direction', () => {
        const carry = getBeltCarry({
            level: testLevel,
            point: {
                x: 300,
                y: 420,
            },
            beltSpeedPxPerMs: 0.1,
            msSinceLastExecute: 100,
        });

        assert.isTrue(carry.onBelt);
        assert.strictEquals(carry.dx, 10);
        assert.strictEquals(carry.dy, 0);
    });

    it('does not carry a gull on grass', () => {
        const carry = getBeltCarry({
            level: testLevel,
            point: {
                x: 300,
                y: 500,
            },
            beltSpeedPxPerMs: 0.1,
            msSinceLastExecute: 100,
        });

        assert.deepEquals(carry, {
            onBelt: false,
            dx: 0,
            dy: 0,
        });
    });

    it('stops carrying at the end of the belt', () => {
        const carry = getBeltCarry({
            level: testLevel,
            point: {
                x: 880,
                y: 400,
            },
            beltSpeedPxPerMs: 0.1,
            msSinceLastExecute: 100,
        });

        assert.deepEquals(carry, {
            onBelt: true,
            dx: 0,
            dy: 0,
        });
    });
});

describe(getNearestPathPoint.name, () => {
    it('reports distance and position along the path', () => {
        const path = testLevel.paths[0];
        if (!path) {
            throw new Error('no path');
        }

        const nearest = getNearestPathPoint(path, {
            x: 250,
            y: 430,
        });

        assert.strictEquals(nearest.distance, 30);
        assert.isTrue(Math.abs(nearest.alongPx - 250) < 1e-6);
    });
});
