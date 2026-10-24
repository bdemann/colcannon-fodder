/** Tuning for tower wear: towers work at reduced strength until serviced for coins. */
export const wearConfig = {
    /** Wear added per use; a tower is worn at 100. */
    perUse: {
        knife: 0.45,
        boiler: 2.5,
        masher: 2,
        'cricket-trap': 12,
    },
    /** Continuous towers wear per second while working. */
    perSecond: {
        microwave: 1.8,
        swiper: 1.1,
    },
    /** A worn tower works at this strength. */
    wornEffectiveness: 0.5,
    /** Servicing costs this share of the tower's build cost (rounded, at least 5). */
    serviceCostShare: 0.3,
    /** The least a service ever costs. */
    minServiceCost: 5,
    /** Wear at which a tower counts as worn. */
    maxWear: 100,
    /** The service button's verb per tower type. */
    serviceVerb: {
        knife: 'Sharpen',
        boiler: 'Refill',
        masher: 'Oil',
        microwave: 'Clean',
        'cricket-trap': 'Restock',
        swiper: 'Oil',
    },
} as const;
