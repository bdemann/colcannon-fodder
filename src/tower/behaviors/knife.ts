import {potatoSizeConfig} from '../../config/game-config.js';
import {knifeConfig} from '../../config/knife-config.js';
import {applyTowerHit} from '../../potato/mash.js';
import {PotatoEntity} from '../../potato/potato.entity.js';
import {SeagullEntity} from '../../seagull/seagull.entity.js';
import {getTowerStats} from '../tower-type.js';
import {type TowerEntity} from '../tower.entity.js';
import {addWear, getWearPerUse} from '../wear.js';
import {distanceToSegment} from './swiper.js';

type Point = {x: number; y: number};

/**
 * The fixed cut line: from `origin` out `lengthPx` in the direction `angleDeg` (0 is right,
 * clockwise).
 */
export function getKnifeLine({
    origin,
    angleDeg,
    lengthPx,
}: Readonly<{
    origin: Readonly<Point>;
    angleDeg: number;
    lengthPx: number;
}>): {start: Point; end: Point} {
    const radians = (angleDeg * Math.PI) / 180;

    return {
        start: {
            x: origin.x,
            y: origin.y,
        },
        end: {
            x: origin.x + Math.cos(radians) * lengthPx,
            y: origin.y + Math.sin(radians) * lengthPx,
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
 * Knife behavior: every cooldown it chops its fixed line (set by `angleDeg` when built). Every
 * potato and seagull on the line takes a hit. It never aims.
 */
export function updateKnife(tower: TowerEntity, msSinceLastExecute: number): void {
    tower.params.cooldownRemainingMs = Math.max(
        0,
        tower.params.cooldownRemainingMs - msSinceLastExecute,
    );
    if (tower.params.cooldownRemainingMs > 0) {
        return;
    }

    const stats = getTowerStats(tower.params.towerType, tower.params.level, tower.params.wear);
    const segment = getKnifeLine({
        origin: {
            x: tower.params.x,
            y: tower.params.y,
        },
        angleDeg: tower.params.angleDeg,
        lengthPx: stats.rangePx,
    });
    const potatoes = [...tower.state.entityStore.getEntities(PotatoEntity)].filter(
        (potato) => !potato.params.served && !potato.params.carriedBySeagull,
    );
    let hitSomething = false;
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
        hitSomething = true;
        potato.recordHit({
            towerType: tower.params.towerType,
            tower: tower.params,
        });
        const processing = potato.getProcessing();
        applyTowerHit(processing, tower.params.towerType, tower.params);
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
            hitSomething = true;
            gull.takeHit(stats.damage);
        }
    }

    tower.params.cooldownRemainingMs = stats.cooldownMs;
    if (!hitSomething) {
        return;
    }
    tower.params.wear = addWear({
        wear: tower.params.wear,
        amount: getWearPerUse(tower.params.towerType),
    });
    tower.params.lastProcessedAtMs = tower.state.runState.elapsedMs;
    tower.params.lastTargetX = segment.end.x;
    tower.params.lastTargetY = segment.end.y;
}
