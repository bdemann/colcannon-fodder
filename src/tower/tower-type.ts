import {economyConfig, towerTypeConfig} from '../config/game-config.js';
import {upgradeConfig} from '../config/upgrade-config.js';
import {getWearMultiplier} from './wear.js';

export enum TowerType {
    Knife = 'knife',
    Boiler = 'boiler',
    Masher = 'masher',
    Microwave = 'microwave',
    CricketTrap = 'cricket-trap',
    Swiper = 'swiper',
}

/**
 * How a tower acts each update. `mash` is the shared damage path (single target or area of effect).
 * The others live in `src/tower/behaviors/`.
 */
export type TowerBehavior = 'mash' | 'gull-trap' | 'swipe' | 'cone' | 'line';

/** Everything that differs between tower types. Shared behavior lives in the tower entity. */
export type TowerTypeDefinition = {
    towerType: TowerType;
    /** Shown on the toolbar button and next to the tower. */
    label: string;
    /** Short mark drawn on the tower itself. */
    glyph: string;
    /** Keyboard key (`KeyboardEvent.key`) that selects this tower. */
    hotkey: string;
    /** Fill color for the tower circle and its toolbar button. */
    color: string;
    /** The status effect this tower's hits apply, if any. */
    appliesEffect: 'cut' | 'cooked' | undefined;
    /** Hits every potato in range at once instead of one target. */
    areaOfEffect: boolean;
    behavior: TowerBehavior;
    damage: number;
    rangePx: number;
    cooldownMs: number;
};

export const towerTypes: Readonly<Record<TowerType, Readonly<TowerTypeDefinition>>> = {
    [TowerType.Knife]: {
        towerType: TowerType.Knife,
        label: 'Knife',
        glyph: 'K',
        hotkey: '1',
        color: '#b8c4cc',
        appliesEffect: 'cut',
        areaOfEffect: false,
        behavior: 'line',
        ...towerTypeConfig.knife,
    },
    [TowerType.Boiler]: {
        towerType: TowerType.Boiler,
        label: 'Boiling Pot',
        glyph: 'B',
        hotkey: '2',
        color: '#3a8ee6',
        appliesEffect: 'cooked',
        areaOfEffect: true,
        behavior: 'mash',
        ...towerTypeConfig.boiler,
    },
    [TowerType.Masher]: {
        towerType: TowerType.Masher,
        label: 'Masher',
        glyph: 'M',
        hotkey: '3',
        color: '#e6a23a',
        appliesEffect: undefined,
        areaOfEffect: false,
        behavior: 'mash',
        ...towerTypeConfig.masher,
    },
    [TowerType.Microwave]: {
        towerType: TowerType.Microwave,
        label: 'Microwave',
        glyph: 'µ',
        hotkey: '4',
        color: '#ab47bc',
        appliesEffect: undefined,
        areaOfEffect: false,
        behavior: 'cone',
        ...towerTypeConfig.microwave,
    },
    [TowerType.CricketTrap]: {
        towerType: TowerType.CricketTrap,
        label: 'Cricket Trap',
        glyph: 'C',
        hotkey: '5',
        color: '#8d6e63',
        appliesEffect: undefined,
        areaOfEffect: false,
        behavior: 'gull-trap',
        ...towerTypeConfig['cricket-trap'],
    },
    [TowerType.Swiper]: {
        towerType: TowerType.Swiper,
        label: 'Swiper',
        glyph: 'S',
        hotkey: '6',
        color: '#26a69a',
        appliesEffect: undefined,
        areaOfEffect: false,
        behavior: 'swipe',
        ...towerTypeConfig.swiper,
    },
};

type LevelKey = keyof typeof upgradeConfig.damageByLevel;

/** Clamps any level into the configured range, so a bad level never reads an undefined multiplier. */
function toLevelKey(level: number): LevelKey {
    return Math.min(upgradeConfig.maxLevel, Math.max(1, Math.round(level))) as LevelKey;
}

/** The damage multiplier at a level, for damage that is not a per-hit number (the Microwave cone). */
export function getDamageScale(level: number): number {
    return upgradeConfig.damageByLevel[toLevelKey(level)];
}

/**
 * A tower's stats at an upgrade level. Every reader of damage, range or cooldown should go through
 * this so upgrades only change one place. Level 1 is the base stats. A worn tower (`wear` 100) does
 * less damage, and the Cricket Trap reloads slower.
 */
export function getTowerStats(towerType: TowerType, level: number, wear = 0) {
    const {damage, rangePx, cooldownMs} = towerTypes[towerType];
    const key = toLevelKey(level);
    const wearMultiplier = getWearMultiplier(wear);
    const cooldownWearScale = towerTypes[towerType].behavior === 'gull-trap' ? wearMultiplier : 1;

    return {
        damage: Math.round(damage * upgradeConfig.damageByLevel[key] * wearMultiplier),
        rangePx: Math.round(rangePx * upgradeConfig.rangeByLevel[key]),
        cooldownMs: (cooldownMs * upgradeConfig.cooldownByLevel[key]) / cooldownWearScale,
    };
}

/** Coins to upgrade a tower to `toLevel` (2 or 3). */
export function getUpgradeCost(towerType: TowerType, toLevel: 2 | 3): number {
    return Math.round(
        economyConfig.towerCost[towerType] * upgradeConfig.costMultiplierByLevel[toLevel],
    );
}

/** Coins refunded for selling a tower at `level`: a share of the build cost plus every upgrade paid. */
export function getSellValue(towerType: TowerType, level: number): number {
    let spent = economyConfig.towerCost[towerType];
    for (let toLevel = 2; toLevel <= toLevelKey(level); toLevel++) {
        spent += getUpgradeCost(towerType, toLevel as 2 | 3);
    }

    return Math.round(spent * upgradeConfig.sellRefund);
}
