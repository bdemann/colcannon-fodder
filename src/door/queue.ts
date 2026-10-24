/**
 * Where a queued potato ends up this frame: its `next` distance, but never closer than `spacingPx`
 * behind the nearest potato ahead, and never past `endPx` (the counter front).
 */
export function capQueuedDistance({
    next,
    aheadDistances,
    spacingPx,
    endPx,
}: Readonly<{
    next: number;
    /** Distances of the potatoes ahead on the same path. */
    aheadDistances: ReadonlyArray<number>;
    spacingPx: number;
    endPx: number;
}>): number {
    if (!aheadDistances.length) {
        return Math.min(next, endPx);
    }

    return Math.min(next, Math.min(...aheadDistances) - spacingPx);
}
