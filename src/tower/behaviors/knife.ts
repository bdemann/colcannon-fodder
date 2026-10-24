import {potatoSizeConfig} from '../../config/game-config.js';
import {knifeConfig} from '../../config/knife-config.js';
import {applyTowerHit} from '../../potato/mash.js';
import {PotatoEntity} from '../../potato/potato.entity.js';
import {SeagullEntity} from '../../seagull/seagull.entity.js';
import {getTowerStats} from '../tower-type.js';
import {type TowerEntity} from '../tower.entity.js';
import {distanceToSegment} from './swiper.js';

type Point = {x: number; y: number};

/** The slice: from `origin` through `aimAt`, extended to exactly `lengthPx`. */
export function getSliceSegment({
    origin,
    aimAt,
    lengthPx,
}: Readonly<{
    origin: Readonly<Point>;
    aimAt: Readonly<Point>;
    lengthPx: number;
}>): {start: Point; end: Point} {
    const dx = aimAt.x - origin.x;
    const dy = aimAt.y - origin.y;
    const distance = Math.hypot(dx, dy);
    /** Aiming at the origin itself has no direction, so slice to the right. */
    const ux = distance === 0 ? 1 : dx / distance;
    const uy = distance === 0 ? 0 : dy / distance;

    return {
        start: {
            x: origin.x,
            y: origin.y,
        },
        end: {
            x: origin.x + ux * lengthPx,
            y: origin.y + uy * lengthPx,
        },
    };
}

/** Whether a circle at `point` with `radius` touches the slice. */
export function isOnSlice({
    point,
    radius,
    segment,
}: Readonly<{
    point: Readonly<Point>;
    radius: number;
    segment: Readonly<{start: Point; end: Point}>;
}>): boolean {
    return (
        distanceToSegment({
            point,
            a: segment.start,
            b: segment.end,
        }) <=
        knifeConfig.lineHalfWidthPx + radius
    );
}

/**
 * Knife behavior: when ready, aims at the furthest-along potato still to mash in range and slices a
 * straight line through it. Every potato and seagull on the line takes a hit.
 */
export function updateKnife(tower: TowerEntity, msSinceLastExecute: number): void {
    tower.params.cooldownRemainingMs = Math.max(
        0,
        tower.params.cooldownRemainingMs - msSinceLastExecute,
    );
    if (tower.params.cooldownRemainingMs > 0) {
        return;
    }

    const stats = getTowerStats(tower.params.towerType, tower.params.level);
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
            Math.hypot(potato.params.x - origin.x, potato.params.y - origin.y) <= stats.rangePx &&
            (!target || potato.params.distancePx > target.params.distancePx)
        ) {
            target = potato;
        }
    }
    if (!target) {
        return;
    }

    const segment = getSliceSegment({
        origin,
        aimAt: target.params,
        lengthPx: stats.rangePx,
    });
    for (const potato of potatoes) {
        if (
            !isOnSlice({
                point: potato.params,
                radius: potatoSizeConfig[potato.params.size].radius,
                segment,
            })
        ) {
            continue;
        }
        const processing = potato.getProcessing();
        applyTowerHit(processing, tower.params.towerType, tower.params.level);
        potato.params.cut = processing.cut;
        potato.params.cooked = processing.cooked;
        potato.params.mashHp = processing.mashHp;
    }
    for (const gull of tower.state.entityStore.getEntities(SeagullEntity)) {
        if (
            gull.params.hp > 0 &&
            !gull.params.fed &&
            isOnSlice({
                point: gull.params,
                radius: 0,
                segment,
            })
        ) {
            gull.takeHit(stats.damage);
        }
    }

    tower.params.cooldownRemainingMs = stats.cooldownMs;
    tower.params.lastProcessedAtMs = tower.state.runState.elapsedMs;
    tower.params.lastTargetX = segment.end.x;
    tower.params.lastTargetY = segment.end.y;
}
