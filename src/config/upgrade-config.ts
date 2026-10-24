/** Tower upgrades and selling. Multipliers apply to the tower type's base stats. */
export const upgradeConfig = {
    maxLevel: 3,
    /** Upgrade price to reach level 2 and level 3, as a multiple of the tower's build cost. */
    costMultiplierByLevel: {
        2: 0.75,
        3: 1.25,
    },
    /** Stat multipliers per level. Level 1 is 1. */
    damageByLevel: {
        1: 1,
        2: 1.4,
        3: 1.9,
    },
    rangeByLevel: {
        1: 1,
        2: 1.15,
        3: 1.3,
    },
    cooldownByLevel: {
        1: 1,
        2: 0.85,
        3: 0.7,
    },
    /** Selling refunds this share of everything spent on the tower. */
    sellRefund: 0.5,
} as const;
