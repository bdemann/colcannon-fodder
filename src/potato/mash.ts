import {mashConfig} from '../config/game-config.js';
import {type PotatoProcessing} from '../run/run-state.js';
import {getTowerStats, TowerType, towerTypes} from '../tower/tower-type.js';

/** Damage one hit from `towerType` does to a potato in this state. */
export function getHitDamage(
    processing: Readonly<PotatoProcessing>,
    towerType: TowerType,
    level = 1,
): number {
    const cutFactor = processing.cut ? mashConfig.cutMultiplier : 1;
    const softFactor =
        towerType === TowerType.Masher && processing.cooked ? mashConfig.softMasherMultiplier : 1;

    return getTowerStats(towerType, level).damage * cutFactor * softFactor;
}

/** Applies one hit in place: damage first (using the state before the hit), then the tower's effect. */
export function applyTowerHit(processing: PotatoProcessing, towerType: TowerType, level = 1): void {
    processing.mashHp = Math.max(0, processing.mashHp - getHitDamage(processing, towerType, level));

    const effect = towerTypes[towerType].appliesEffect;
    if (effect) {
        processing[effect] = true;
    }
}

/** 0 = untouched, 1 = fully mashed. */
export function getMashProgress(processing: Readonly<PotatoProcessing>): number {
    return 1 - processing.mashHp / processing.maxMashHp;
}
