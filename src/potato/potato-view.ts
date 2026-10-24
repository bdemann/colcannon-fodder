import {type Graphics} from '@antha/graphics-2d';
import {
    cozyPalette,
    cozyStyle,
    drawCozyLine,
    drawCozyShape,
    ellipsePath,
    polyPath,
    roundRectPath,
    type CozyPath,
} from '../art/cozy.js';
import {comboDisplayConfig} from '../config/game-config.js';
import {qualityConfig} from '../config/quality-config.js';
import {Topping, type PotatoToppings} from '../order/topping.js';
import {type PotatoProcessing} from '../run/run-state.js';
import {getMashProgress} from './mash.js';
import {PotatoVariety} from './potato-variety.js';

export const defaultMeter = {
    width: 40,
    height: 7,
} as const;

/** Gap between the top of the potato and the mash meter. */
const meterGapPx = 14;

/** Options for flat details with no outline or highlight. */
const flat = {
    outline: false,
    highlight: false,
} as const;

type Point = readonly [
    number,
    number,
];

/** A wobbly outline: an ellipse with `bumps` gentle lumps, phase-shifted by `seed`. */
function blobPath({
    rx,
    ry,
    lumpiness,
    bumps,
    seed,
}: Readonly<{rx: number; ry: number; lumpiness: number; bumps: number; seed: number}>): CozyPath {
    const points: Point[] = [];
    const steps = 40;
    for (let step = 0; step < steps; step++) {
        const angle = (step / steps) * Math.PI * 2;
        const scale = 1 + lumpiness * Math.sin(bumps * angle + seed);
        points.push([
            Math.cos(angle) * rx * scale,
            Math.sin(angle) * ry * scale,
        ]);
    }

    return polyPath(points);
}

/** Rotates points by `rotation`, then moves them to (x, y). */
function placePoints({
    points,
    x,
    y,
    rotation = 0,
}: Readonly<{points: ReadonlyArray<Point>; x: number; y: number; rotation?: number}>): Point[] {
    return points.map(
        ([
            px,
            py,
        ]) => {
            return [
                x + px * Math.cos(rotation) - py * Math.sin(rotation),
                y + px * Math.sin(rotation) + py * Math.cos(rotation),
            ];
        },
    );
}

/** A rotated ellipse as a polygon (Pixi ellipses cannot rotate). */
function tiltedEllipsePath({
    x,
    y,
    rx,
    ry,
    rotation,
}: Readonly<{x: number; y: number; rx: number; ry: number; rotation: number}>): CozyPath {
    const points: Point[] = [];
    const steps = 20;
    for (let step = 0; step < steps; step++) {
        const angle = (step / steps) * Math.PI * 2;
        points.push([
            Math.cos(angle) * rx,
            Math.sin(angle) * ry,
        ]);
    }

    return polyPath(
        placePoints({
            points,
            x,
            y,
            rotation,
        }),
    );
}

/** A straight line path through points. */
function linePath(points: ReadonlyArray<Point>): CozyPath {
    return (graphics) => {
        points.forEach(
            (
                [
                    x,
                    y,
                ],
                index,
            ) => {
                if (index === 0) {
                    graphics.moveTo(x, y);
                } else {
                    graphics.lineTo(x, y);
                }
            },
        );
    };
}

/** A small arc (smile or happy eye). Starts the sub-path at the arc's start. */
function arcPath({
    x,
    y,
    radius,
    from,
    to,
}: Readonly<{x: number; y: number; radius: number; from: number; to: number}>): CozyPath {
    return (graphics) => {
        graphics.moveTo(x + Math.cos(from) * radius, y + Math.sin(from) * radius);
        graphics.arc(x, y, radius, from, to);
    };
}

/** A plain circle path (several in one path make a union blob). */
function circlesPath(
    circles: ReadonlyArray<
        readonly [
            number,
            number,
            number,
        ]
    >,
): CozyPath {
    return (graphics) => {
        for (const [
            x,
            y,
            radius,
        ] of circles) {
            graphics.circle(x, y, radius);
        }
    };
}

/** The overlapping lumps of a mashed potato. */
function mashBlobPath(radius: number): CozyPath {
    return circlesPath([
        [
            -0.45 * radius,
            0,
            0.8 * radius,
        ],
        [
            0.45 * radius,
            0,
            0.8 * radius,
        ],
        [
            0,
            -0.35 * radius,
            0.8 * radius,
        ],
        [
            0,
            0.3 * radius,
            0.7 * radius,
        ],
    ]);
}

/** A small round dot. */
function dotPath({x, y, radius}: Readonly<{x: number; y: number; radius: number}>): CozyPath {
    return ellipsePath({
        x,
        y,
        rx: radius,
        ry: radius,
    });
}

/** A white glossy dab. */
function drawShine({
    graphics,
    x,
    y,
    rx,
    ry,
    rotation = -0.5,
    strength = 1,
}: Readonly<{
    graphics: Graphics;
    x: number;
    y: number;
    rx: number;
    ry: number;
    rotation?: number;
    strength?: number;
}>) {
    drawCozyShape(graphics, {
        path: tiltedEllipsePath({
            x,
            y,
            rx,
            ry,
            rotation,
        }),
        fill: '#ffffff',
        alpha: cozyStyle.shine * strength,
        ...flat,
    });
}

/**
 * Clears `graphics` and draws a potato centered on (0, 0) in the Cozy Farmhouse style. The look
 * follows the mash progress: a whole potato (raw with eyes and freckles, boiled and steaming, or
 * sliced) below 50%, a half-mashed blob from 50%, and a creamy blob with a shine when fully mashed.
 * Hand-applied `toppings` are drawn on top at any stage. A meter bar floats above it while it is
 * partly mashed. Quality below 100 greys the potato over (rubbery). `radius` is the potato's size
 * (see `potatoSizeConfig`). `seed` shapes the lumps so potatoes differ.
 */
export function drawPotato({
    graphics,
    processing,
    radius,
    toppings,
    quality = 100,
    meter = defaultMeter,
    crown = false,
    seed = 0,
}: Readonly<{
    graphics: Graphics;
    /** The variety and eyes (`processing.variety`, `processing.hasEyes`) shape the look. */
    processing: Readonly<PotatoProcessing>;
    radius: number;
    toppings: Readonly<PotatoToppings>;
    /** 0 to 100. */
    quality?: number;
    /** Mash meter size. Bosses use a bigger one. */
    meter?: Readonly<{width: number; height: number}>;
    /** Draws the Russet King: a russet skin and a gold crown. */
    crown?: boolean;
    /** Varies the lumps of the skin. */
    seed?: number;
}>): Graphics {
    const progress = getMashProgress(processing);
    graphics.clear();

    if (progress > 0 && progress < 1) {
        drawMeter({
            graphics,
            radius,
            meter,
            progress,
        });
        drawStatusIcons({
            graphics,
            processing,
            radius,
            meterWidth: meter.width,
        });
    }

    if (progress >= 0.5) {
        drawMash({
            graphics,
            radius,
            perfect: progress >= 1,
            cooked: processing.cooked,
            variety: processing.variety ?? PotatoVariety.Russet,
        });
        drawRubbery({
            graphics,
            radius,
            quality,
            blob: true,
            seed,
        });
        drawFace({
            graphics,
            radius,
            mood: progress >= 1 ? 'happy' : 'dazed',
        });
    } else {
        drawWhole({
            graphics,
            radius,
            processing,
            seed,
            king: crown,
        });
        drawRubbery({
            graphics,
            radius,
            quality,
            blob: false,
            seed,
        });
        drawFace({
            graphics,
            radius,
            mood: crown ? 'angry' : 'calm',
        });
    }
    drawToppings(graphics, radius, toppings);
    if (crown) {
        drawCrown(graphics, radius);
    }

    return graphics;
}

/** The mash meter above the potato. */
function drawMeter({
    graphics,
    radius,
    meter,
    progress,
}: Readonly<{
    graphics: Graphics;
    radius: number;
    meter: Readonly<{width: number; height: number}>;
    progress: number;
}>) {
    const y = -radius - meterGapPx;
    drawCozyShape(graphics, {
        path: roundRectPath({
            x: -meter.width / 2,
            y,
            width: meter.width,
            height: meter.height,
            radius: meter.height / 2,
        }),
        fill: cozyPalette.walnut,
        outlineScale: 0.5,
        highlight: false,
    });
    drawCozyShape(graphics, {
        path: roundRectPath({
            x: -meter.width / 2,
            y,
            width: Math.max(meter.height, meter.width * progress),
            height: meter.height,
            radius: meter.height / 2,
        }),
        fill: cozyPalette.meadow,
        outline: false,
    });
}

const rawFreckles: ReadonlyArray<Point> = [
    [
        -0.55,
        -0.1,
    ],
    [
        0.45,
        0.3,
    ],
    [
        0.2,
        -0.5,
    ],
    [
        -0.1,
        0.45,
    ],
];

const kingFreckles: ReadonlyArray<Point> = [
    [
        -0.7,
        -0.1,
    ],
    [
        0.6,
        0.3,
    ],
    [
        0.3,
        -0.55,
    ],
    [
        -0.2,
        0.55,
    ],
    [
        0.75,
        -0.25,
    ],
    [
        -0.4,
        0.15,
    ],
];

/** How each variety's whole potato looks. Russet is the original brown. */
const varietyLooks: Readonly<
    Record<
        PotatoVariety,
        Readonly<{
            skin: string;
            cookedSkin: string;
            /** Freckle and mark color. */
            spot: string;
            /** Body width and height scales. */
            stretch: number;
            squash: number;
            lumpiness: number;
            bumps: number;
            /** Rough hatch marks (tough skin). */
            hatch: boolean;
            /** Extra bumpy texture (yam). */
            bumpy: boolean;
        }>
    >
> = {
    [PotatoVariety.Red]: {
        skin: '#d9695a',
        cookedSkin: '#ecb0a0',
        spot: '#a8402f',
        stretch: 0.94,
        squash: 1,
        lumpiness: 0.04,
        bumps: 5,
        hatch: false,
        bumpy: false,
    },
    [PotatoVariety.Russet]: {
        skin: cozyPalette.toffee,
        cookedSkin: cozyPalette.wheat,
        spot: cozyPalette.caramel,
        stretch: 1,
        squash: 1,
        lumpiness: 0.05,
        bumps: 5,
        hatch: false,
        bumpy: false,
    },
    [PotatoVariety.Yukon]: {
        skin: '#e6b84a',
        cookedSkin: '#f7e29a',
        spot: '#b98a2a',
        stretch: 1,
        squash: 1,
        lumpiness: 0.04,
        bumps: 4,
        hatch: false,
        bumpy: false,
    },
    [PotatoVariety.ToughSkinned]: {
        skin: '#8a5a38',
        cookedSkin: '#c9a77a',
        spot: cozyPalette.walnut,
        stretch: 1,
        squash: 1,
        lumpiness: 0.06,
        bumps: 6,
        hatch: true,
        bumpy: false,
    },
    [PotatoVariety.Sweet]: {
        skin: '#e8883a',
        cookedSkin: '#f5c58a',
        spot: '#b8581f',
        stretch: 1.22,
        squash: 0.8,
        lumpiness: 0.03,
        bumps: 3,
        hatch: false,
        bumpy: false,
    },
    [PotatoVariety.Yam]: {
        skin: '#6b4558',
        cookedSkin: '#b99aa0',
        spot: '#3f2634',
        stretch: 1.1,
        squash: 0.95,
        lumpiness: 0.09,
        bumps: 8,
        hatch: false,
        bumpy: true,
    },
};

/** Mash blob colors that differ from the default cream (the orange varieties). */
const mashTints: Readonly<
    Partial<Record<PotatoVariety, Readonly<{perfect: string; cooked: string; raw: string}>>>
> = {
    [PotatoVariety.Sweet]: {
        perfect: '#ffc58a',
        cooked: '#f0a860',
        raw: '#e0914f',
    },
    [PotatoVariety.Yam]: {
        perfect: '#f2a65c',
        cooked: '#e08f4a',
        raw: '#c97a3f',
    },
};

/** Short rough hatch marks across a tough skin. */
function drawHatchMarks({
    graphics,
    rx,
    ry,
    color,
}: Readonly<{graphics: Graphics; rx: number; ry: number; color: string}>) {
    for (const [
        x,
        y,
    ] of [
        [
            -0.55,
            0.4,
        ],
        [
            0.1,
            0.55,
        ],
        [
            0.6,
            0.2,
        ],
        [
            -0.15,
            -0.62,
        ],
        [
            0.55,
            -0.45,
        ],
    ] as const) {
        const cx = x * rx;
        const cy = y * ry;
        for (const offset of [
            -2,
            0,
            2,
        ]) {
            drawCozyLine(graphics, {
                path: linePath([
                    [
                        cx - 3 + offset,
                        cy + 4,
                    ],
                    [
                        cx + 3 + offset,
                        cy - 4,
                    ],
                ]),
                color,
                width: 1.4,
                alpha: 0.8,
            });
        }
    }
}

/** Lumpy bumps over a yam's skin. */
function drawBumps({
    graphics,
    rx,
    ry,
    color,
}: Readonly<{graphics: Graphics; rx: number; ry: number; color: string}>) {
    for (const [
        x,
        y,
        size,
    ] of [
        [
            -0.6,
            0.1,
            0.12,
        ],
        [
            -0.25,
            0.55,
            0.1,
        ],
        [
            0.3,
            0.5,
            0.13,
        ],
        [
            0.65,
            -0.1,
            0.1,
        ],
        [
            0.25,
            -0.6,
            0.12,
        ],
        [
            -0.4,
            -0.5,
            0.09,
        ],
    ] as const) {
        drawCozyShape(graphics, {
            path: dotPath({
                x: x * rx,
                y: y * ry,
                radius: Math.min(rx, ry) * size,
            }),
            fill: color,
            alpha: 0.85,
            ...flat,
        });
    }
}

/** Darker eye spots on the skin for a potato with eyes (blades struggle). */
function drawSkinEyes({
    graphics,
    radius,
    rx,
    ry,
}: Readonly<{graphics: Graphics; radius: number; rx: number; ry: number}>) {
    for (const [
        x,
        y,
    ] of [
        [
            -0.7,
            -0.2,
        ],
        [
            0.62,
            0.45,
        ],
        [
            0.05,
            -0.72,
        ],
    ] as const) {
        const cx = x * rx;
        const cy = y * ry;
        drawCozyShape(graphics, {
            path: dotPath({
                x: cx,
                y: cy,
                radius: Math.max(2, radius * 0.13),
            }),
            fill: cozyPalette.bark,
            ...flat,
        });
        drawCozyShape(graphics, {
            path: dotPath({
                x: cx - radius * 0.03,
                y: cy - radius * 0.03,
                radius: Math.max(0.8, radius * 0.04),
            }),
            fill: cozyPalette.sand,
            ...flat,
        });
    }
}

/** A raw, boiled or sliced whole potato (or the Russet King's skin). */
function drawWhole({
    graphics,
    radius,
    processing,
    seed,
    king,
}: Readonly<{
    graphics: Graphics;
    radius: number;
    processing: Readonly<PotatoProcessing>;
    seed: number;
    king: boolean;
}>) {
    const cooked = processing.cooked;
    const variety = processing.variety ?? PotatoVariety.Russet;
    const look = king ? undefined : varietyLooks[variety];
    const rx = radius * (king ? 1.25 : 1.2) * (look?.stretch ?? 1);
    const ry = radius * (king ? 0.95 : 0.9) * (look?.squash ?? 1);
    drawCozyShape(graphics, {
        path: blobPath({
            rx,
            ry,
            lumpiness: cooked ? 0.03 : (look?.lumpiness ?? 0.05),
            bumps: cooked ? 4 : (look?.bumps ?? 5),
            seed,
        }),
        fill: king
            ? cozyPalette.caramel
            : cooked
              ? (look?.cookedSkin ?? cozyPalette.wheat)
              : (look?.skin ?? cozyPalette.toffee),
    });

    if (cooked) {
        drawShine({
            graphics,
            x: -radius * 0.4,
            y: -radius * 0.4,
            rx: radius * 0.38,
            ry: radius * 0.15,
            strength: 1.1,
        });
        for (const [
            x,
            y,
        ] of [
            [
                -0.5,
                0.35,
            ],
            [
                0.4,
                0.2,
            ],
        ] as const) {
            drawCozyShape(graphics, {
                path: dotPath({
                    x: x * radius,
                    y: y * radius,
                    radius: radius * 0.07,
                }),
                fill: cozyPalette.sand,
                alpha: 0.7,
                ...flat,
            });
        }
    } else {
        drawShine({
            graphics,
            x: -radius * 0.4,
            y: -radius * 0.4,
            rx: radius * 0.35,
            ry: radius * 0.14,
        });
        for (const [
            x,
            y,
        ] of king ? kingFreckles : rawFreckles) {
            drawCozyShape(graphics, {
                path: dotPath({
                    x: x * radius,
                    y: y * radius,
                    radius: Math.max(1.3, radius * 0.06),
                }),
                fill: look?.spot ?? cozyPalette.caramel,
                ...flat,
            });
        }
    }

    if (look?.hatch) {
        drawHatchMarks({
            graphics,
            rx,
            ry,
            color: look.spot,
        });
    }
    if (look?.bumpy) {
        drawBumps({
            graphics,
            rx,
            ry,
            color: look.spot,
        });
    }
    if (processing.hasEyes) {
        drawSkinEyes({
            graphics,
            radius,
            rx,
            ry,
        });
    }

    if (processing.cut) {
        for (const x of [
            -0.4,
            0.4,
        ]) {
            // Stay inside the ellipse so the cut lines never poke past the skin.
            const half = ry * 0.92 * Math.sqrt(Math.max(0, 1 - ((x * radius) / rx) ** 2));
            drawCozyLine(graphics, {
                path: linePath([
                    [
                        x * radius,
                        -half,
                    ],
                    [
                        x * radius,
                        half,
                    ],
                ]),
                color: cozyPalette.oak,
                width: Math.max(2.5, radius * 0.14),
            });
            drawCozyLine(graphics, {
                path: linePath([
                    [
                        x * radius + radius * 0.12,
                        -half * 0.95,
                    ],
                    [
                        x * radius + radius * 0.12,
                        half * 0.95,
                    ],
                ]),
                color: cozyPalette.sand,
                width: Math.max(1, radius * 0.05),
            });
        }
    }
}

/** A half-mashed or perfectly mashed blob. */
function drawMash({
    graphics,
    radius,
    perfect,
    cooked,
    variety,
}: Readonly<{
    graphics: Graphics;
    radius: number;
    perfect: boolean;
    cooked: boolean;
    variety: PotatoVariety;
}>) {
    const tint = mashTints[variety];
    const creamFill = tint?.perfect ?? cozyPalette.cream;
    if (perfect) {
        drawCozyShape(graphics, {
            path: mashBlobPath(radius),
            fill: creamFill,
        });
        // The little peak on top.
        drawCozyShape(graphics, {
            path: polyPath([
                [
                    -radius * 0.18,
                    -radius * 0.78,
                ],
                [
                    0,
                    -radius * 1.18,
                ],
                [
                    radius * 0.2,
                    -radius * 0.78,
                ],
            ]),
            fill: creamFill,
            outlineScale: 0.9,
        });
        drawCozyShape(graphics, {
            path: ellipsePath({
                x: 0,
                y: -radius * 0.8,
                rx: radius * 0.3,
                ry: radius * 0.14,
            }),
            fill: creamFill,
            ...flat,
        });
        drawShine({
            graphics,
            x: -radius * 0.35,
            y: -radius * 0.35,
            rx: radius * 0.4,
            ry: radius * 0.17,
            rotation: -0.4,
            strength: 0.95,
        });
        drawShine({
            graphics,
            x: radius * 0.1,
            y: -radius * 0.3,
            rx: radius * 0.07,
            ry: radius * 0.07,
            rotation: 0,
            strength: 1.2,
        });
        drawCozyLine(graphics, {
            path: arcPath({
                x: 0,
                y: -radius * 0.62,
                radius: radius * 0.2,
                from: 0.3,
                to: Math.PI - 0.3,
            }),
            color: cozyPalette.sand,
            width: Math.max(1, radius * 0.05),
            alpha: 0.6,
        });

        return;
    }

    drawCozyShape(graphics, {
        path: mashBlobPath(radius),
        fill: cooked ? (tint?.cooked ?? cozyPalette.wheat) : (tint?.raw ?? cozyPalette.sand),
    });
    if (!cooked) {
        // Raw chunks still hiding in the mash.
        for (const [
            x,
            y,
            angle,
        ] of [
            [
                -0.6,
                -0.2,
                0.5,
            ],
            [
                0.15,
                -0.55,
                -0.3,
            ],
            [
                0.55,
                0.2,
                1,
            ],
            [
                -0.2,
                0.35,
                0,
            ],
        ] as const) {
            drawCozyShape(graphics, {
                path: tiltedEllipsePath({
                    x: x * radius,
                    y: y * radius,
                    rx: radius * 0.3,
                    ry: radius * 0.2,
                    rotation: angle,
                }),
                fill: cozyPalette.toffee,
                outlineScale: 0.55,
            });
        }
    }
    drawCozyLine(graphics, {
        path(target) {
            target.moveTo(-radius * 0.6, radius * 0.15);
            target.quadraticCurveTo(-radius * 0.3, 0, 0, radius * 0.15);
            target.quadraticCurveTo(radius * 0.3, radius * 0.3, radius * 0.6, radius * 0.1);
        },
        color: cozyPalette.caramel,
        width: Math.max(1.2, radius * 0.06),
        alpha: 0.5,
    });
}

/** Tiny dot eyes and blush (the Cozy face). */
function drawFace({
    graphics,
    radius,
    mood,
}: Readonly<{graphics: Graphics; radius: number; mood: 'calm' | 'happy' | 'dazed' | 'angry'}>) {
    const eyeX = radius * 0.3;
    const eyeY = -radius * 0.05;

    for (const side of [
        -1,
        1,
    ]) {
        if (mood === 'happy') {
            drawCozyLine(graphics, {
                path: arcPath({
                    x: side * eyeX,
                    y: eyeY + radius * 0.02,
                    radius: radius * 0.09,
                    from: Math.PI * 1.1,
                    to: Math.PI * 1.9,
                }),
                color: cozyPalette.bark,
                width: radius * 0.07,
            });
        } else {
            drawCozyShape(graphics, {
                path: dotPath({
                    x: side * eyeX,
                    y: eyeY,
                    radius: radius * 0.075,
                }),
                fill: cozyPalette.bark,
                ...flat,
            });
        }
        if (mood !== 'angry') {
            drawCozyShape(graphics, {
                path: dotPath({
                    x: side * radius * 0.5,
                    y: eyeY + radius * 0.2,
                    radius: radius * 0.12,
                }),
                fill: cozyPalette.pumpkin,
                alpha: 0.55,
                ...flat,
            });
        }
    }
    if (mood === 'happy' || mood === 'calm') {
        drawCozyLine(graphics, {
            path: arcPath({
                x: 0,
                y: eyeY + radius * 0.12,
                radius: radius * 0.1,
                from: 0.2,
                to: Math.PI - 0.2,
            }),
            color: cozyPalette.bark,
            width: radius * 0.05,
        });
    }
}

/**
 * Whether the potato has the animated overlays: steam (boiled whole potato) and eyelids (any face
 * with dot eyes). Mirrors `drawPotato`.
 */
export function getPotatoOverlays(processing: Readonly<PotatoProcessing>) {
    const progress = getMashProgress(processing);
    return {
        steam: progress < 0.5 && processing.cooked,
        blink: progress < 1,
    };
}

/** Lids for a blink: a short bark line over each dot eye. Drawn once, shown by toggling. */
export function drawEyelids(graphics: Graphics, radius: number): Graphics {
    for (const side of [
        -1,
        1,
    ]) {
        drawCozyLine(graphics, {
            path(target) {
                target.moveTo(side * radius * 0.3 - radius * 0.09, -radius * 0.05);
                target.lineTo(side * radius * 0.3 + radius * 0.09, -radius * 0.05);
            },
            color: cozyPalette.bark,
            width: radius * 0.16,
        });
    }
    return graphics;
}

/** Puffs of steam over a boiled potato. Drawn once; the entity moves and fades it. */
export function drawSteam(graphics: Graphics, radius: number): Graphics {
    for (let puff = 0; puff < 3; puff++) {
        const rise = puff * 0.3;
        const size = radius * 0.16 * (1 + rise);
        drawCozyShape(graphics, {
            path: dotPath({
                x: Math.sin(rise * 6 + puff * 2) * radius * 0.2 + (puff - 1) * radius * 0.4,
                y: -radius * 0.95 - rise * radius * 1.1,
                radius: size,
            }),
            fill: cozyPalette.cream,
            alpha: (1 - rise) * 0.85,
            ...flat,
        });
    }
    return graphics;
}

/** The Russet King's gold crown, tilted jauntily on top of the potato. */
function drawCrown(graphics: Graphics, radius: number) {
    const placement = {
        x: 0,
        y: -radius * 0.82,
        rotation: 0.12,
    } as const;
    function scaled(points: ReadonlyArray<Point>): Point[] {
        return placePoints({
            points: points.map(
                ([
                    x,
                    y,
                ]): Point => {
                    return [
                        x * radius,
                        y * radius,
                    ];
                },
            ),
            ...placement,
        });
    }

    drawCozyShape(graphics, {
        path: polyPath(
            scaled([
                [
                    -0.5,
                    0.12,
                ],
                [
                    -0.58,
                    -0.55,
                ],
                [
                    -0.27,
                    -0.25,
                ],
                [
                    0,
                    -0.7,
                ],
                [
                    0.27,
                    -0.25,
                ],
                [
                    0.58,
                    -0.55,
                ],
                [
                    0.5,
                    0.12,
                ],
            ]),
        ),
        fill: cozyPalette.butter,
        outlineScale: 0.85,
    });
    drawCozyShape(graphics, {
        path: polyPath(
            scaled([
                [
                    -0.5,
                    -0.02,
                ],
                [
                    0.5,
                    -0.02,
                ],
                [
                    0.5,
                    0.14,
                ],
                [
                    -0.5,
                    0.14,
                ],
            ]),
        ),
        fill: cozyPalette.caramel,
        outlineScale: 0.6,
    });
    for (const [
        jewelX,
        jewelY,
    ] of scaled([
        [
            -0.58,
            -0.55,
        ],
        [
            0,
            -0.7,
        ],
        [
            0.58,
            -0.55,
        ],
    ])) {
        drawCozyShape(graphics, {
            path: dotPath({
                x: jewelX,
                y: jewelY,
                radius: radius * 0.07,
            }),
            fill: cozyPalette.tomato,
            outlineScale: 0.5,
        });
    }
}

/**
 * Draws the active effects above the mash meter, left to right: a blade for cut, then a water drop
 * for soft (boiled). A fully prepped potato shows both.
 */
function drawStatusIcons({
    graphics,
    processing,
    radius,
    meterWidth,
}: Readonly<{
    graphics: Graphics;
    processing: Readonly<PotatoProcessing>;
    radius: number;
    meterWidth: number;
}>) {
    const size = comboDisplayConfig.iconSizePx;
    const top = -radius - meterGapPx - size - 3;
    let left = -meterWidth / 2;

    if (processing.cut) {
        drawCozyLine(graphics, {
            path: linePath([
                [
                    left + 1,
                    top + size - 1,
                ],
                [
                    left + size - 1,
                    top + 1,
                ],
            ]),
            color: cozyPalette.stone,
            width: 4,
            outline: true,
        });
        drawCozyLine(graphics, {
            path: linePath([
                [
                    left + 2,
                    top + size - 3,
                ],
                [
                    left + size - 3,
                    top + 2,
                ],
            ]),
            color: cozyPalette.cream,
            width: 1.5,
        });
        left += size + 4;
    }
    if (processing.cooked) {
        drawCozyShape(graphics, {
            path: polyPath([
                [
                    left + size / 2,
                    top,
                ],
                [
                    left + size * 0.2,
                    top + size * 0.62,
                ],
                [
                    left + size * 0.8,
                    top + size * 0.62,
                ],
            ]),
            fill: cozyPalette.sky,
            outlineScale: 0.6,
        });
        drawCozyShape(graphics, {
            path: dotPath({
                x: left + size / 2,
                y: top + size * 0.68,
                radius: size * 0.32,
            }),
            fill: cozyPalette.sky,
            outlineScale: 0.6,
        });
    }
}

/** Draws the hand-applied toppings on the potato. Gravy goes first so the rest sit on top. */
function drawToppings(graphics: Graphics, radius: number, toppings: Readonly<PotatoToppings>) {
    const r = radius;

    if (toppings[Topping.Gravy]) {
        drawCozyShape(graphics, {
            path(target) {
                target.ellipse(0, -r * 0.12, r * 0.72, r * 0.36);
                target.circle(-r * 0.5, r * 0.12, r * 0.14);
                target.circle(r * 0.3, r * 0.2, r * 0.18);
                target.circle(r * 0.62, 0, r * 0.12);
            },
            fill: cozyPalette.oak,
            outlineScale: 0.6,
        });
        drawShine({
            graphics,
            x: -r * 0.25,
            y: -r * 0.24,
            rx: r * 0.22,
            ry: r * 0.07,
            rotation: -0.2,
            strength: 0.8,
        });
        drawCozyShape(graphics, {
            path: ellipsePath({
                x: r * 0.15,
                y: -r * 0.08,
                rx: r * 0.2,
                ry: r * 0.07,
            }),
            fill: cozyPalette.caramel,
            alpha: 0.5,
            ...flat,
        });
    }
    if (toppings[Topping.Cabbage]) {
        for (const [
            x,
            y,
            angle,
        ] of [
            [
                -0.45,
                0.18,
                -0.5,
            ],
            [
                0.38,
                0.28,
                0.4,
            ],
        ] as const) {
            drawCozyShape(graphics, {
                path: tiltedEllipsePath({
                    x: x * r,
                    y: y * r,
                    rx: r * 0.34,
                    ry: r * 0.2,
                    rotation: angle,
                }),
                fill: cozyPalette.meadow,
                outlineScale: 0.6,
            });
            // The leaf's center rib and two side veins.
            for (const [
                fromX,
                fromY,
                toX,
                toY,
                width,
            ] of [
                [
                    -0.28,
                    0,
                    0.26,
                    0,
                    0.05,
                ],
                [
                    -0.08,
                    0,
                    0.04,
                    -0.1,
                    0.035,
                ],
                [
                    -0.08,
                    0,
                    0.04,
                    0.1,
                    0.035,
                ],
            ] as const) {
                drawCozyLine(graphics, {
                    path: linePath(
                        placePoints({
                            points: [
                                [
                                    fromX * r,
                                    fromY * r,
                                ],
                                [
                                    toX * r,
                                    toY * r,
                                ],
                            ],
                            x: x * r,
                            y: y * r,
                            rotation: angle,
                        }),
                    ),
                    color: cozyPalette.moss,
                    width: Math.max(1, r * width),
                });
            }
        }
    }
    if (toppings[Topping.Scallions]) {
        for (const [
            x,
            y,
            angle,
        ] of [
            [
                -0.3,
                -0.55,
                -0.6,
            ],
            [
                0,
                -0.62,
                0,
            ],
            [
                0.3,
                -0.55,
                0.6,
            ],
            [
                0.1,
                -0.35,
                0.9,
            ],
        ] as const) {
            const stalk = linePath(
                placePoints({
                    points: [
                        [
                            0,
                            0,
                        ],
                        [
                            0,
                            -r * 0.3,
                        ],
                    ],
                    x: x * r,
                    y: y * r,
                    rotation: angle,
                }),
            );
            drawCozyLine(graphics, {
                path: stalk,
                color: cozyPalette.moss,
                width: r * 0.16,
                outline: true,
            });
            drawCozyLine(graphics, {
                path: stalk,
                color: cozyPalette.meadow,
                width: r * 0.09,
            });
        }
        for (const [
            x,
            y,
        ] of [
            [
                -0.55,
                -0.2,
            ],
            [
                0.55,
                -0.15,
            ],
            [
                0,
                -0.15,
            ],
        ] as const) {
            drawCozyShape(graphics, {
                path: dotPath({
                    x: x * r,
                    y: y * r,
                    radius: r * 0.09,
                }),
                fill: cozyPalette.meadow,
                outlineScale: 0.5,
            });
            drawCozyShape(graphics, {
                path: dotPath({
                    x: x * r,
                    y: y * r,
                    radius: r * 0.04,
                }),
                fill: cozyPalette.cream,
                ...flat,
            });
        }
    }
    if (toppings[Topping.Butter]) {
        drawCozyShape(graphics, {
            path: roundRectPath({
                x: -r * 0.3,
                y: -r * 0.55,
                width: r * 0.6,
                height: r * 0.44,
                radius: r * 0.1,
            }),
            fill: cozyPalette.toffee,
            outlineScale: 0.7,
        });
        drawCozyShape(graphics, {
            path: roundRectPath({
                x: -r * 0.3,
                y: -r * 0.62,
                width: r * 0.6,
                height: r * 0.36,
                radius: r * 0.1,
            }),
            fill: cozyPalette.butter,
            outlineScale: 0.7,
        });
        drawShine({
            graphics,
            x: -r * 0.12,
            y: -r * 0.5,
            rx: r * 0.12,
            ry: r * 0.05,
            rotation: 0,
            strength: 0.9,
        });
        drawCozyShape(graphics, {
            path: ellipsePath({
                x: r * 0.1,
                y: -r * 0.08,
                rx: r * 0.14,
                ry: r * 0.05,
            }),
            fill: cozyPalette.butter,
            alpha: 0.6,
            ...flat,
        });
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
    seed,
}: Readonly<{
    graphics: Graphics;
    radius: number;
    quality: number;
    blob: boolean;
    seed: number;
}>) {
    const alpha = (1 - getRubberyStep(quality) / 100) * qualityConfig.rubberyMaxAlpha;
    if (alpha <= 0) {
        return;
    }
    drawCozyShape(graphics, {
        path: blob
            ? mashBlobPath(radius)
            : blobPath({
                  rx: radius * 1.2,
                  ry: radius * 0.9,
                  lumpiness: 0.05,
                  bumps: 5,
                  seed,
              }),
        fill: cozyPalette.sage,
        alpha,
        ...flat,
    });
}

/**
 * A string that changes whenever anything `drawPotato` draws changes, so the entity redraws only
 * then. Mash progress is bucketed, but `done` is explicit: 0.99 and 1 share a bucket yet look
 * different (meter vs. perfect blob).
 */
export function getPotatoLookKey({
    processing,
    toppings,
    quality,
    radius,
    crown,
}: {
    processing: Readonly<PotatoProcessing>;
    toppings: Readonly<PotatoToppings>;
    quality: number;
    radius: number;
    crown: boolean;
}): string {
    const done = processing.mashHp <= 0;
    return [
        processing.cut,
        processing.cooked,
        done ? 'done' : Math.round(getMashProgress(processing) * 20),
        JSON.stringify(toppings),
        getRubberyStep(quality),
        radius,
        crown,
        processing.variety ?? PotatoVariety.Russet,
        processing.hasEyes ?? false,
    ].join('|');
}
