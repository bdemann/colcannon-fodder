import {type Graphics} from '@antha/graphics-2d';
import {qualityConfig} from '../config/quality-config.js';
import {Topping, toppingDefinitions, type PotatoToppings} from '../order/topping.js';
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
    highlight: '#ffffff',
    butterStroke: '#e0b000',
    scallionLine: toppingDefinitions[Topping.Scallions].color,
    cabbageLeaf: toppingDefinitions[Topping.Cabbage].color,
    gravyPool: toppingDefinitions[Topping.Gravy].color,
    sliceLine: '#5a3d1e',
    steam: '#ffffff',
    rubbery: '#9e9e9e',
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
 * with a shine when fully mashed. Hand-applied `toppings` are drawn on top at any stage. A meter
 * bar floats above it while it is partly mashed. Quality below 100 greys the potato over (rubbery).
 * `radius` is the potato's size (see `potatoSizeConfig`).
 */
export function drawPotato({
    graphics,
    processing,
    radius,
    toppings,
    quality = 100,
}: Readonly<{
    graphics: Graphics;
    processing: Readonly<PotatoProcessing>;
    radius: number;
    toppings: Readonly<PotatoToppings>;
    /** 0 to 100. */
    quality?: number;
}>): Graphics {
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
            graphics.ellipse(-radius * 0.25, -radius * 0.3, radius * 0.35, radius * 0.2).fill({
                color: potatoColors.highlight,
                alpha: 0.7,
            });
        }

        drawRubbery({
            graphics,
            radius,
            quality,
            blob: true,
        });
        drawToppings(graphics, radius, toppings);

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

    drawRubbery({
        graphics,
        radius,
        quality,
        blob: false,
    });
    drawToppings(graphics, radius, toppings);

    return graphics;
}

/** Draws the hand-applied toppings on the potato. Gravy goes first so the rest sit on top. */
function drawToppings(graphics: Graphics, radius: number, toppings: Readonly<PotatoToppings>) {
    if (toppings[Topping.Gravy]) {
        graphics.ellipse(0, -radius * 0.1, radius * 0.7, radius * 0.35).fill({
            color: potatoColors.gravyPool,
            alpha: 0.9,
        });
    }
    if (toppings[Topping.Butter]) {
        graphics
            .rect(-6, -radius * 0.45 - 6, 12, 12)
            .fill({
                color: toppingDefinitions[Topping.Butter].color,
            })
            .stroke({
                color: potatoColors.butterStroke,
                width: 2,
            });
    }
    if (toppings[Topping.Scallions]) {
        for (const angle of [
            -0.6,
            0,
            0.6,
        ]) {
            const startX = Math.sin(angle) * radius * 0.5;
            const startY = -radius * 0.6 + (1 - Math.cos(angle)) * radius * 0.3;
            graphics
                .moveTo(startX, startY)
                .lineTo(startX + Math.sin(angle) * 10, startY - Math.cos(angle) * 10)
                .stroke({
                    color: potatoColors.scallionLine,
                    width: 4,
                });
        }
    }
    if (toppings[Topping.Cabbage]) {
        for (const leaf of [
            {
                x: -radius * 0.4,
                y: radius * 0.1,
            },
            {
                x: radius * 0.35,
                y: radius * 0.2,
            },
        ]) {
            graphics.ellipse(leaf.x, leaf.y, 10, 6).fill({
                color: potatoColors.cabbageLeaf,
            });
        }
    }
}

/** Quality rounded to steps, so the potato only redraws when the grey changes visibly. */
export function getRubberyStep(quality: number): number {
    return Math.round(quality / qualityConfig.rubberyStep) * qualityConfig.rubberyStep;
}

/** Greys the potato shape over when quality is below 100. */
function drawRubbery({
    graphics,
    radius,
    quality,
    blob,
}: Readonly<{graphics: Graphics; radius: number; quality: number; blob: boolean}>) {
    const alpha = (1 - getRubberyStep(quality) / 100) * qualityConfig.rubberyMaxAlpha;
    if (alpha <= 0) {
        return;
    }
    if (blob) {
        for (const x of [
            -radius * 0.45,
            radius * 0.45,
        ]) {
            graphics.circle(x, 0, radius * 0.8).fill({
                color: potatoColors.rubbery,
                alpha,
            });
        }
        graphics.circle(0, -radius * 0.35, radius * 0.8).fill({
            color: potatoColors.rubbery,
            alpha,
        });
    } else {
        graphics.ellipse(0, 0, radius * 1.2, radius * 0.9).fill({
            color: potatoColors.rubbery,
            alpha,
        });
    }
}
