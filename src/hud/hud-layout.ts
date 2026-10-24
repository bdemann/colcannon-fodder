import {type Coords} from '@augment-vir/common';
import {gameWorldSize} from '../game-state/game-world.js';

/** A rectangle in world pixels (the HUD is laid out in the same 1920x1080 space as the world). */
export type HudRect = Readonly<{x: number; y: number; width: number; height: number}>;

/** Gap kept between a HUD panel and the screen edge. */
export const hudEdgeMarginPx = 24;

/** The tower toolbar is a fixed width so it can be centered and tested. */
const toolbarWidthPx = 1100;
const toolbarHeightPx = 134;

/**
 * Where every in-game HUD panel sits, in world pixels. The HUD elements position themselves from
 * these numbers and `hud-layout.test.ts` checks that none of them covers a belt, chute or
 * restaurant on any map, so change a panel here and the test tells you if it now blocks the play
 * area. Each rect is the panel's largest possible size.
 */
export const hudLayout = {
    /** Top-left: score, coins, satisfaction, prestige and wave. */
    stats: {
        x: hudEdgeMarginPx,
        y: 16,
        width: 500,
        height: 215,
    },
    /** Under the stats: "Leave room" while in a co-op room. */
    leaveRoom: {
        x: hudEdgeMarginPx,
        y: 240,
        width: 400,
        height: 60,
    },
    /** Top-center: pause and the two fast-forward buttons. */
    pauseButtons: {
        x: 928,
        y: 16,
        width: 432,
        height: 64,
    },
    /** Top-right: at most three order tickets plus a "+N more" line. */
    orders: {
        x: 1596,
        y: hudEdgeMarginPx,
        width: 300,
        height: 370,
    },
    /** Right edge, under the east belts: one small button per topping. */
    toppings: {
        x: 1622,
        y: 520,
        width: 274,
        height: 64,
    },
    /** Bottom-right: the selected tower's stats and buttons. */
    towerPanel: {
        x: 1576,
        y: 760,
        width: 320,
        height: 296,
    },
    /** Bottom-center: the hint line and the tower buttons. */
    toolbar: {
        x: (gameWorldSize.width - toolbarWidthPx) / 2,
        y: gameWorldSize.height - hudEdgeMarginPx - toolbarHeightPx,
        width: toolbarWidthPx,
        height: toolbarHeightPx,
    },
    /** Top-center strip under the pause buttons: wave, boss and serving popups share it. */
    noticeStrip: {
        x: 820,
        y: 96,
        width: 680,
        height: 64,
    },
    /** Order outcome popup, left of the order board. */
    orderPopup: {
        x: 1316,
        y: 150,
        width: 260,
        height: 100,
    },
    /** Muted icon and the co-op host's sim speed badge, left of the order board. */
    topBadges: {
        x: 1280,
        y: 16,
        width: 296,
        height: 130,
    },
} as const satisfies Record<string, HudRect>;

/** Every in-game HUD rect that must stay clear of the belts, chutes and restaurant. */
export const hudPlayfieldRects: ReadonlyArray<{name: string; rect: HudRect}> = Object.entries(
    hudLayout,
).map(
    ([
        name,
        rect,
    ]) => {
        return {
            name,
            rect,
        };
    },
);

/** True when the two rectangles share any area. */
export function rectsOverlap({
    first,
    second,
}: Readonly<{first: HudRect; second: HudRect}>): boolean {
    return (
        first.x < second.x + second.width &&
        second.x < first.x + first.width &&
        first.y < second.y + second.height &&
        second.y < first.y + first.height
    );
}

/** True when the segment comes within `radius` of the rectangle (so a belt of half-width `radius`). */
export function segmentTouchesRect({
    start,
    end,
    radius,
    rect,
}: Readonly<{
    start: Readonly<Coords>;
    end: Readonly<Coords>;
    radius: number;
    rect: HudRect;
}>): boolean {
    /** Walk the segment in small steps and check the exact distance to the rect (belts are short). */
    const steps = Math.ceil(Math.hypot(end.x - start.x, end.y - start.y) / 4);

    for (let step = 0; step <= steps; step++) {
        const t = steps ? step / steps : 0;
        const x = start.x + (end.x - start.x) * t;
        const y = start.y + (end.y - start.y) * t;
        const nearestX = Math.max(rect.x, Math.min(x, rect.x + rect.width));
        const nearestY = Math.max(rect.y, Math.min(y, rect.y + rect.height));

        if (Math.hypot(x - nearestX, y - nearestY) < radius) {
            return true;
        }
    }

    return false;
}
