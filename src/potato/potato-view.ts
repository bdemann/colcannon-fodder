import {type Graphics} from '@antha/graphics-2d';
import {type PotatoProcessing} from '../run/run-state.js';
import {getMashProgress} from './mash.js';

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
    meterBackground: 'rgba(0,0,0,0.6)',
    meterFill: '#7CFC00',
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

const meter = {
    width: 40,
    height: 7,
    /** Gap between the top of the potato and the bar. */
    gap: 14,
} as const;

/**
 * Clears `graphics` and draws a potato centered on (0, 0). The look follows the mash progress: a
 * whole potato (raw, boiled and steaming, or cut) below 50%, a mashed blob from 50%, and a blob
 * with butter when fully mashed. A meter bar floats above it while it is partly mashed. `radius` is
 * the potato's size (see `potatoSizeConfig`).
 */
export function drawPotato(
    graphics: Graphics,
    processing: Readonly<PotatoProcessing>,
    radius: number,
): Graphics {
    const progress = getMashProgress(processing);
    graphics.clear();

    if (progress > 0 && progress < 1) {
        graphics.rect(-meter.width / 2, -radius - meter.gap, meter.width, meter.height).fill({
            color: potatoColors.meterBackground,
        });
        graphics
            .rect(-meter.width / 2, -radius - meter.gap, meter.width * progress, meter.height)
            .fill({
                color: potatoColors.meterFill,
            });
    }

    if (progress >= 0.5) {
        const blob =
            progress >= 1
                ? potatoColors.perfect
                : processing.cooked
                  ? potatoColors.mashedCooked
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

        if (progress >= 1) {
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
