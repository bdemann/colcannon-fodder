/**
 * The kinds of regular potato. Each has an HP multiplier and maybe a trait (see
 * `potatoVarietyConfig`).
 */
export enum PotatoVariety {
    Red = 'red',
    Russet = 'russet',
    Yukon = 'yukon',
    ToughSkinned = 'tough-skinned',
    Sweet = 'sweet',
    Yam = 'yam',
}

/** Chance of each variety for one wave. Numbers sum to 1. */
export type PotatoVarietyWeights = Readonly<Record<PotatoVariety, number>>;

const varietyOrder = [
    PotatoVariety.Red,
    PotatoVariety.Russet,
    PotatoVariety.Yukon,
    PotatoVariety.ToughSkinned,
    PotatoVariety.Sweet,
    PotatoVariety.Yam,
] as const;

/** Picks a variety from `weights` for a `roll` in [0, 1) (use `state.seededRandom.next()`). */
export function pickPotatoVariety(weights: PotatoVarietyWeights, roll: number): PotatoVariety {
    let remaining = roll;

    for (const variety of varietyOrder) {
        remaining -= weights[variety];
        if (remaining < 0 && weights[variety] > 0) {
            return variety;
        }
    }

    // Rounding leftovers: fall back to the last variety that has any weight.
    return varietyOrder.findLast((variety) => weights[variety] > 0) ?? PotatoVariety.Russet;
}

/** Fills the varieties a wave does not mention with weight 0. */
export function createVarietyWeights(
    weights: Readonly<Partial<Record<PotatoVariety, number>>>,
): PotatoVarietyWeights {
    return {
        [PotatoVariety.Red]: weights[PotatoVariety.Red] ?? 0,
        [PotatoVariety.Russet]: weights[PotatoVariety.Russet] ?? 0,
        [PotatoVariety.Yukon]: weights[PotatoVariety.Yukon] ?? 0,
        [PotatoVariety.ToughSkinned]: weights[PotatoVariety.ToughSkinned] ?? 0,
        [PotatoVariety.Sweet]: weights[PotatoVariety.Sweet] ?? 0,
        [PotatoVariety.Yam]: weights[PotatoVariety.Yam] ?? 0,
    };
}
