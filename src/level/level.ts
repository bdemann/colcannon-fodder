import {assertWrap} from '@augment-vir/assert';
import {type Coords} from '@augment-vir/common';

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
    /** Drop chutes that release potatoes onto the belt mid-path. */
    chutes?: ReadonlyArray<Readonly<ChuteDefinition>>;
    /** Odds of this path in a `'pick-one'` level, relative to the other paths. Defaults to 1. */
    spawnWeight?: number;
};

/** A drop chute over the belt. */
export type ChuteDefinition = {
    /** Where along the path (from the first waypoint) potatoes land. */
    distancePx: number;
};

/** The restaurant all paths lead to. Drawn as a square centered on its position. */
export type RestaurantDefinition = {
    x: number;
    y: number;
    sizePx: number;
};

export type LevelDefinition = {
    levelId: string;
    name: string;
    description: string;
    /**
     * `'each-path'` (default) releases a potato on every path per spawn. `'pick-one'` releases one
     * potato on one path, picked by `spawnWeight`.
     */
    spawnMode?: 'each-path' | 'pick-one';
    paths: ReadonlyArray<Readonly<PathDefinition>>;
    restaurant: Readonly<RestaurantDefinition>;
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

/**
 * Unit vector of the path segment at `distancePx`. Distances outside the path use the first or last
 * segment. Zero-length segments are skipped.
 */
export function getPathDirectionAt(path: Readonly<PathDefinition>, distancePx: number): Coords {
    const segments = getPathSegments(path).filter(({start, end}) => {
        return start.x !== end.x || start.y !== end.y;
    });
    let remaining = Math.max(0, distancePx);
    let chosen = segments[0];

    for (const segment of segments) {
        chosen = segment;
        const segmentLength = Math.hypot(
            segment.end.x - segment.start.x,
            segment.end.y - segment.start.y,
        );

        if (remaining <= segmentLength) {
            break;
        }

        remaining -= segmentLength;
    }

    if (!chosen) {
        return {
            x: 1,
            y: 0,
        };
    }

    const length = Math.hypot(chosen.end.x - chosen.start.x, chosen.end.y - chosen.start.y);

    return {
        x: (chosen.end.x - chosen.start.x) / length,
        y: (chosen.end.y - chosen.start.y) / length,
    };
}

/** Shortest distance from a point to any segment of the path's center line. */
export function getDistanceToPath(path: Readonly<PathDefinition>, point: Readonly<Coords>): number {
    return getNearestPathPoint(path, point).distance;
}

/**
 * The closest point on the path's center line: how far away it is and how far along the path (from
 * the first waypoint) it lies.
 */
export function getNearestPathPoint(
    path: Readonly<PathDefinition>,
    point: Readonly<Coords>,
): {distance: number; alongPx: number} {
    let shortest = Infinity;
    let alongPx = 0;
    let walked = 0;

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

        const distance = Math.hypot(point.x - closestX, point.y - closestY);

        if (distance < shortest) {
            shortest = distance;
            alongPx = walked + Math.sqrt(segmentLengthSquared) * progress;
        }
        walked += Math.sqrt(segmentLengthSquared);
    }

    return {
        distance: shortest,
        alongPx,
    };
}

/** Finds a path by id or throws, since a potato on a missing path is a programming error. */
export function getPath(level: Readonly<LevelDefinition>, pathId: string) {
    const path = level.paths.find((candidate) => candidate.pathId === pathId);

    if (!path) {
        throw new Error(`No path '${pathId}' in level.`);
    }

    return path;
}

/**
 * The paths one spawn moment releases onto: every path, or on `'pick-one'` levels a single path
 * chosen by `roll` (0 to under 1) weighted by `spawnWeight`. Only rolls on pick-one levels, so
 * other levels keep their random sequence.
 */
export function pickSpawnPaths(
    level: Readonly<LevelDefinition>,
    roll: number,
): ReadonlyArray<Readonly<PathDefinition>> {
    if (level.spawnMode !== 'pick-one') {
        return level.paths;
    }

    const weights = level.paths.map((path) => Math.max(0, path.spawnWeight ?? 1));
    const total = weights.reduce((sum, weight) => sum + weight, 0);
    let remaining = roll * total;

    for (const [
        index,
        path,
    ] of level.paths.entries()) {
        remaining -= weights[index] ?? 0;
        if (remaining < 0) {
            return [path];
        }
    }

    const fallback = level.paths.at(-1);

    return fallback ? [fallback] : [];
}
