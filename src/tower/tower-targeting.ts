import {type PotatoProcessing} from '../run/run-state.js';

/** A potato a tower could process, with where it is and how far along its path it is. */
export type TargetCandidate = Readonly<{
    x: number;
    y: number;
    distancePx: number;
    processing: Readonly<PotatoProcessing>;
}>;

/** Index into `candidates` of the potato this tower should process, or -1 for none. */
export function chooseTargetIndex(
    tower: Readonly<{x: number; y: number; rangePx: number; processes: keyof PotatoProcessing}>,
    candidates: ReadonlyArray<TargetCandidate>,
): number {
    let bestIndex = -1;
    let bestDistancePx = -Infinity;

    candidates.forEach((candidate, index) => {
        const eligible =
            Math.hypot(candidate.x - tower.x, candidate.y - tower.y) <= tower.rangePx &&
            !candidate.processing[tower.processes];

        if (eligible && candidate.distancePx > bestDistancePx) {
            bestIndex = index;
            bestDistancePx = candidate.distancePx;
        }
    });

    return bestIndex;
}
