import {economyConfig} from '../config/game-config.js';
import {wearConfig} from '../config/wear-config.js';
import {type TowerType} from './tower-type.js';

/** Strength multiplier for a tower at `wear`: full strength until worn (100), then reduced. */
export function getWearMultiplier(wear: number): number {
    return wear >= wearConfig.maxWear ? wearConfig.wornEffectiveness : 1;
}

/** Coins to service a tower: a share of its build cost, rounded, at least the configured minimum. */
export function getServiceCost(towerType: TowerType): number {
    return Math.max(
        wearConfig.minServiceCost,
        Math.round(economyConfig.towerCost[towerType] * wearConfig.serviceCostShare),
    );
}

/** `wear` after adding `amount`, capped at the worn level. */
export function addWear({wear, amount}: Readonly<{wear: number; amount: number}>): number {
    return Math.min(wearConfig.maxWear, wear + amount);
}

/** Wear added by one use of a tower type, or 0 for types that only wear per second. */
export function getWearPerUse(towerType: TowerType): number {
    const perUse: Readonly<Partial<Record<TowerType, number>>> = wearConfig.perUse;
    return perUse[towerType] ?? 0;
}

/** Wear added per second of work by continuous towers, or 0 for the others. */
export function getWearPerSecond(towerType: TowerType): number {
    const perSecond: Readonly<Partial<Record<TowerType, number>>> = wearConfig.perSecond;
    return perSecond[towerType] ?? 0;
}

/** The service button's verb, such as `Sharpen`. */
export function getServiceVerb(towerType: TowerType): string {
    return wearConfig.serviceVerb[towerType];
}
