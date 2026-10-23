/**
 * Every gameplay tunable lives here so balancing never means hunting through entity code. Times are
 * in milliseconds, distances in game-world pixels (the world is 1920x1080), speeds in pixels per
 * millisecond.
 */

/** Potato size. Speed and spawn rate come from `waveConfig`. */
export const potatoConfig = {
    radius: 22,
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
        },
        {
            potatoCount: 10,
            spawnIntervalMs: 1400,
            speedPxPerMs: 0.12,
        },
        {
            potatoCount: 14,
            spawnIntervalMs: 1100,
            speedPxPerMs: 0.14,
        },
        {
            potatoCount: 18,
            spawnIntervalMs: 850,
            speedPxPerMs: 0.16,
        },
        {
            potatoCount: 24,
            spawnIntervalMs: 650,
            speedPxPerMs: 0.18,
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
    knife: {
        damage: 10,
        rangePx: 140,
        cooldownMs: 400,
    },
    boiler: {
        damage: 15,
        rangePx: 140,
        cooldownMs: 400,
    },
    masher: {
        damage: 30,
        rangePx: 140,
        cooldownMs: 400,
    },
} as const;

/** The mash meter. See issue #36. */
export const mashConfig = {
    potatoHp: 100,
    cutMultiplier: 1.5,
    softMasherMultiplier: 2,
} as const;

/** HUD timings. */
export const hudConfig = {
    servingPopupMs: 1200,
} as const;

/** Tower processing feedback. */
export const towerFeedbackConfig = {
    flashMs: 150,
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
