/* eslint-disable @virmator/prefer-params-object -- small positional drawing helpers, like tower-art */
import {type Graphics} from '@antha/graphics-2d';
import {cozyPalette, drawCozyLine, drawCozyShape, ellipsePath, roundRectPath} from '../art/cozy.js';
import {projectileConfig} from '../config/game-config.js';
import {drawCricket} from '../tower/tower-art.js';
import {ProjectileKind} from './projectile-kind.js';

const tau = Math.PI * 2;

/** Runs `draw` under a temporary translate, rotate and scale. */
function scope(
    g: Graphics,
    transform: Readonly<{
        x: number;
        y: number;
        rotation?: number;
        scaleX?: number;
        scaleY?: number;
    }>,
    draw: () => void,
) {
    g.save();
    // Pixi applies each call after the previous ones (it scales and rotates the translation too),
    // so go from the inside out: scale, then rotate, then move into place.
    g.scaleTransform(transform.scaleX ?? 1, transform.scaleY ?? 1);
    g.rotateTransform(transform.rotation ?? 0);
    g.translateTransform(transform.x, transform.y);
    draw();
    g.restore();
}

function rect(
    g: Graphics,
    fill: string,
    box: Readonly<{x: number; y: number; width: number; height: number; radius: number}>,
    outlineScale = 0.7,
) {
    drawCozyShape(g, {
        path: roundRectPath(box),
        fill,
        outlineScale,
    });
}

/** A potato masher lying along x: wooden handle and a flat head with holes. */
function drawMasher(g: Graphics) {
    rect(g, cozyPalette.caramel, {
        x: -4,
        y: -3,
        width: 26,
        height: 6,
        radius: 3,
    });
    rect(g, cozyPalette.stone, {
        x: -14,
        y: -9,
        width: 10,
        height: 18,
        radius: 3,
    });
    for (const y of [
        -4,
        4,
    ]) {
        drawCozyShape(g, {
            path: ellipsePath({
                x: -9,
                y,
                rx: 1.6,
                ry: 1.6,
            }),
            fill: cozyPalette.slate,
            outline: false,
            highlight: false,
        });
    }
}

/** A meat hammer lying along x: a wooden handle and a heavy iron head. */
function drawHammer(g: Graphics) {
    rect(g, cozyPalette.caramel, {
        x: -6,
        y: -3,
        width: 30,
        height: 6,
        radius: 3,
    });
    rect(
        g,
        cozyPalette.slate,
        {
            x: -16,
            y: -10,
            width: 14,
            height: 20,
            radius: 3,
        },
        0.8,
    );
    // The studded striking face.
    for (const y of [
        -6,
        0,
        6,
    ]) {
        drawCozyShape(g, {
            path: ellipsePath({
                x: -14,
                y,
                rx: 1.4,
                ry: 1.4,
            }),
            fill: cozyPalette.stone,
            outline: false,
            highlight: false,
        });
    }
}

/** A blob of boiling water. */
function drawWater(g: Graphics, timeSec: number) {
    const wobble = 1 + Math.sin(timeSec * 40) * 0.08;
    drawCozyShape(g, {
        path: ellipsePath({
            x: 0,
            y: 0,
            rx: 8 * wobble,
            ry: 8 / wobble,
        }),
        fill: cozyPalette.sky,
        outlineScale: 0.7,
    });
    drawCozyShape(g, {
        path: ellipsePath({
            x: 11,
            y: -2,
            rx: 3,
            ry: 2.4,
        }),
        fill: cozyPalette.sky,
        outlineScale: 0.5,
    });
}

/** Draws one projectile mid-flight, at its current position, onto `g` (not cleared). */
export function drawProjectile(
    g: Graphics,
    {
        kind,
        x,
        y,
        progress,
        directionX,
        timeSec,
    }: Readonly<{
        kind: ProjectileKind;
        x: number;
        y: number;
        progress: number;
        /** Which way it is thrown, so thrown things face forward. */
        directionX: number;
        timeSec: number;
    }>,
) {
    const scale = projectileConfig.scale;
    const facing = directionX < 0 ? -1 : 1;
    if (kind === ProjectileKind.Cricket) {
        const f = (progress * 3) % 1;
        scope(
            g,
            {
                x,
                y,
                scaleX: facing * scale,
                scaleY: scale,
            },
            () => {
                drawCricket(g, {
                    timeSec,
                    squash: 1 - 0.15 * Math.sin(f * Math.PI),
                    tilt: -Math.cos(f * Math.PI) * 0.5,
                });
            },
        );
    } else if (kind === ProjectileKind.Water) {
        scope(
            g,
            {
                x,
                y,
                scaleX: scale,
                scaleY: scale,
            },
            () => drawWater(g, timeSec),
        );
    } else {
        scope(
            g,
            {
                x,
                y,
                rotation: progress * projectileConfig.spinTurns * tau,
                scaleX: scale,
                scaleY: scale,
            },
            () => (kind === ProjectileKind.Hammer ? drawHammer(g) : drawMasher(g)),
        );
    }
}

/** A tiny impact puff that grows and fades. */
export function drawPuff(
    g: Graphics,
    {
        kind,
        x,
        y,
        progress,
    }: Readonly<{kind: ProjectileKind; x: number; y: number; progress: number}>,
) {
    const color = kind === ProjectileKind.Water ? cozyPalette.sky : cozyPalette.cream;
    const radius = 6 + progress * 12;
    drawCozyLine(g, {
        path(graphics) {
            graphics.circle(x, y, radius);
        },
        color,
        width: 3 * (1 - progress) + 1,
        alpha: 0.9 * (1 - progress),
    });
    for (const side of [
        -1,
        1,
    ]) {
        drawCozyShape(g, {
            path: ellipsePath({
                x: x + side * radius * 0.9,
                y: y - progress * 6,
                rx: 2.2 * (1 - progress),
                ry: 2.2 * (1 - progress),
            }),
            fill: color,
            outline: false,
            highlight: false,
            alpha: 1 - progress,
        });
    }
}
