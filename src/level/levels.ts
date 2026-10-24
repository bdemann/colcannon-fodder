import {type Coords} from '@augment-vir/common';
import {
    getPathLength,
    levelSupportsPlayerCount,
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
        minPlayers: 1,
        maxPlayers: 1,
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

const forkRestaurant: RestaurantDefinition = {
    x: 1300,
    y: 560,
    sizePx: restaurantSizePx,
};

/** Branching map: both roads share their first waypoints, then split and enter top and bottom. */
export const theForkLevel: LevelDefinition = {
    levelId: 'the-fork',
    name: 'The Fork',
    description: 'Potatoes split at the junction. Cover both roads.',
    spawnMode: 'pick-one',
    paths: [
        {
            pathId: 'north',
            ownerSlot: 0,
            waypoints: [
                {
                    x: 0,
                    y: 560,
                },
                {
                    x: 500,
                    y: 560,
                },
                {
                    x: 500,
                    y: 400,
                },
                {
                    x: 1300,
                    y: 400,
                },
                {
                    x: 1300,
                    y: 450,
                },
            ],
            widthPx: beltWidthPx,
        },
        {
            pathId: 'south',
            ownerSlot: 0,
            waypoints: [
                {
                    x: 0,
                    y: 560,
                },
                {
                    x: 500,
                    y: 560,
                },
                {
                    x: 500,
                    y: 760,
                },
                {
                    x: 1300,
                    y: 760,
                },
                {
                    x: 1300,
                    y: 670,
                },
            ],
            widthPx: beltWidthPx,
        },
    ],
    restaurant: forkRestaurant,
    minPlayers: 1,
    maxPlayers: 1,
};

const coopRestaurant: RestaurantDefinition = {
    x: 960,
    y: 540,
    sizePx: restaurantSizePx,
};

/** Where each edge's path enters the co-op restaurant (the middle of that side). */
export const coopEntrances = {
    west: {
        x: coopRestaurant.x - coopRestaurant.sizePx / 2,
        y: coopRestaurant.y,
    },
    east: {
        x: coopRestaurant.x + coopRestaurant.sizePx / 2,
        y: coopRestaurant.y,
    },
    north: {
        x: coopRestaurant.x,
        y: coopRestaurant.y - coopRestaurant.sizePx / 2,
    },
    south: {
        x: coopRestaurant.x,
        y: coopRestaurant.y + coopRestaurant.sizePx / 2,
    },
} as const;

type CoopPathSpec = Readonly<{
    pathId: keyof typeof coopEntrances;
    /** Every waypoint except the last, which is that side's restaurant entrance. */
    waypoints: ReadonlyArray<Readonly<Coords>>;
    chuteFractions?: ReadonlyArray<number>;
}>;

/**
 * Builds a multi-path co-op map around the central restaurant. Each spec becomes one path owned by
 * the slot of its position in `pathSpecs`, ending at its side's entrance. The map supports exactly
 * `minPlayers` to `maxPlayers` players: there are no unowned paths.
 */
function createCoopLevel({
    levelId,
    name,
    description,
    pathSpecs,
    minPlayers,
    maxPlayers,
}: Readonly<{
    levelId: string;
    name: string;
    description: string;
    pathSpecs: ReadonlyArray<CoopPathSpec>;
    minPlayers: number;
    maxPlayers: number;
}>): LevelDefinition {
    return {
        levelId,
        name,
        description,
        paths: pathSpecs.map((spec, ownerSlot): PathDefinition => {
            const path: PathDefinition = {
                pathId: spec.pathId,
                ownerSlot,
                waypoints: [
                    ...spec.waypoints,
                    coopEntrances[spec.pathId],
                ],
                widthPx: beltWidthPx,
            };
            const length = getPathLength(path);

            return spec.chuteFractions?.length
                ? {
                      ...path,
                      chutes: spec.chuteFractions.map((fraction) => {
                          return {
                              distancePx: Math.round(length * fraction),
                          };
                      }),
                  }
                : path;
        }),
        restaurant: coopRestaurant,
        minPlayers,
        maxPlayers,
    };
}

/** Two players: mirrored winding belts from the left and right edges, one each. */
export const twoRoadsLevel = createCoopLevel({
    levelId: 'two-roads',
    name: 'Two Roads',
    description: 'Two players, one belt each, one hungry restaurant.',
    minPlayers: 2,
    maxPlayers: 2,
    pathSpecs: [
        {
            pathId: 'west',
            waypoints: [
                {
                    x: 0,
                    y: 450,
                },
                {
                    x: 500,
                    y: 450,
                },
                {
                    x: 500,
                    y: 800,
                },
                {
                    x: 720,
                    y: 800,
                },
                {
                    x: 720,
                    y: 540,
                },
            ],
        },
        {
            pathId: 'east',
            waypoints: [
                {
                    x: 1920,
                    y: 450,
                },
                {
                    x: 1420,
                    y: 450,
                },
                {
                    x: 1420,
                    y: 800,
                },
                {
                    x: 1200,
                    y: 800,
                },
                {
                    x: 1200,
                    y: 540,
                },
            ],
        },
    ],
});

/** Three or four players: one long curving belt per edge, with chutes on two of them. */
export const crossroadsLevel = createCoopLevel({
    levelId: 'crossroads',
    name: 'Crossroads',
    description: 'Three or four players, a belt from every side.',
    minPlayers: 3,
    maxPlayers: 4,
    pathSpecs: [
        {
            pathId: 'west',
            waypoints: [
                {
                    x: 0,
                    y: 450,
                },
                {
                    x: 330,
                    y: 450,
                },
                {
                    x: 330,
                    y: 640,
                },
                {
                    x: 640,
                    y: 640,
                },
                {
                    x: 640,
                    y: 540,
                },
            ],
            chuteFractions: [0.55],
        },
        {
            pathId: 'east',
            waypoints: [
                {
                    x: 1920,
                    y: 450,
                },
                {
                    x: 1500,
                    y: 450,
                },
                {
                    x: 1500,
                    y: 540,
                },
            ],
        },
        {
            pathId: 'north',
            waypoints: [
                {
                    x: 760,
                    y: 0,
                },
                {
                    x: 760,
                    y: 220,
                },
                {
                    x: 1180,
                    y: 220,
                },
                {
                    x: 1180,
                    y: 350,
                },
                {
                    x: 960,
                    y: 350,
                },
            ],
            chuteFractions: [0.5],
        },
        {
            pathId: 'south',
            waypoints: [
                {
                    x: 150,
                    y: 1080,
                },
                {
                    x: 150,
                    y: 835,
                },
                {
                    x: 960,
                    y: 835,
                },
            ],
        },
    ],
});

/** Every level, in title-screen order. */
export const levels: ReadonlyArray<LevelDefinition> = [
    windingWayLevel,
    doubleBackLevel,
    longHaulLevel,
    theForkLevel,
    twoRoadsLevel,
    crossroadsLevel,
];

/** The levels a room of this many players can pick from (singleplayer sees only 1-player maps). */
export function getLevelsForPlayerCount(playerCount: number): ReadonlyArray<LevelDefinition> {
    return levels.filter((level) => levelSupportsPlayerCount(level, playerCount));
}

export const defaultLevel = windingWayLevel;

/** Finds a level by id, falling back to the default for unknown ids (such as a stale save). */
export function getLevel(levelId: string | undefined): LevelDefinition {
    return levels.find((level) => level.levelId === levelId) ?? defaultLevel;
}
