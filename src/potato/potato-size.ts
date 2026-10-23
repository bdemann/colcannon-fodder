export enum PotatoSize {
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
}

/** Chance of each size for one wave. Numbers sum to 1. */
export type PotatoSizeWeights = Readonly<Record<PotatoSize, number>>;

const sizeOrder = [
    PotatoSize.Small,
    PotatoSize.Medium,
    PotatoSize.Large,
] as const;

/** Picks a size from `weights` for a `roll` in [0, 1) (use `state.seededRandom.next()`). */
export function pickPotatoSize(weights: PotatoSizeWeights, roll: number): PotatoSize {
    let remaining = roll;

    for (const size of sizeOrder) {
        remaining -= weights[size];
        if (remaining < 0 && weights[size] > 0) {
            return size;
        }
    }

    // Rounding leftovers: fall back to the largest size that has any weight.
    return sizeOrder.findLast((size) => weights[size] > 0) ?? PotatoSize.Medium;
}
