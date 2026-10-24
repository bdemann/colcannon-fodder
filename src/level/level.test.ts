import {assert, assertWrap} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {
    getDistanceToPath,
    getPathDirectionAt,
    getPathLength,
    getPositionAlongPath,
    getPositionAlongPathWithOffset,
    type PathDefinition,
} from './level.js';
import {defaultLevel} from './levels.js';

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

    it('measures the default winding path', () => {
        const path = assertWrap.isDefined(defaultLevel.paths[0]);

        assert.strictEquals(getPathLength(path), 420 + 420 + 280 + 280 + 150);
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

describe(getPathDirectionAt.name, () => {
    it('is the unit vector of the segment at that distance', () => {
        assert.deepEquals(getPathDirectionAt(lPath, 40), {
            x: 1,
            y: 0,
        });
        assert.deepEquals(getPathDirectionAt(lPath, 120), {
            x: 0,
            y: 1,
        });
    });

    it('uses the first and last segments outside the path', () => {
        assert.deepEquals(getPathDirectionAt(lPath, -5), {
            x: 1,
            y: 0,
        });
        assert.deepEquals(getPathDirectionAt(lPath, 1000), {
            x: 0,
            y: 1,
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

describe(getPositionAlongPathWithOffset.name, () => {
    it('shifts to the left of travel on a straight segment', () => {
        const position = getPositionAlongPathWithOffset({
            path: lPath,
            distancePx: 40,
            offsetPx: 6,
        });

        assert.strictEquals(position.x, 40);
        assert.strictEquals(position.y, -6);
    });

    it('uses the current segment normal after a corner', () => {
        const position = getPositionAlongPathWithOffset({
            path: lPath,
            distancePx: 120,
            offsetPx: 6,
        });

        assert.strictEquals(position.x, 106);
        assert.strictEquals(position.y, 20);
    });

    it('matches the center line for a zero offset', () => {
        assert.deepEquals(
            getPositionAlongPathWithOffset({
                path: lPath,
                distancePx: 120,
                offsetPx: 0,
            }),
            getPositionAlongPath(lPath, 120),
        );
    });
});
