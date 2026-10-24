import {potatoSizeConfig} from '../../config/game-config.js';
import {swiperConfig} from '../../config/swiper-config.js';
import {getPath, getPositionAlongPath} from '../../level/level.js';
import {PotatoSize} from '../../potato/potato-size.js';
import {PotatoEntity} from '../../potato/potato.entity.js';
import {getTowerStats} from '../tower-type.js';
import {type TowerEntity} from '../tower.entity.js';

type Point = {x: number; y: number};

/** The arm's angle in radians: one full turn every `rotationMs`, starting when built. */
export function getSwiperAngle(params: {elapsedMs: number; builtAtMs: number}): number {
    return ((params.elapsedMs - params.builtAtMs) / swiperConfig.rotationMs) * Math.PI * 2;
}

/** Where the free end of the arm is. */
export function getArmTip({
    center,
    angle,
    lengthPx,
}: {
    center: Readonly<Point>;
    angle: number;
    lengthPx: number;
}): Point {
    return {
        x: center.x + lengthPx * Math.cos(angle),
        y: center.y + lengthPx * Math.sin(angle),
    };
}

/** Shortest distance from `point` to the segment `a`-`b`. */
export function distanceToSegment({
    point,
    a,
    b,
}: Readonly<{point: Readonly<Point>; a: Readonly<Point>; b: Readonly<Point>}>): number {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const lengthSquared = dx * dx + dy * dy;
    const t =
        lengthSquared === 0
            ? 0
            : Math.max(
                  0,
                  Math.min(1, ((point.x - a.x) * dx + (point.y - a.y) * dy) / lengthSquared),
              );
    return Math.hypot(point.x - (a.x + t * dx), point.y - (a.y + t * dy));
}

/**
 * Whether the arm should swipe this potato now: touching the arm and not swiped within the debounce
 * window.
 */
export function shouldSwipe({
    potato,
    potatoRadius,
    armStart,
    armEnd,
    lastSwipedAtMs,
    elapsedMs,
}: {
    potato: Readonly<Point>;
    potatoRadius: number;
    armStart: Readonly<Point>;
    armEnd: Readonly<Point>;
    lastSwipedAtMs: number;
    elapsedMs: number;
}): boolean {
    const touching =
        distanceToSegment({
            point: potato,
            a: armStart,
            b: armEnd,
        }) <=
        swiperConfig.armHalfWidthPx + potatoRadius;
    const recentlySwiped =
        lastSwipedAtMs >= 0 && elapsedMs - lastSwipedAtMs < swiperConfig.debounceMs;
    return touching && !recentlySwiped;
}

/** Swiper behavior: a slow rotating arm that knocks touched potatoes back up the belt. */
export function updateSwiper(tower: TowerEntity): void {
    const {elapsedMs} = tower.state.runState;
    const center = {
        x: tower.params.x,
        y: tower.params.y,
    };
    const armEnd = getArmTip({
        center,
        angle: getSwiperAngle({
            elapsedMs,
            builtAtMs: tower.params.builtAtMs,
        }),
        lengthPx: getTowerStats(tower.params.towerType, tower.params.level).rangePx,
    });

    for (const potato of tower.state.entityStore.getEntities(PotatoEntity)) {
        const {params} = potato;
        if (params.served || params.carriedBySeagull || params.size === PotatoSize.King) {
            continue;
        }
        if (
            !shouldSwipe({
                potato: params,
                potatoRadius: potatoSizeConfig[params.size].radius,
                armStart: center,
                armEnd,
                lastSwipedAtMs: params.lastSwipedAtMs,
                elapsedMs,
            })
        ) {
            continue;
        }
        params.distancePx = Math.max(0, params.distancePx - swiperConfig.pushBackPx);
        const position = getPositionAlongPath(
            getPath(tower.state.level, params.pathId),
            params.distancePx,
        );
        params.x = position.x;
        params.y = position.y;
        params.lastSwipedAtMs = elapsedMs;
        tower.params.lastProcessedAtMs = elapsedMs;
    }
}
