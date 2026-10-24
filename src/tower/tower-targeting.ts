import {type PotatoProcessing} from '../run/run-state.js';

/** A potato a tower could process, with where it is and how far along its path it is. */
export type TargetCandidate = Readonly<{
    x: number;
    y: number;
    distancePx: number;
    processing: Readonly<PotatoProcessing>;
}>;

/**
 * Index into `candidates` of the potato this tower should hit, or -1 for none. Fully mashed
 * potatoes are never targeted. A tower that applies an effect prefers potatoes lacking it, then
 * picks the potato furthest along the path.
 */
export function chooseTargetIndex(
    tower: Readonly<{
        x: number;
        y: number;
        rangePx: number;
        appliesEffect: 'cut' | 'cooked' | undefined;
    }>,
    candidates: ReadonlyArray<TargetCandidate>,
): number {
    const eligible = candidates
        .map((candidate, index) => {
            return {
                candidate,
                index,
            };
        })
        .filter(({candidate}) => {
            return (
                Math.hypot(candidate.x - tower.x, candidate.y - tower.y) <= tower.rangePx &&
                candidate.processing.mashHp > 0
            );
        });
    const effect = tower.appliesEffect;
    const lacking = effect ? eligible.filter(({candidate}) => !candidate.processing[effect]) : [];
    const pool = lacking.length > 0 ? lacking : eligible;

    let bestIndex = -1;
    let bestDistancePx = -Infinity;
    for (const {candidate, index} of pool) {
        if (candidate.distancePx > bestDistancePx) {
            bestIndex = index;
            bestDistancePx = candidate.distancePx;
        }
    }

    return bestIndex;
}

/** Indexes of every candidate an area-of-effect tower hits: all within range with mashHp > 0. */
export function chooseAreaTargetIndexes(
    tower: Readonly<{x: number; y: number; rangePx: number}>,
    candidates: ReadonlyArray<TargetCandidate>,
): number[] {
    const indexes: number[] = [];
    candidates.forEach((candidate, index) => {
        if (
            Math.hypot(candidate.x - tower.x, candidate.y - tower.y) <= tower.rangePx &&
            candidate.processing.mashHp > 0
        ) {
            indexes.push(index);
        }
    });

    return indexes;
}

/** A seagull a tower could hit. */
export type GullCandidate = Readonly<{
    x: number;
    y: number;
    carrying: boolean;
}>;

/** Indexes of every gull within range of the tower. */
export function getGullsInRange(
    tower: Readonly<{x: number; y: number; rangePx: number}>,
    gulls: ReadonlyArray<GullCandidate>,
): number[] {
    const indexes: number[] = [];
    gulls.forEach((gull, index) => {
        if (Math.hypot(gull.x - tower.x, gull.y - tower.y) <= tower.rangePx) {
            indexes.push(index);
        }
    });

    return indexes;
}

/**
 * Index into `gulls` of the one a single-target tower hits, or -1 for none: a gull carrying a
 * potato first, then the nearest.
 */
export function chooseGullTargetIndex(
    tower: Readonly<{x: number; y: number; rangePx: number}>,
    gulls: ReadonlyArray<GullCandidate>,
): number {
    let bestIndex = -1;
    let bestCarrying = false;
    let bestDistancePx = Infinity;
    for (const index of getGullsInRange(tower, gulls)) {
        const gull = gulls[index];
        if (!gull) {
            continue;
        }
        const distancePx = Math.hypot(gull.x - tower.x, gull.y - tower.y);
        if (
            bestIndex < 0 ||
            (gull.carrying && !bestCarrying) ||
            (gull.carrying === bestCarrying && distancePx < bestDistancePx)
        ) {
            bestIndex = index;
            bestCarrying = gull.carrying;
            bestDistancePx = distancePx;
        }
    }

    return bestIndex;
}

/**
 * Cheap pre-check: false means the point is certainly outside the tower's range, so it can be left
 * out of the candidates without changing which one the choosers pick (they still do the exact
 * distance check on what is left). A square test, with a little slack for rounding.
 */
export function isInRangeBox(
    tower: Readonly<{x: number; y: number; rangePx: number}>,
    point: Readonly<{x: number; y: number}>,
): boolean {
    const reach = tower.rangePx + 1e-6;

    return Math.abs(point.x - tower.x) <= reach && Math.abs(point.y - tower.y) <= reach;
}
