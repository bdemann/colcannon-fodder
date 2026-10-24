import {potatoSizeConfig} from '../config/game-config.js';
import {knifeConfig} from '../config/knife-config.js';
import {potatoVarietyConfig} from '../config/potato-variety-config.js';
import {qualityConfig} from '../config/quality-config.js';
import {getHitDamage} from '../potato/mash.js';
import {PotatoSize} from '../potato/potato-size.js';
import {PotatoVariety, type PotatoVarietyWeights} from '../potato/potato-variety.js';
import {type WaveSettings} from '../run/endless.js';
import {type PotatoProcessing} from '../run/run-state.js';
import {getDamageScale, getTowerStats, TowerType, towerTypes} from '../tower/tower-type.js';

/**
 * The pure model behind `docs/tower-balance.md`: how long a potato stays in a tower's area, how
 * many hits that is and how much damage they do. It reads the real config and the real
 * `getHitDamage`, so the docs, the sheets and the goal tests cannot drift from the game.
 */
export const balanceModelConfig = {
    /**
     * Distance from the belt center line to a tower's center: half belt 45 + tower radius 30 + a 15
     * px gap. Circles cover a belt chord of `2 x sqrt(R^2 - this^2)`.
     */
    towerOffsetPx: 90,
} as const;

/** How a tower's area crosses the belt. */
export enum PassGeometry {
    /** A slice straight across the belt (Knife): potato width plus the slice thickness. */
    Slice = 'slice',
    /** A circle beside the belt: the chord it covers. */
    Chord = 'chord',
    /** A beam running down the belt (aligned Laser): its full length. */
    Beam = 'beam',
}

/** The geometry a tower normally has; the Laser defaults to its aligned best case. */
export function getDefaultGeometry(towerType: TowerType): PassGeometry {
    if (towerType === TowerType.Knife) {
        return PassGeometry.Slice;
    }
    return towerType === TowerType.Laser ? PassGeometry.Beam : PassGeometry.Chord;
}

/** A potato as the model sees it. */
export type ModelPotato = Readonly<{
    size: Exclude<PotatoSize, PotatoSize.King>;
    variety: PotatoVariety;
    hasEyes: boolean;
}>;

/** What the potato already went through before reaching the tower. */
export type ModelPrep = Readonly<{cut: boolean; cooked: boolean}>;

export const unpreppedState: ModelPrep = {
    cut: false,
    cooked: false,
};
export const preppedState: ModelPrep = {
    cut: true,
    cooked: true,
};

/** Mash HP of a potato, rounded the way the spawner rounds it. */
export function getPotatoHp(potato: ModelPotato, hpMultiplier: number): number {
    return Math.round(
        potatoSizeConfig[potato.size].mashHp *
            hpMultiplier *
            potatoVarietyConfig.varieties[potato.variety].hpMultiplier,
    );
}

/** The belt length (px) the potato spends inside the tower's area while passing. */
export function getPassLengthPx({
    towerType,
    size,
    geometry = getDefaultGeometry(towerType),
    level = 1,
}: Readonly<{
    towerType: TowerType;
    size: ModelPotato['size'];
    geometry?: PassGeometry;
    level?: number;
}>): number {
    const {rangePx} = getTowerStats(towerType, level);
    if (geometry === PassGeometry.Slice) {
        return 2 * knifeConfig.lineHalfWidthPx + 2 * potatoSizeConfig[size].radius;
    } else if (geometry === PassGeometry.Beam) {
        return rangePx;
    } else {
        return 2 * Math.sqrt(rangePx ** 2 - balanceModelConfig.towerOffsetPx ** 2);
    }
}

/** Seconds the potato stays in the area at the wave's belt speed. */
export function getDwellSeconds({
    passLengthPx,
    speedPxPerMs,
}: Readonly<{passLengthPx: number; speedPxPerMs: number}>): number {
    return passLengthPx / speedPxPerMs / 1000;
}

/** Hits (fractional) a tower lands during one pass. */
export function getHitsPerPass({
    towerType,
    dwellSeconds,
    level = 1,
}: Readonly<{towerType: TowerType; dwellSeconds: number; level?: number}>): number {
    const {cooldownMs} = getTowerStats(towerType, level);
    return cooldownMs > 0 ? (dwellSeconds * 1000) / cooldownMs : 0;
}

function toProcessing(potato: ModelPotato, prep: ModelPrep, hp: number): PotatoProcessing {
    return {
        cut: prep.cut,
        cooked: prep.cooked,
        mashHp: hp,
        maxMashHp: hp,
        variety: potato.variety,
        hasEyes: potato.hasEyes,
    };
}

/** A pass of one tower: the damage it did and the state it leaves the potato in. */
export type PassResult = Readonly<{damage: number; after: ModelPrep}>;

/**
 * Damage one tower does to `potato` during one pass, starting from `prep`. The first hit uses the
 * state on arrival, later hits the state after the tower's own effect (a Knife's first hit Cuts).
 * The Microwave cone deals flat damage per second that ignores every multiplier, like the game.
 */
export function getPassResult({
    towerType,
    potato,
    speedPxPerMs,
    prep = unpreppedState,
    level = 1,
    geometry,
}: Readonly<{
    towerType: TowerType;
    potato: ModelPotato;
    speedPxPerMs: number;
    prep?: ModelPrep;
    level?: number;
    geometry?: PassGeometry;
}>): PassResult {
    const definition = towerTypes[towerType];
    const dwellSeconds = getDwellSeconds({
        passLengthPx: getPassLengthPx({
            towerType,
            size: potato.size,
            level,
            ...(geometry
                ? {
                      geometry,
                  }
                : {}),
        }),
        speedPxPerMs,
    });
    const effect = definition.appliesEffect;
    const after: ModelPrep = {
        cut: prep.cut || effect === 'cut',
        cooked: prep.cooked || effect === 'cooked',
    };

    if (towerType === TowerType.Microwave) {
        return {
            damage: qualityConfig.microwaveDamagePerSecond * getDamageScale(level) * dwellSeconds,
            after: prep,
        };
    }

    const stats = getTowerStats(towerType, level);
    if (stats.damage <= 0) {
        return {
            damage: 0,
            after,
        };
    }

    const hits = getHitsPerPass({
        towerType,
        dwellSeconds,
        level,
    });
    const first = getHitDamage(toProcessing(potato, prep, 1), towerType, {
        level,
    });
    const later = getHitDamage(toProcessing(potato, after, 1), towerType, {
        level,
    });

    return {
        damage: hits <= 1 ? first * hits : first + later * (hits - 1),
        after,
    };
}

/** Damage per pass of one tower. See `getPassResult`. */
export function getDamagePerPass(params: Parameters<typeof getPassResult>[0]): number {
    return getPassResult(params).damage;
}

/**
 * Total damage of several towers one after another on one potato (each pass starts where the last
 * left off).
 */
export function getLineDamage({
    towers,
    potato,
    speedPxPerMs,
    prep = unpreppedState,
}: Readonly<{
    towers: ReadonlyArray<TowerType>;
    potato: ModelPotato;
    speedPxPerMs: number;
    prep?: ModelPrep;
}>): number {
    let state = prep;
    let total = 0;
    for (const towerType of towers) {
        const result = getPassResult({
            towerType,
            potato,
            speedPxPerMs,
            prep: state,
        });
        total += result.damage;
        state = result.after;
    }
    return total;
}

/** The parts of a wave the model reads. */
export type ModelWave = Pick<
    WaveSettings,
    | 'hpMultiplier'
    | 'sizeWeights'
    | 'varietyWeights'
    | 'eyesChance'
    | 'speedPxPerMs'
    | 'spawnIntervalMs'
    | 'clumpChance'
    | 'clumpMaxExtra'
    | 'extraSpawnsPerSecond'
>;

const sizes = [
    PotatoSize.Small,
    PotatoSize.Medium,
    PotatoSize.Large,
] as const;

/** One kind of potato a wave can spawn, with its chance and HP. */
export type WaveEntry = Readonly<{potato: ModelPotato; probability: number; hp: number}>;

/** Every size x variety x eyes combination a wave can roll, with its chance. */
export function getWaveEntries(wave: Readonly<ModelWave>): ReadonlyArray<WaveEntry> {
    const entries: WaveEntry[] = [];
    for (const size of sizes) {
        for (const variety of Object.values(PotatoVariety)) {
            for (const hasEyes of [
                false,
                true,
            ]) {
                const probability =
                    wave.sizeWeights[size] *
                    (wave.varietyWeights as PotatoVarietyWeights)[variety] *
                    (hasEyes ? wave.eyesChance : 1 - wave.eyesChance);
                if (probability > 0) {
                    const potato = {
                        size,
                        variety,
                        hasEyes,
                    };
                    entries.push({
                        potato,
                        probability,
                        hp: getPotatoHp(potato, wave.hpMultiplier),
                    });
                }
            }
        }
    }
    return entries;
}

/** The expected value of `getValue` over the wave's potatoes. */
export function getWaveAverage(
    wave: Readonly<ModelWave>,
    getValue: (entry: WaveEntry) => number,
): number {
    return getWaveEntries(wave).reduce(
        (sum, entry) => sum + entry.probability * getValue(entry),
        0,
    );
}

/** Average mash HP of the wave's potatoes. */
export function getAverageHp(wave: Readonly<ModelWave>): number {
    return getWaveAverage(wave, (entry) => entry.hp);
}

/** Average damage of `towers` in a row over the wave's potatoes. */
export function getAverageLineDamage({
    wave,
    towers,
    prep = unpreppedState,
}: Readonly<{wave: Readonly<ModelWave>; towers: ReadonlyArray<TowerType>; prep?: ModelPrep}>) {
    return getWaveAverage(wave, (entry) => {
        return getLineDamage({
            towers,
            potato: entry.potato,
            speedPxPerMs: wave.speedPxPerMs,
            prep,
        });
    });
}

/** Potatoes per second entering the belt (regular spawns, clumps and surprise extras). */
export function getSpawnRatePerSecond(wave: Readonly<ModelWave>): number {
    return (
        (1 / wave.spawnIntervalMs) *
            1000 *
            (1 + (wave.clumpChance * (1 + wave.clumpMaxExtra)) / 2) +
        wave.extraSpawnsPerSecond
    );
}

/**
 * Potatoes per second `count` towers of `towerType` can finish with no prep, ignoring dwell time:
 * their damage per second divided by the average HP the traits make effective (`hp / multiplier`).
 * It must keep up with `getSpawnRatePerSecond` or potatoes pile up unmashed.
 */
export function getSustainedPotatoesPerSecond({
    wave,
    towerType,
    count,
}: Readonly<{wave: Readonly<ModelWave>; towerType: TowerType; count: number}>): number {
    const stats = getTowerStats(towerType, 1);
    const damagePerSecond = (stats.damage / stats.cooldownMs) * 1000;
    const effectiveHp = getWaveAverage(wave, (entry) => {
        const multiplier =
            getHitDamage(toProcessing(entry.potato, unpreppedState, 1), towerType) / stats.damage;
        return entry.hp / multiplier;
    });
    return (count * damagePerSecond) / effectiveHp;
}
