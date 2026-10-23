import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {gameWorldSize} from '../game-state/game-world.js';
import {nearestEdgePoint, pickSeagullEntry, stepToward} from './seagull-logic.js';

describe(pickSeagullEntry.name, () => {
    it('picks the top edge', () => {
        const entry = pickSeagullEntry({
            rollEdge: 0.1,
            rollAlong: 0.5,
        });
        assert.isBelow(entry.y, 0);
        assert.strictEquals(entry.x, gameWorldSize.width / 2);
    });

    it('picks the right edge', () => {
        const entry = pickSeagullEntry({
            rollEdge: 0.5,
            rollAlong: 0.25,
        });
        assert.isAbove(entry.x, gameWorldSize.width);
        assert.strictEquals(entry.y, gameWorldSize.height / 4);
    });

    it('picks the bottom edge', () => {
        const entry = pickSeagullEntry({
            rollEdge: 0.9,
            rollAlong: 0.5,
        });
        assert.isAbove(entry.y, gameWorldSize.height);
        assert.strictEquals(entry.x, gameWorldSize.width / 2);
    });

    it('never picks the left edge', () => {
        for (let edge = 0; edge < 1; edge += 0.05) {
            assert.isAbove(
                pickSeagullEntry({
                    rollEdge: edge,
                    rollAlong: 0.5,
                }).x,
                0,
            );
        }
    });
});

describe(nearestEdgePoint.name, () => {
    it('finds the nearest edge', () => {
        assert.deepEquals(
            nearestEdgePoint({
                x: 100,
                y: 500,
            }),
            {
                x: 0,
                y: 500,
            },
        );
        assert.deepEquals(
            nearestEdgePoint({
                x: 1800,
                y: 500,
            }),
            {
                x: gameWorldSize.width,
                y: 500,
            },
        );
        assert.deepEquals(
            nearestEdgePoint({
                x: 900,
                y: 50,
            }),
            {
                x: 900,
                y: 0,
            },
        );
        assert.deepEquals(
            nearestEdgePoint({
                x: 900,
                y: 1000,
            }),
            {
                x: 900,
                y: gameWorldSize.height,
            },
        );
    });
});

describe(stepToward.name, () => {
    it('moves by at most the step', () => {
        assert.deepEquals(
            stepToward({
                from: {
                    x: 0,
                    y: 0,
                },
                to: {
                    x: 30,
                    y: 40,
                },
                stepPx: 10,
            }),
            {
                x: 6,
                y: 8,
            },
        );
    });

    it('lands on the target when close enough', () => {
        assert.deepEquals(
            stepToward({
                from: {
                    x: 0,
                    y: 0,
                },
                to: {
                    x: 3,
                    y: 4,
                },
                stepPx: 10,
            }),
            {
                x: 3,
                y: 4,
            },
        );
        assert.deepEquals(
            stepToward({
                from: {
                    x: 1,
                    y: 1,
                },
                to: {
                    x: 1,
                    y: 1,
                },
                stepPx: 0,
            }),
            {
                x: 1,
                y: 1,
            },
        );
    });
});
