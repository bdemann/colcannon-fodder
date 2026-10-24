import {mashConfig} from '../config/game-config.js';
import {potatoVarietyConfig} from '../config/potato-variety-config.js';
import {type PotatoProcessing} from '../run/run-state.js';
import {getTowerStats, TowerType, towerTypes} from '../tower/tower-type.js';
import {PotatoVariety} from './potato-variety.js';

/**
 * The damage multiplier a hit from `towerType` gets on a potato in this state (1 = none): Cut and
 * Soft bonuses, minus the variety traits (tough skin until Cut, dense vs. unsoftened Mashers) and
 * eyes (blades). Every tower and the hit numbers go through here.
 */
export function getHitMultiplier(
    processing: Readonly<PotatoProcessing>,
    towerType: TowerType,
): number {
    const cutFactor = processing.cut ? mashConfig.cutMultiplier : 1;
    const softFactor =
        towerType === TowerType.Masher && processing.cooked ? mashConfig.softMasherMultiplier : 1;

    const variety = potatoVarietyConfig.varieties[processing.variety ?? PotatoVariety.Russet];
    const toughFactor =
        variety.toughSkin && !processing.cut ? potatoVarietyConfig.toughSkinMultiplier : 1;
    const denseFactor =
        variety.dense && towerType === TowerType.Masher && !processing.cooked
            ? potatoVarietyConfig.denseMasherMultiplier
            : 1;
    const eyesFactor =
        processing.hasEyes && (towerType === TowerType.Knife || towerType === TowerType.Laser)
            ? potatoVarietyConfig.eyesBladeMultiplier
            : 1;

    return cutFactor * softFactor * toughFactor * denseFactor * eyesFactor;
}

/** Damage one hit from `towerType` does to a potato in this state. */
export function getHitDamage(
    processing: Readonly<PotatoProcessing>,
    towerType: TowerType,
    tower: Readonly<{level?: number; wear?: number}> = {},
): number {
    return (
        getTowerStats(towerType, tower.level ?? 1, tower.wear ?? 0).damage *
        getHitMultiplier(processing, towerType)
    );
}

/** Applies one hit in place: damage first (using the state before the hit), then the tower's effect. */
export function applyTowerHit(
    processing: PotatoProcessing,
    towerType: TowerType,
    tower: Readonly<{level?: number; wear?: number}> = {},
): void {
    processing.mashHp = Math.max(0, processing.mashHp - getHitDamage(processing, towerType, tower));

    const effect = towerTypes[towerType].appliesEffect;
    if (effect) {
        processing[effect] = true;
    }
}

/** 0 = untouched, 1 = fully mashed. */
export function getMashProgress(processing: Readonly<PotatoProcessing>): number {
    return 1 - processing.mashHp / processing.maxMashHp;
}
