/** The per-wave spawn variety fields of `waveConfig.waves`. */
export type SpawnVarietyWave = {
    clumpChance: number;
    clumpMaxExtra: number;
    extraSpawnsPerSecond: number;
};

/**
 * How many extra potatoes join a regular spawn as a clump (0 for none). `chanceRoll` decides
 * whether there is a clump, `sizeRoll` how big it is: `1 + floor(sizeRoll * clumpMaxExtra)`.
 */
export function getClumpExtraCount({
    wave,
    chanceRoll,
    sizeRoll,
}: Readonly<{wave: Readonly<SpawnVarietyWave>; chanceRoll: number; sizeRoll: number}>): number {
    if (chanceRoll >= wave.clumpChance) {
        return 0;
    }
    return 1 + Math.floor(sizeRoll * wave.clumpMaxExtra);
}

/** Whether a surprise extra potato drops in during this update of `msElapsed`. */
export function shouldSpawnExtra({
    wave,
    msElapsed,
    roll,
}: Readonly<{wave: Readonly<SpawnVarietyWave>; msElapsed: number; roll: number}>): boolean {
    return roll < (wave.extraSpawnsPerSecond * msElapsed) / 1000;
}
