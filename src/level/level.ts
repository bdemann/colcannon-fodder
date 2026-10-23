import {assertWrap} from '@augment-vir/assert';
import {type Coords} from '@augment-vir/common';
import {gameWorldSize} from '../game-state/game-world.js';

/**
 * A path is a polyline of waypoints that potatoes walk from the first point to the last point. The
 * last point must be at the restaurant. A straight path is two waypoints; turns are more
 * waypoints.
 */
export type PathDefinition = {
    /** Unique within a level. Potatoes remember which path they are on. */
    pathId: string;
    /**
     * The player slot that defends this path. Points earned on this path are credited to this slot.
     * Singleplayer only ever uses slot 0. Co-op later gives each player their own path.
     */
    ownerSlot: number;
    waypoints: ReadonlyArray<Readonly<Coords>>;
    /** Full width of the drawn path. Towers may not be placed on it. */
    widthPx: number;
};

/** The restaurant all paths lead to. Drawn as a square centered on its position. */
export type RestaurantDefinition = {
    x: number;
    y: number;
    sizePx: number;
};

export type LevelDefinition = {
    paths: ReadonlyArray<Readonly<PathDefinition>>;
    restaurant: Readonly<RestaurantDefinition>;
};

const restaurant: RestaurantDefinition = {
    x: gameWorldSize.width / 2,
    y: gameWorldSize.height / 2,
    sizePx: 220,
};

/**
 * The jam level: the restaurant sits in the middle of the field and one straight path runs in from
 * the left edge. Co-op later adds a second path from the right edge owned by slot 1.
 */
export const defaultLevel: LevelDefinition = {
    paths: [
        {
            pathId: 'west',
            ownerSlot: 0,
            waypoints: [
                {
                    x: 0,
                    y: restaurant.y,
                },
                {
                    x: restaurant.x - restaurant.sizePx / 2,
                    y: restaurant.y,
                },
            ],
            widthPx: 90,
        },
    ],
    restaurant,
};

/** Each consecutive pair of waypoints as a segment. */
function getPathSegments(path: Readonly<PathDefinition>) {
    return path.waypoints.slice(1).map((end, index) => {
        return {
            start: assertWrap.isDefined(path.waypoints[index]),
            end,
        };
    });
}

/** Total walking length of a path in pixels. */
export function getPathLength(path: Readonly<PathDefinition>): number {
    let length = 0;

    for (const {start, end} of getPathSegments(path)) {
        length += Math.hypot(end.x - start.x, end.y - start.y);
    }

    return length;
}

/**
 * The world position that is `distancePx` along the path from its first waypoint. Distances below 0
 * clamp to the start and distances past the end clamp to the last waypoint.
 */
export function getPositionAlongPath(path: Readonly<PathDefinition>, distancePx: number): Coords {
    let remaining = Math.max(0, distancePx);

    for (const {start, end} of getPathSegments(path)) {
        const segmentLength = Math.hypot(end.x - start.x, end.y - start.y);

        if (remaining <= segmentLength) {
            const progress = segmentLength ? remaining / segmentLength : 0;

            return {
                x: start.x + (end.x - start.x) * progress,
                y: start.y + (end.y - start.y) * progress,
            };
        }

        remaining -= segmentLength;
    }

    const last = assertWrap.isDefined(path.waypoints.at(-1));

    return {
        x: last.x,
        y: last.y,
    };
}

/** Shortest distance from a point to any segment of the path's center line. */
export function getDistanceToPath(path: Readonly<PathDefinition>, point: Readonly<Coords>): number {
    let shortest = Infinity;

    for (const {start, end} of getPathSegments(path)) {
        const segmentX = end.x - start.x;
        const segmentY = end.y - start.y;
        const segmentLengthSquared = segmentX * segmentX + segmentY * segmentY;
        const progress = segmentLengthSquared
            ? Math.min(
                  1,
                  Math.max(
                      0,
                      ((point.x - start.x) * segmentX + (point.y - start.y) * segmentY) /
                          segmentLengthSquared,
                  ),
              )
            : 0;
        const closestX = start.x + segmentX * progress;
        const closestY = start.y + segmentY * progress;

        shortest = Math.min(shortest, Math.hypot(point.x - closestX, point.y - closestY));
    }

    return shortest;
}

/** Finds a path by id or throws, since a potato on a missing path is a programming error. */
export function getPath(level: Readonly<LevelDefinition>, pathId: string) {
    const path = level.paths.find((candidate) => candidate.pathId === pathId);

    if (!path) {
        throw new Error(`No path '${pathId}' in level.`);
    }

    return path;
}
