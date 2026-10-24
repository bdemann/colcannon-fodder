import {comboDisplayConfig} from '../../config/game-config.js';
import {qualityConfig} from '../../config/quality-config.js';
import {PotatoEntity} from '../../potato/potato.entity.js';
import {getDamageScale, getTowerStats} from '../tower-type.js';
import {type TowerEntity} from '../tower.entity.js';
import {addWear, getWearMultiplier, getWearPerSecond} from '../wear.js';

/**
 * Whether `point` is inside a cone that starts at `origin`, points at `aimAt`, reaches `lengthPx`
 * and spreads `halfAngleDeg` to each side. A point at the origin counts as inside.
 */
export function isInCone({
    origin,
    aimAt,
    point,
    lengthPx,
    halfAngleDeg,
}: Readonly<{
    origin: Readonly<{x: number; y: number}>;
    aimAt: Readonly<{x: number; y: number}>;
    point: Readonly<{x: number; y: number}>;
    lengthPx: number;
    halfAngleDeg: number;
}>): boolean {
    const dx = point.x - origin.x;
    const dy = point.y - origin.y;
    const distance = Math.hypot(dx, dy);
    if (distance > lengthPx) {
        return false;
    } else if (distance === 0) {
        return true;
    }
    const aimAngle = Math.atan2(aimAt.y - origin.y, aimAt.x - origin.x);
    let diff = Math.atan2(dy, dx) - aimAngle;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));

    return Math.abs(diff) <= (halfAngleDeg * Math.PI) / 180 + 1e-9;
}

/**
 * Microwave behavior: aims at the furthest-along potato still to mash in range, then every potato
 * in the cone takes plain mash damage and loses quality for as long as it stays there.
 */
export function updateMicrowave(tower: TowerEntity, msSinceLastExecute: number): void {
    const {rangePx} = getTowerStats(tower.params.towerType, tower.params.level);
    const damageScale = getDamageScale(tower.params.level) * getWearMultiplier(tower.params.wear);
    const origin = {
        x: tower.params.x,
        y: tower.params.y,
    };
    const potatoes = [...tower.state.entityStore.getEntities(PotatoEntity)].filter(
        (potato) => !potato.params.served && !potato.params.carriedBySeagull,
    );

    let target: PotatoEntity | undefined;
    for (const potato of potatoes) {
        if (
            potato.params.mashHp > 0 &&
            Math.hypot(potato.params.x - origin.x, potato.params.y - origin.y) <= rangePx &&
            (!target || potato.params.distancePx > target.params.distancePx)
        ) {
            target = potato;
        }
    }
    if (!target) {
        return;
    }

    const aimAt = {
        x: target.params.x,
        y: target.params.y,
    };
    const seconds = msSinceLastExecute / 1000;
    tower.params.wear = addWear({
        wear: tower.params.wear,
        amount: getWearPerSecond(tower.params.towerType) * seconds,
    });
    for (const potato of potatoes) {
        if (
            !isInCone({
                origin,
                aimAt,
                point: potato.params,
                lengthPx: rangePx,
                halfAngleDeg: qualityConfig.microwaveConeHalfAngleDeg,
            })
        ) {
            continue;
        }
        potato.recordHit({
            towerType: tower.params.towerType,
            tower: tower.params,
            minIntervalMs: comboDisplayConfig.continuousHitIntervalMs,
        });
        potato.params.mashHp = Math.max(
            0,
            potato.params.mashHp - qualityConfig.microwaveDamagePerSecond * damageScale * seconds,
        );
        potato.params.quality = Math.max(
            0,
            potato.params.quality - qualityConfig.microwaveQualityPerSecond * seconds,
        );
    }

    tower.params.lastTargetX = aimAt.x;
    tower.params.lastTargetY = aimAt.y;
    tower.params.lastProcessedAtMs = tower.state.runState.elapsedMs;
}
