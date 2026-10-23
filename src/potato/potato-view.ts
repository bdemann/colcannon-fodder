import {type Graphics} from '@antha/graphics-2d';
import {potatoConfig} from '../config/game-config.js';
import {type PotatoProcessing} from '../run/run-state.js';

const potatoColors = {
    raw: {
        fill: '#c8a165',
        stroke: '#7a5a30',
    },
    boiled: {
        fill: '#f3e3a1',
        stroke: '#c9a35a',
    },
    glue: {
        fill: '#d9c08a',
        stroke: '#a08850',
    },
    mashedCooked: {
        fill: '#fff0b8',
        stroke: '#d8c070',
    },
    perfect: {
        fill: '#fff4c2',
        stroke: '#d8c070',
    },
    butter: {
        fill: '#ffd84a',
        stroke: '#e0b000',
    },
    sliceLine: '#5a3d1e',
    steam: '#ffffff',
} as const;

/** Eye dot positions, relative to the potato's center. */
const eyePositions = [
    {
        x: -8,
        y: -5,
    },
    {
        x: 6,
        y: 4,
    },
    {
        x: 10,
        y: -7,
    },
] as const;

/**
 * Clears `graphics` and draws a potato centered on (0, 0). The look follows `processing`: raw,
 * boiled (pale, steaming), cut (slice lines), or a mashed blob (with butter when perfect).
 */
export function drawPotato(graphics: Graphics, processing: Readonly<PotatoProcessing>): Graphics {
    const radius = potatoConfig.radius;
    graphics.clear();

    if (processing.mashed) {
        const blob = processing.cooked
            ? processing.cut
                ? potatoColors.perfect
                : potatoColors.mashedCooked
            : potatoColors.glue;
        const circles = [
            {
                x: -radius * 0.45,
                y: 0,
            },
            {
                x: radius * 0.45,
                y: 0,
            },
            {
                x: 0,
                y: -radius * 0.35,
            },
        ];

        for (const circle of circles) {
            graphics.circle(circle.x, circle.y, radius * 0.8).fill({
                color: blob.fill,
            });
        }
        for (const circle of circles) {
            graphics.circle(circle.x, circle.y, radius * 0.8).stroke({
                color: blob.stroke,
                width: 2,
            });
        }

        if (processing.cut && processing.cooked) {
            graphics
                .rect(-6, -radius * 0.45 - 6, 12, 12)
                .fill({
                    color: potatoColors.butter.fill,
                })
                .stroke({
                    color: potatoColors.butter.stroke,
                    width: 2,
                });
        }

        return graphics;
    }

    const skin = processing.cooked ? potatoColors.boiled : potatoColors.raw;
    graphics
        .ellipse(0, 0, radius * 1.2, radius * 0.9)
        .fill({
            color: skin.fill,
        })
        .stroke({
            color: skin.stroke,
            width: 3,
        });

    if (processing.cooked) {
        graphics.circle(-6, -radius - 6, 4).fill({
            color: potatoColors.steam,
            alpha: 0.7,
        });
        graphics.circle(6, -radius - 12, 4).fill({
            color: potatoColors.steam,
            alpha: 0.7,
        });
    } else {
        for (const eye of eyePositions) {
            graphics.circle(eye.x, eye.y, 3).fill({
                color: potatoColors.raw.stroke,
            });
        }
    }

    if (processing.cut) {
        for (const x of [
            -radius * 0.4,
            radius * 0.4,
        ]) {
            graphics
                .moveTo(x, -radius * 0.9)
                .lineTo(x, radius * 0.9)
                .stroke({
                    color: potatoColors.sliceLine,
                    width: 3,
                });
        }
    }

    return graphics;
}
