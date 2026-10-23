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
