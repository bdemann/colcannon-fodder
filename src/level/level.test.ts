import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {
    getDistanceToPath,
    getPathLength,
    getPositionAlongPath,
    type PathDefinition,
} from './level.js';

const lPath: PathDefinition = {
    pathId: 'test',
    ownerSlot: 0,
    waypoints: [
        {
            x: 0,
            y: 0,
        },
        {
            x: 100,
            y: 0,
        },
        {
            x: 100,
            y: 50,
        },
    ],
    widthPx: 10,
};

describe(getPathLength.name, () => {
    it('sums every segment', () => {
        assert.strictEquals(getPathLength(lPath), 150);
    });
});

describe(getPositionAlongPath.name, () => {
    it('walks along the first segment', () => {
        assert.deepEquals(getPositionAlongPath(lPath, 40), {
            x: 40,
            y: 0,
        });
    });

    it('turns onto later segments', () => {
        assert.deepEquals(getPositionAlongPath(lPath, 125), {
            x: 100,
            y: 25,
        });
    });

    it('clamps to both ends', () => {
        assert.deepEquals(getPositionAlongPath(lPath, -5), {
            x: 0,
            y: 0,
        });
        assert.deepEquals(getPositionAlongPath(lPath, 999), {
            x: 100,
            y: 50,
        });
    });
});

describe(getDistanceToPath.name, () => {
    it('measures to the nearest segment', () => {
        assert.strictEquals(
            getDistanceToPath(lPath, {
                x: 50,
                y: 20,
            }),
            20,
        );
        assert.strictEquals(
            getDistanceToPath(lPath, {
                x: 130,
                y: 25,
            }),
            30,
        );
    });
});
