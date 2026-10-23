/**
 * Every gameplay tunable lives here so balancing never means hunting through entity code. Times are
 * in milliseconds, distances in game-world pixels (the world is 1920x1080), speeds in pixels per
 * millisecond.
 */

/** Potato movement and spawning. */
export const potatoConfig = {
    radius: 22,
    speedPxPerMs: 0.12,
    spawnIntervalMs: 1500,
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

/** The number of potatoes in one run. Surviving them all wins the run. Replaced by waves in #8. */
export const runConfig = {
    potatoesPerRun: 30,
} as const;

/** Tower placement rules shared by every tower type. */
export const towerConfig = {
    /** Towers are circles of this radius. Used for drawing and for overlap checks. */
    radius: 30,
} as const;

/** Per-type tower tunables. Keyed by `TowerType` values from `src/tower/tower-type.ts`. */
export const towerTypeConfig = {
    knife: {
        rangePx: 140,
        cooldownMs: 400,
    },
    boiler: {
        rangePx: 140,
        cooldownMs: 400,
    },
    masher: {
        rangePx: 140,
        cooldownMs: 400,
    },
} as const;

/** HUD timings. */
export const hudConfig = {
    servingPopupMs: 1200,
} as const;
