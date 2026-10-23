import {towerTypeConfig} from '../config/game-config.js';

export enum TowerType {
    Knife = 'knife',
    Boiler = 'boiler',
    Masher = 'masher',
}

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
        ...towerTypeConfig.knife,
    },
    [TowerType.Boiler]: {
        towerType: TowerType.Boiler,
        label: 'Boiling Pot',
        hotkey: '2',
        color: '#3a8ee6',
        appliesEffect: 'cooked',
        areaOfEffect: true,
        ...towerTypeConfig.boiler,
    },
    [TowerType.Masher]: {
        towerType: TowerType.Masher,
        label: 'Masher',
        hotkey: '3',
        color: '#e6a23a',
        appliesEffect: undefined,
        areaOfEffect: false,
        ...towerTypeConfig.masher,
    },
};
