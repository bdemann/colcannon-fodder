import {type Coords} from '@augment-vir/common';
import {
    getNearestPathPoint,
    getPathDirectionAt,
    getPathLength,
    type LevelDefinition,
} from '../level/level.js';

/**
 * Whether a point is on a belt, and how far the belt carries it in `msSinceLastExecute`. The carry
 * is the belt speed along the path direction at the nearest point of the belt's path; the end of
 * the belt (the restaurant) carries nothing further.
 */
export function getBeltCarry({
    level,
    point,
    beltSpeedPxPerMs,
    msSinceLastExecute,
}: Readonly<{
    level: Readonly<LevelDefinition>;
    point: Readonly<Coords>;
    beltSpeedPxPerMs: number;
    msSinceLastExecute: number;
}>): {onBelt: boolean; dx: number; dy: number} {
    for (const path of level.paths) {
        const nearest = getNearestPathPoint(path, point);
        if (nearest.distance > path.widthPx / 2) {
            continue;
        }
        if (nearest.alongPx >= getPathLength(path)) {
            return {
                onBelt: true,
                dx: 0,
                dy: 0,
            };
        }
        const direction = getPathDirectionAt(path, nearest.alongPx);
        const carryPx = beltSpeedPxPerMs * msSinceLastExecute;

        return {
            onBelt: true,
            dx: direction.x * carryPx,
            dy: direction.y * carryPx,
        };
    }

    return {
        onBelt: false,
        dx: 0,
        dy: 0,
    };
}
