/**
 * The "Cozy Farmhouse" art style: a warm, storybook farm kitchen. Ported from the art lab
 * (`docs/art-lab/index.html`, "Cozy Farmhouse" tab). Every piece of game art should take its colors
 * from `cozyPalette` and draw its shapes with `drawCozyShape` so everything shares one look.
 *
 * Typical use inside an entity's `createView()`:
 *
 * ```ts
 * const view = new Container();
 * addSoftShadow(view, {width: 80, height: 24, offsetY: 30});
 * const body = new Graphics();
 * drawCozyShape(body, {path: ellipsePath(0, 0, 40, 30), fill: cozyPalette.toffee});
 * view.addChild(body);
 * ```
 */
import {FillGradient, Graphics, type Container} from 'pixi.js';

/** The lab's 20 named colors. Bark is the outline color. */
export const cozyPalette = {
    bark: '#2b1a12',
    walnut: '#4d2f1f',
    oak: '#7a4a2b',
    caramel: '#a8693a',
    toffee: '#cf9456',
    sand: '#ecc88a',
    wheat: '#f2dca6',
    cream: '#fff3da',
    moss: '#5d6b2a',
    grass: '#7f9040',
    meadow: '#a3b254',
    tomato: '#b8472f',
    pumpkin: '#e07b3f',
    butter: '#efc04a',
    sage: '#8f9f98',
    pond: '#5f7b7a',
    stone: '#cfc6b0',
    slate: '#6e655b',
    pine: '#3f5a52',
    sky: '#7fa6b0',
} as const;

/** Extra shades the lab uses that are not among the 20 swatches. */
export const cozyShades = {
    /** The lighter Stone shade for moving belt stripes. */
    beltStripe: '#e6dfcb',
    /** Darker grass for tufts. */
    grassDark: '#6f8035',
} as const;

/** The lab's style values. Shadows are Bark colored. */
export const cozyStyle = {
    /** Visible outline thickness in px (the lab strokes at twice this and covers the inside). */
    outlineWidth: 2.6,
    shadow: {
        blur: 7,
        offsetY: 4,
        alpha: 0.4,
    },
    /** White top-left highlight strength, 0 to 1. */
    highlight: 0.26,
    /** Warm bottom shading strength, 0 to 1. */
    shade: 0.2,
    /** Strength of small white shine dabs. */
    shine: 0.4,
    /** How much things squash when they bob. 0.07 is 7%. */
    squash: 0.07,
    /** How high a hop is, as a fraction of the object's size. */
    hop: 0.1,
    /** Wobble rotation amplitude in radians. */
    wobble: 0.07,
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontWeight: 'bold',
} as const;

/** A function that adds a shape to a Graphics' current path (no fill or stroke). */
export type CozyPath = (graphics: Graphics) => void;

/** Ellipse path. Use `rx === ry` for a circle. */
export function ellipsePath({
    x,
    y,
    rx,
    ry,
}: Readonly<{x: number; y: number; rx: number; ry: number}>): CozyPath {
    return (graphics) => {
        graphics.ellipse(x, y, rx, ry);
    };
}

/** Rounded rectangle path, top-left corner at x, y. */
export function roundRectPath({
    x,
    y,
    width,
    height,
    radius,
}: Readonly<{x: number; y: number; width: number; height: number; radius: number}>): CozyPath {
    return (graphics) => {
        graphics.roundRect(x, y, width, height, radius);
    };
}

/** Closed polygon path from [x, y] pairs. */
export function polyPath(
    points: ReadonlyArray<
        readonly [
            number,
            number,
        ]
    >,
): CozyPath {
    return (graphics) => {
        graphics.poly(
            points.flatMap(
                ([
                    x,
                    y,
                ]) => {
                    return [
                        x,
                        y,
                    ];
                },
            ),
        );
    };
}

/**
 * Highlight gradient shared by every shape: white top-left to a warm shade at the bottom, in the
 * shape's local 0..1 box.
 */
const highlightGradient = new FillGradient({
    type: 'linear',
    start: {
        x: 0,
        y: 0,
    },
    end: {
        x: 0.7,
        y: 1,
    },
    textureSpace: 'local',
    colorStops: [
        {
            offset: 0,
            color: `rgba(255,255,255,${cozyStyle.highlight})`,
        },
        {
            offset: 0.45,
            color: 'rgba(255,255,255,0)',
        },
        {
            offset: 1,
            color: `rgba(60,30,10,${cozyStyle.shade})`,
        },
    ],
});

/** Options for `drawCozyShape`. */
export type CozyShapeOptions = {
    /** Adds the shape to the graphics' path. See `ellipsePath` and friends, or write your own. */
    path: CozyPath;
    fill: string;
    /** Draw the Bark outline. Defaults to true. */
    outline?: boolean;
    /** Multiplier on the outline width, for small details (the lab uses 0.5 to 0.9). */
    outlineScale?: number;
    /** Draw the top-left highlight and bottom shade over the fill. Defaults to true. */
    highlight?: boolean;
    /** Overall alpha. Defaults to 1. */
    alpha?: number;
};

/**
 * Draws one cozy shape onto `graphics` (the lab's `P`): a Bark outline, the fill, and a soft
 * highlight. Does not clear the graphics, so call it repeatedly to layer shapes (later on top). Use
 * `outline: false, highlight: false` for flat translucent overlays.
 */
export function drawCozyShape(graphics: Graphics, options: Readonly<CozyShapeOptions>): Graphics {
    const {path, fill, outline = true, highlight = true, alpha = 1, outlineScale = 1} = options;

    if (outline) {
        // The lab strokes at 2x width and then fills over the inside, leaving `outlineWidth` visible.
        path(graphics);
        graphics.stroke({
            color: cozyPalette.bark,
            width: 2 * cozyStyle.outlineWidth * outlineScale,
            alpha,
            join: 'round',
            cap: 'round',
        });
    }

    path(graphics);
    graphics.fill({
        color: fill,
        alpha,
    });

    if (highlight) {
        path(graphics);
        graphics.fill({
            fill: highlightGradient,
            alpha,
        });
    }

    return graphics;
}

/** Options for `drawCozyLine`. */
export type CozyLineOptions = {
    path: CozyPath;
    color: string;
    width: number;
    /** Add a Bark halo around the line. */
    outline?: boolean;
    alpha?: number;
};

/** Draws a stroked line or curve with an optional Bark halo (the lab's `L`). */
export function drawCozyLine(graphics: Graphics, options: Readonly<CozyLineOptions>): Graphics {
    const {path, color, width, outline = false, alpha = 1} = options;

    if (outline) {
        path(graphics);
        graphics.stroke({
            color: cozyPalette.bark,
            width: width + 2 * cozyStyle.outlineWidth * 0.6,
            alpha,
            join: 'round',
            cap: 'round',
        });
    }

    path(graphics);
    graphics.stroke({
        color,
        width,
        alpha,
        join: 'round',
        cap: 'round',
    });

    return graphics;
}

/** Options for `addSoftShadow`. */
export type SoftShadowOptions = {
    /** Full width of the shadow ellipse. */
    width: number;
    /** Full height of the shadow ellipse. */
    height: number;
    /** How far below the container's origin the shadow is centered. */
    offsetY: number;
    /** Horizontal offset. Defaults to 0. */
    offsetX?: number;
};

/** How many stacked ellipses fake the blur. */
const shadowLayers = 5;

/**
 * Adds a soft ground shadow behind everything already in `container`. The blur is faked with a few
 * stacked low-alpha ellipses instead of a `BlurFilter`, because filters cost an extra render pass
 * per object and there will be dozens of potatoes. Returns the shadow Graphics.
 */
export function addSoftShadow(
    container: Container,
    options: Readonly<SoftShadowOptions>,
): Graphics {
    const {width, height, offsetY, offsetX = 0} = options;
    const shadow = new Graphics();
    const layerAlpha = cozyStyle.shadow.alpha / shadowLayers;

    for (let layer = 0; layer < shadowLayers; layer++) {
        // The first layer is the biggest and each one shrinks, so the middle is the darkest.
        const scale = 1.1 - (layer / shadowLayers) * 0.6;

        shadow.ellipse(offsetX, offsetY, (width / 2) * scale, (height / 2) * scale).fill({
            color: cozyPalette.bark,
            alpha: layerAlpha,
        });
    }

    container.addChildAt(shadow, 0);

    return shadow;
}

/**
 * A gentle sway for transform animation, in radians (amplitude `cozyStyle.wobble`). Pass the same
 * `seed` for the same object every frame so each object wobbles out of step with the others. Pure:
 * same inputs, same output.
 */
// The issue specifies this positional signature; the follow-up art code relies on it.
// eslint-disable-next-line @virmator/prefer-params-object
export function wobble(timeMs: number, seed: number): number {
    const seconds = timeMs / 1000;
    const wave =
        0.6 * Math.sin(seconds * 2.2 + seed * 1.7) + 0.4 * Math.sin(seconds * 3.7 + seed * 2.9);

    return wave * cozyStyle.wobble;
}

/**
 * Squash and stretch for one bob cycle. `t` is the cycle phase (0 to 1, wraps). Returns scale
 * factors for x and y that keep the area constant: the object is at rest (1, 1) at t = 0 and 1, and
 * squashed by `cozyStyle.squash` at t = 0.5.
 */
export function squash(t: number): {scaleX: number; scaleY: number} {
    const wrapped = t - Math.floor(t);
    const scaleY = 1 - cozyStyle.squash * Math.sin(wrapped * Math.PI);

    return {
        scaleX: 1 / scaleY,
        scaleY,
    };
}
