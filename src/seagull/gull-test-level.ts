import {type LevelDefinition} from '../level/level.js';

/** A straight 80 px belt along y = 400 into a restaurant at x = 1000. */
export const testLevel: LevelDefinition = {
    levelId: 'test',
    name: 'Test',
    description: '',
    paths: [
        {
            pathId: 'west',
            ownerSlot: 0,
            waypoints: [
                {
                    x: 0,
                    y: 400,
                },
                {
                    x: 880,
                    y: 400,
                },
            ],
            widthPx: 80,
            chutes: [
                {
                    distancePx: 400,
                },
            ],
        },
    ],
    restaurant: {
        x: 1000,
        y: 400,
        sizePx: 220,
    },
};

/** A short belt that ends in open grass, so walking around its end beats hopping across it. */
export const shortBeltLevel: LevelDefinition = {
    ...testLevel,
    paths: [
        {
            pathId: 'west',
            ownerSlot: 0,
            waypoints: [
                {
                    x: 0,
                    y: 400,
                },
                {
                    x: 200,
                    y: 400,
                },
            ],
            widthPx: 80,
        },
    ],
    restaurant: {
        x: 1500,
        y: 900,
        sizePx: 220,
    },
};
