import {type Coords} from '@augment-vir/common';
import {gameWorldSize} from '../game-state/game-world.js';

/** How far outside the world edge gulls spawn, so they fly in from off screen. */
const entryMarginPx = 40;

/**
 * A spawn point on the top, right or bottom edge, from two rolls in [0, 1). Never the left edge,
 * where the belt starts.
 */
export function pickSeagullEntry({
    rollEdge,
    rollAlong,
}: Readonly<{rollEdge: number; rollAlong: number}>): Coords {
    if (rollEdge < 1 / 3) {
        return {
            x: rollAlong * gameWorldSize.width,
            y: -entryMarginPx,
        };
    } else if (rollEdge < 2 / 3) {
        return {
            x: gameWorldSize.width + entryMarginPx,
            y: rollAlong * gameWorldSize.height,
        };
    } else {
        return {
            x: rollAlong * gameWorldSize.width,
            y: gameWorldSize.height + entryMarginPx,
        };
    }
}

/** The nearest point on any world edge, for escaping. */
export function nearestEdgePoint(position: Readonly<Coords>): Coords {
    const candidates: Coords[] = [
        {
            x: 0,
            y: position.y,
        },
        {
            x: gameWorldSize.width,
            y: position.y,
        },
        {
            x: position.x,
            y: 0,
        },
        {
            x: position.x,
            y: gameWorldSize.height,
        },
    ];
    let best = candidates[0] ?? position;
    let bestDistance = Infinity;
    for (const candidate of candidates) {
        const distance = Math.hypot(candidate.x - position.x, candidate.y - position.y);
        if (distance < bestDistance) {
            best = candidate;
            bestDistance = distance;
        }
    }

    return {
        x: best.x,
        y: best.y,
    };
}

/** Moves `from` toward `to` by at most `stepPx`; returns the new position. */
export function stepToward({
    from,
    to,
    stepPx,
}: Readonly<{from: Readonly<Coords>; to: Readonly<Coords>; stepPx: number}>): Coords {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const distance = Math.hypot(dx, dy);
    if (distance <= stepPx || distance === 0) {
        return {
            x: to.x,
            y: to.y,
        };
    }

    return {
        x: from.x + (dx / distance) * stepPx,
        y: from.y + (dy / distance) * stepPx,
    };
}
