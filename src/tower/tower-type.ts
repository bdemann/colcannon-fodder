import {towerTypeConfig} from '../config/game-config.js';

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
export type TowerBehavior = 'mash' | 'gull-trap' | 'swipe';

/** Everything that differs between tower types. Shared behavior lives in the tower entity. */
export type TowerTypeDefinition = {
    towerType: TowerType;
    /** Shown on the toolbar button and next to the tower. */
    label: string;
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
        hotkey: '1',
        color: '#b8c4cc',
        appliesEffect: 'cut',
        areaOfEffect: false,
        behavior: 'mash',
        ...towerTypeConfig.knife,
    },
    [TowerType.Boiler]: {
        towerType: TowerType.Boiler,
        label: 'Boiling Pot',
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
        hotkey: '4',
        color: '#ab47bc',
        appliesEffect: undefined,
        areaOfEffect: false,
        behavior: 'mash',
        ...towerTypeConfig.microwave,
    },
    [TowerType.CricketTrap]: {
        towerType: TowerType.CricketTrap,
        label: 'Cricket Trap',
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
        hotkey: '6',
        color: '#26a69a',
        appliesEffect: undefined,
        areaOfEffect: false,
        behavior: 'swipe',
        ...towerTypeConfig.swiper,
    },
};

/**
 * A tower's stats at an upgrade level. Every reader of damage, range or cooldown should go through
 * this so upgrades (tower upgrades issue) only change one place. Level 1 is the base stats.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- level is used once upgrades land
export function getTowerStats(towerType: TowerType, _level: number) {
    const {damage, rangePx, cooldownMs} = towerTypes[towerType];

    return {
        damage,
        rangePx,
        cooldownMs,
    };
}
