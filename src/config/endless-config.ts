/**
 * Endless mode: wave `n` (1-based) is generated from these numbers by `generateEndlessWave`. Each
 * wave turns the difficulty knobs a little further, up to the caps.
 */
export const endlessConfig = {
    potatoBase: 8,
    potatoPerWave: 3,
    spawnIntervalBaseMs: 3500,
    spawnIntervalPerWaveMs: 180,
    spawnIntervalMinMs: 700,
    speedBase: 0.07,
    speedPerWave: 0.004,
    speedMax: 0.14,
    largeWeightPerWave: 0.05,
    largeWeightMax: 0.7,
    smallWeightStart: 0.5,
    smallWeightPerWave: 0.05,
    /** A seagull for every this many waves. */
    wavesPerSeagull: 2,
    chuteSharePerWave: 0.05,
    chuteShareMax: 0.35,
    clumpChancePerWave: 0.04,
    clumpChanceMax: 0.4,
    wavesPerClumpExtra: 3,
    clumpMaxExtraMax: 5,
    extraSpawnsPerWave: 0.015,
    extraSpawnsMax: 0.15,
    /** Every this many waves is a Russet King boss wave. */
    bossEveryWaves: 5,
    orders: {
        wavesPerOpenOrder: 3,
        maxOpenBase: 1,
        maxOpenMax: 4,
        intervalBaseMs: 12_000,
        intervalPerWaveMs: 500,
        intervalMinMs: 5000,
        lifetimeBaseMs: 35_000,
        lifetimePerWaveMs: 1000,
        lifetimeMinMs: 18_000,
        /** From this wave on, every dish can be ordered. */
        allDishesFromWave: 3,
    },
} as const;

/** Old per-level key prefix for the best endless wave count; the records module migrates it. */
export const endlessBestStorageKey = 'colcannon-fodder-endless-best:';
