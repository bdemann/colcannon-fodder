/**
 * Every gameplay tunable lives here so balancing never means hunting through entity code. Times are
 * in milliseconds, distances in game-world pixels (the world is 1920x1080), speeds in pixels per
 * millisecond.
 */

/** Per-size potato stats. `value` multiplies the perfect-serving score and coins. */
export const potatoSizeConfig = {
    small: {
        radius: 16,
        mashHp: 120,
        value: 0.6,
    },
    medium: {
        radius: 22,
        mashHp: 200,
        value: 1,
    },
    large: {
        radius: 30,
        mashHp: 340,
        value: 1.8,
    },
} as const;

/** The conveyor belt look. */
export const beltConfig = {
    /** Distance between the moving stripes. */
    stripeSpacingPx: 40,
} as const;

/** Restaurant satisfaction is the "health" of a run. The run is lost when it reaches 0. */
export const satisfactionConfig = {
    starting: 100,
    max: 100,
} as const;

/** How each serving changes the score and the restaurant's satisfaction. */
export const servingConfig = {
    perfect: {
        score: 100,
        satisfaction: 2,
    },
    incomplete: {
        score: 0,
        satisfaction: -5,
    },
    raw: {
        score: 0,
        satisfaction: -15,
    },
} as const;

/** The waves of one run, in order. Surviving them all wins. */
export const waveConfig = {
    /** Quiet time before wave 1 and between waves. */
    breakMs: 6000,
    waves: [
        {
            potatoCount: 8,
            spawnIntervalMs: 1800,
            speedPxPerMs: 0.1,
            sizeWeights: {
                small: 0.5,
                medium: 0.5,
                large: 0,
            },
        },
        {
            potatoCount: 10,
            spawnIntervalMs: 1400,
            speedPxPerMs: 0.12,
            sizeWeights: {
                small: 0.3,
                medium: 0.6,
                large: 0.1,
            },
        },
        {
            potatoCount: 14,
            spawnIntervalMs: 1100,
            speedPxPerMs: 0.14,
            sizeWeights: {
                small: 0.2,
                medium: 0.6,
                large: 0.2,
            },
        },
        {
            potatoCount: 18,
            spawnIntervalMs: 850,
            speedPxPerMs: 0.16,
            sizeWeights: {
                small: 0.1,
                medium: 0.5,
                large: 0.4,
            },
        },
        {
            potatoCount: 24,
            spawnIntervalMs: 650,
            speedPxPerMs: 0.18,
            sizeWeights: {
                small: 0,
                medium: 0.5,
                large: 0.5,
            },
        },
    ],
} as const;

/** Total potatoes in a run (every path spawns one per spawn). Used for the win check. */
export function getPotatoesPerRun(pathCount: number): number {
    return waveConfig.waves.reduce((sum, wave) => sum + wave.potatoCount, 0) * pathCount;
}

/** Tower placement rules shared by every tower type. */
export const towerConfig = {
    /** Towers are circles of this radius. Used for drawing and for overlap checks. */
    radius: 30,
} as const;

/** Per-type tower tunables. Keyed by `TowerType` values from `src/tower/tower-type.ts`. */
export const towerTypeConfig = {
    /** Light and fast: its job is to Cut many potatoes so later hits land harder. */
    knife: {
        damage: 4,
        rangePx: 140,
        cooldownMs: 250,
    },
    /** Area of effect: softens every potato in range at once. */
    boiler: {
        damage: 6,
        rangePx: 140,
        cooldownMs: 1200,
    },
    /** Slow and heavy: the finisher, one potato at a time. */
    masher: {
        damage: 40,
        rangePx: 140,
        cooldownMs: 1000,
    },
} as const;

/** The mash meter. See issue #36. */
export const mashConfig = {
    cutMultiplier: 1.5,
    softMasherMultiplier: 2,
} as const;

/** HUD timings. */
export const hudConfig = {
    servingPopupMs: 1200,
} as const;

/** Hand-applied topping input. */
export const toppingConfig = {
    /** Extra click tolerance around a potato's radius. */
    clickSlopPx: 14,
} as const;

/** Tower processing feedback. */
export const towerFeedbackConfig = {
    flashMs: 150,
    /** How long the area-of-effect splash ring expands and fades. */
    splashMs: 350,
} as const;

/** Synthesized sound effects. */
export const sfxConfig = {
    /** Master gain for all sound effects. */
    volume: 0.35,
} as const;

/** Coins: the only currency. Keyed by TowerType / ServingResult string values. */
export const economyConfig = {
    startingCoins: 150,
    towerCost: {
        knife: 40,
        boiler: 60,
        masher: 80,
    },
    servingCoins: {
        perfect: 20,
        incomplete: 5,
        raw: 0,
    },
} as const;

/**
 * Customer orders (issue: orders and hand-applied toppings). `byWave` is indexed like
 * `waveConfig.waves`; `dishes` lists the `Dish` string values that wave may order (equal odds).
 * Learning curve comes from fewer, slower, simpler orders early.
 */
export const orderConfig = {
    byWave: [
        {
            maxOpen: 1,
            intervalMs: 12_000,
            lifetimeMs: 35_000,
            dishes: [
                'buttered-mash',
                'bangers-and-mash',
            ],
        },
        {
            maxOpen: 2,
            intervalMs: 10_000,
            lifetimeMs: 32_000,
            dishes: [
                'buttered-mash',
                'bangers-and-mash',
                'champ',
            ],
        },
        {
            maxOpen: 2,
            intervalMs: 9000,
            lifetimeMs: 30_000,
            dishes: [
                'buttered-mash',
                'bangers-and-mash',
                'champ',
                'colcannon',
            ],
        },
        {
            maxOpen: 3,
            intervalMs: 8000,
            lifetimeMs: 28_000,
            dishes: [
                'buttered-mash',
                'bangers-and-mash',
                'champ',
                'colcannon',
            ],
        },
        {
            maxOpen: 3,
            intervalMs: 7000,
            lifetimeMs: 25_000,
            dishes: [
                'buttered-mash',
                'bangers-and-mash',
                'champ',
                'colcannon',
            ],
        },
    ],
    /** Delay from a wave starting to spawn until its first order. */
    firstOrderDelayMs: 3000,
    /**
     * Filling an order, on top of the normal perfect serving. Score and coins scale by potato
     * value.
     */
    fulfilled: {
        score: 150,
        coins: 30,
        satisfaction: 5,
    },
    /** An order that runs out of time: an unhappy customer, close to a raw potato. */
    expiredSatisfaction: -12,
} as const;
