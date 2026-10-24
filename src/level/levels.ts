import {type Coords} from '@augment-vir/common';
import {
    getPathLength,
    type LevelDefinition,
    type PathDefinition,
    type RestaurantDefinition,
} from './level.js';

const beltWidthPx = 90;
const restaurantSizePx = 220;

/** Builds the single-player belt: ends at the restaurant's west edge, with chutes at path fractions. */
function createLevel({
    levelId,
    name,
    description,
    waypoints,
    restaurantCenter,
    chuteFractions = [],
}: Readonly<{
    levelId: string;
    name: string;
    description: string;
    /** Every waypoint except the last, which is derived from the restaurant. */
    waypoints: ReadonlyArray<Readonly<Coords>>;
    restaurantCenter: Readonly<Coords>;
    /** Chute positions as fractions of the path length. */
    chuteFractions?: ReadonlyArray<number>;
}>): LevelDefinition {
    const restaurant: RestaurantDefinition = {
        ...restaurantCenter,
        sizePx: restaurantSizePx,
    };
    const path: PathDefinition = {
        pathId: 'west',
        ownerSlot: 0,
        waypoints: [
            ...waypoints,
            {
                x: restaurant.x - restaurant.sizePx / 2,
                y: restaurant.y,
            },
        ],
        widthPx: beltWidthPx,
    };
    const length = getPathLength(path);

    return {
        levelId,
        name,
        description,
        paths: [
            chuteFractions.length
                ? {
                      ...path,
                      chutes: chuteFractions.map((fraction) => {
                          return {
                              distancePx: Math.round(length * fraction),
                          };
                      }),
                  }
                : path,
        ],
        restaurant,
    };
}

/** The classic winding belt into a central restaurant. Co-op later adds a second path for slot 1. */
export const windingWayLevel = createLevel({
    levelId: 'winding-way',
    name: 'Winding Way',
    description: 'The classic.',
    waypoints: [
        {
            x: 0,
            y: 400,
        },
        {
            x: 420,
            y: 400,
        },
        {
            x: 420,
            y: 820,
        },
        {
            x: 700,
            y: 820,
        },
        {
            x: 700,
            y: 540,
        },
    ],
    restaurantCenter: {
        x: 960,
        y: 540,
    },
});

export const doubleBackLevel = createLevel({
    levelId: 'double-back',
    name: 'Double Back',
    description: 'Two long straights: Knife country.',
    waypoints: [
        {
            x: 0,
            y: 380,
        },
        {
            x: 1450,
            y: 380,
        },
        {
            x: 1450,
            y: 620,
        },
        {
            x: 250,
            y: 620,
        },
        {
            x: 250,
            y: 780,
        },
    ],
    restaurantCenter: {
        x: 1450,
        y: 780,
    },
    chuteFractions: [0.55],
});

export const longHaulLevel = createLevel({
    levelId: 'long-haul',
    name: 'The Long Haul',
    description: 'A big loop with a chute dropping potatoes mid-belt.',
    waypoints: [
        {
            x: 0,
            y: 380,
        },
        {
            x: 1500,
            y: 380,
        },
        {
            x: 1500,
            y: 840,
        },
        {
            x: 150,
            y: 840,
        },
        {
            x: 150,
            y: 560,
        },
    ],
    restaurantCenter: {
        x: 1260,
        y: 560,
    },
    chuteFractions: [0.5],
});

/** Every level, in title-screen order. */
export const levels: ReadonlyArray<LevelDefinition> = [
    windingWayLevel,
    doubleBackLevel,
    longHaulLevel,
];

export const defaultLevel = windingWayLevel;

/** Finds a level by id, falling back to the default for unknown ids (such as a stale save). */
export function getLevel(levelId: string | undefined): LevelDefinition {
    return levels.find((level) => level.levelId === levelId) ?? defaultLevel;
}
