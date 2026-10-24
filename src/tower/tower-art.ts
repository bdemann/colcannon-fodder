/* eslint-disable @virmator/prefer-params-object -- ported 1:1 from the lab, whose helpers are positional */
/**
 * Cozy Farmhouse drawings of the six towers, ported from the art lab (`docs/art-lab/index.html`,
 * "Cozy Farmhouse" tab, `tKnife` and friends). Each tower is redrawn every frame from a
 * `TowerPose`: a looping idle when `attack` is -1, and an attack animation when it is 0 to 1. Pure
 * drawing, so it is safe to call from `render()` and from the placement ghost.
 *
 * The lab draws on a canvas; here a single Pixi `Graphics` is cleared and redrawn, using Pixi's
 * transform stack for the lab's `translate`, `rotate` and `scale`.
 */
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
import {towerArtConfig} from '../config/game-config.js';
import {qualityConfig} from '../config/quality-config.js';
import {TowerType} from './tower-type.js';

/** What a tower looks like right now. */
export type TowerPose = {
    towerType: TowerType;
    /** -1 when idle, otherwise how far through the attack animation it is (0 to 1). */
    attack: number;
    /** Seconds of the idle clock (any steadily increasing time). */
    timeSec: number;
    /** Where the last hit landed, relative to the tower. Aims the Microwave cone and cricket. */
    aimX: number;
    aimY: number;
    /** The tower's range, so area effects and the Swiper arm are the real size. */
    rangePx: number;
    /** Swiper only: the arm's current angle in radians. */
    swiperAngle: number;
};

const tau = Math.PI * 2;
function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}
function clamp(x: number) {
    return Math.max(0, Math.min(1, x));
}
function seg(p: number, a: number, b: number) {
    return clamp((p - a) / (b - a));
}
function easeOut(x: number) {
    return 1 - Math.pow(1 - x, 3);
}
function easeIn(x: number) {
    return x * x * x;
}
/** Ease out with a little overshoot. */
function easeBack(x: number) {
    return 1 + 3.2 * Math.pow(x - 1, 3) + 2.2 * Math.pow(x - 1, 2);
}

/** How far the lab's tower base sits below the tower's center, in lab units. */
const labBaseY = 8;

function ell(x: number, y: number, rx: number, ry: number): CozyPath {
    return ellipsePath({
        x,
        y,
        rx,
        ry,
    });
}
function circ(x: number, y: number, r: number): CozyPath {
    return ell(x, y, r, r);
}
function rr(x: number, y: number, width: number, height: number, radius: number): CozyPath {
    return roundRectPath({
        x,
        y,
        width,
        height,
        radius,
    });
}
function poly(
    ...points: ReadonlyArray<
        readonly [
            number,
            number,
        ]
    >
): CozyPath {
    return polyPath(points);
}

type PartOptions = {
    /** Skip the Bark outline. */
    noOutline?: boolean;
    /** Skip the highlight (flat shape). */
    flat?: boolean;
    /** Outline thickness multiplier. */
    outlineScale?: number;
    alpha?: number;
};

function part(g: Graphics, fill: string, path: CozyPath, options: Readonly<PartOptions> = {}) {
    drawCozyShape(g, {
        path,
        fill,
        outline: !options.noOutline,
        highlight: !options.flat,
        outlineScale: options.outlineScale ?? 1,
        alpha: options.alpha ?? 1,
    });
}

function line(
    g: Graphics,
    color: string,
    width: number,
    points: ReadonlyArray<
        readonly [
            number,
            number,
        ]
    >,
    options: Readonly<{outline?: boolean; alpha?: number}> = {},
) {
    drawCozyLine(g, {
        color,
        width,
        outline: options.outline ?? false,
        alpha: options.alpha ?? 1,
        path(graphics) {
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
        },
    });
}

/** A small white shine dab. */
function shine(
    g: Graphics,
    {
        x,
        y,
        rx,
        ry,
        rotation = 0,
        strength = 1,
    }: Readonly<{
        x: number;
        y: number;
        rx: number;
        ry: number;
        rotation?: number;
        strength?: number;
    }>,
) {
    scope(
        g,
        {
            x,
            y,
            rotation,
        },
        () => {
            g.ellipse(0, 0, rx, ry).fill({
                color: '#ffffff',
                alpha: cozyStyle.shine * strength,
            });
        },
    );
}

type Transform = {x?: number; y?: number; rotation?: number; scaleX?: number; scaleY?: number};

/** Runs `draw` under a temporary translate, rotate and scale (the lab's `c.save()` ... `restore()`). */
function scope(g: Graphics, transform: Readonly<Transform>, draw: () => void) {
    g.save();
    g.translateTransform(transform.x ?? 0, transform.y ?? 0);
    g.rotateTransform(transform.rotation ?? 0);
    g.scaleTransform(transform.scaleX ?? 1, transform.scaleY ?? 1);
    draw();
    g.restore();
}

/** The lab's round tower base: a soft ground shadow and a tinted dish. */
function base(g: Graphics, color: string) {
    for (let layer = 0; layer < 4; layer++) {
        const grow = 1.1 - layer * 0.12;
        g.ellipse(0, 24, 50 * grow, 17 * grow).fill({
            color: cozyPalette.bark,
            alpha: 0.09,
        });
    }
    part(g, color, ell(0, labBaseY, 46, 34));
    part(g, '#ffffff', ell(0, labBaseY, 38, 27), {
        noOutline: true,
        flat: true,
        alpha: 0.16,
    });
}

function drawKnife(g: Graphics, pose: Readonly<TowerPose>) {
    const {timeSec: t} = pose;
    // A hit restarts the animation, and the Knife fires every few hundred ms, so skip the lab's slow
    // wind-up: start with the blade already raised.
    const a = pose.attack < 0 ? -1 : 0.5 + pose.attack * 0.5;
    base(g, cozyPalette.sage);
    const impact = a < 0 ? 0 : seg(a, 0.55, 0.64) * (1 - seg(a, 0.64, 0.9));
    let angle;
    if (a < 0) {
        angle = -0.35 + Math.sin(t * 2) * 0.05;
    } else if (a < 0.55) {
        angle = -1.2 + Math.sin(a * 160) * 0.025;
    } else if (a < 0.62) {
        angle = lerp(-1.2, 0.05, easeIn(seg(a, 0.55, 0.62)));
    } else {
        angle = lerp(0.05, -0.35, easeBack(seg(a, 0.62, 1)));
    }

    scope(
        g,
        {
            y: 22,
            scaleX: 1 + 0.06 * impact,
            scaleY: 1 - 0.1 * impact,
        },
        () => {
            scope(
                g,
                {
                    y: -22,
                },
                () => {
                    part(g, cozyPalette.toffee, rr(-32, 2, 64, 24, 6));
                    part(g, cozyPalette.caramel, rr(-32, 18, 64, 8, 4), {
                        noOutline: true,
                        flat: true,
                        alpha: 0.5,
                    });
                    line(
                        g,
                        cozyPalette.caramel,
                        1.5,
                        [
                            [
                                -22,
                                10,
                            ],
                            [
                                -6,
                                10,
                            ],
                        ],
                        {
                            alpha: 0.5,
                        },
                    );
                    line(
                        g,
                        cozyPalette.caramel,
                        1.5,
                        [
                            [
                                6,
                                13,
                            ],
                            [
                                24,
                                13,
                            ],
                        ],
                        {
                            alpha: 0.5,
                        },
                    );
                },
            );
        },
    );

    // The potato being chopped: two halves that spring apart on impact.
    const spread = a < 0 ? 0 : impact * 6;
    scope(
        g,
        {
            x: 12,
        },
        () => {
            part(g, cozyPalette.toffee, ell(-spread, 0, 8, 7), {
                outlineScale: 0.7,
            });
            part(g, cozyPalette.toffee, ell(spread, 0, 8, 7), {
                outlineScale: 0.7,
            });
        },
    );

    scope(
        g,
        {
            x: -26,
            y: 6,
            rotation: angle,
        },
        () => {
            part(
                g,
                cozyPalette.stone,
                poly(
                    [
                        2,
                        -9,
                    ],
                    [
                        46,
                        -9,
                    ],
                    [
                        58,
                        0,
                    ],
                    [
                        46,
                        8,
                    ],
                    [
                        2,
                        8,
                    ],
                ),
            );
            line(
                g,
                cozyPalette.sage,
                2,
                [
                    [
                        6,
                        5,
                    ],
                    [
                        46,
                        5,
                    ],
                ],
                {
                    alpha: 0.7,
                },
            );
            shine(g, {
                x: 24,
                y: -5,
                rx: 16,
                ry: 2,
                strength: 0.9,
            });
            part(g, cozyPalette.caramel, rr(-20, -6, 24, 11, 4), {
                outlineScale: 0.8,
            });
            part(g, cozyPalette.butter, circ(-14, 0, 1.8), {
                noOutline: true,
                flat: true,
            });
            part(g, cozyPalette.butter, circ(-4, 0, 1.8), {
                noOutline: true,
                flat: true,
            });
        },
    );

    if (impact > 0) {
        for (const k of [
            -1,
            0,
            1,
        ]) {
            line(
                g,
                cozyPalette.cream,
                2.5,
                [
                    [
                        24 + k * 6,
                        2,
                    ],
                    [
                        30 + k * 14,
                        -8 + Math.abs(k) * 3,
                    ],
                ],
                {
                    alpha: impact,
                },
            );
        }
    }
}

function drawBoiler(g: Graphics, pose: Readonly<TowerPose>) {
    const {attack: a, timeSec: t} = pose;
    base(g, cozyPalette.pond);
    // The burner and its flames.
    part(g, cozyPalette.sage, ell(0, 24, 32, 11));
    for (let i = -2; i <= 2; i++) {
        const flame = 5 + 3 * Math.sin(t * 14 + i * 2.1);
        part(
            g,
            i % 2 ? cozyPalette.butter : cozyPalette.pumpkin,
            poly(
                [
                    i * 9 - 4,
                    26,
                ],
                [
                    i * 9,
                    26 - flame - 4,
                ],
                [
                    i * 9 + 4,
                    26,
                ],
            ),
            {
                outlineScale: 0.5,
            },
        );
    }

    const k = a < 0 ? 0 : seg(a, 0.1, 0.9);
    const pop = a < 0 ? 0 : Math.sin(seg(a, 0.12, 0.4) * Math.PI);
    const squashY =
        a < 0
            ? 1 + Math.sin(t * 3) * 0.012
            : 1 + 0.1 * pop - 0.05 * Math.sin(seg(a, 0.4, 0.7) * Math.PI);

    // The pot squashes from its base.
    scope(
        g,
        {
            y: 24,
            scaleX: (1 / squashY) * 0.5 + 0.5,
            scaleY: squashY,
        },
        () => {
            scope(
                g,
                {
                    y: -24,
                },
                () => {
                    part(g, cozyPalette.stone, rr(-26, -18, 52, 42, 10));
                    shine(g, {
                        x: -14,
                        y: -4,
                        rx: 5,
                        ry: 14,
                        strength: 0.8,
                    });
                    for (const side of [
                        -1,
                        1,
                    ]) {
                        part(g, cozyPalette.sage, rr(side > 0 ? 25 : -35, -8, 10, 7, 3), {
                            outlineScale: 0.8,
                        });
                    }
                    part(g, cozyPalette.sage, ell(0, -18, 27, 9));
                    const surge = a < 0 ? 0 : Math.sin(seg(a, 0.1, 0.5) * Math.PI);
                    part(g, cozyPalette.pond, ell(0, -18, 22, 6.5 + 4 * surge), {
                        noOutline: true,
                    });
                    // Bubbles rising off the water.
                    for (let i = 0; i < 4; i++) {
                        const u = (t * 0.7 + i * 0.27) % 1;
                        part(g, cozyPalette.sky, circ((i - 1.5) * 8, -18 - u * 5, 2 + u * 3), {
                            outlineScale: 0.5,
                            alpha: 1 - Math.pow(u, 6),
                        });
                    }
                },
            );
        },
    );

    // Steam curls.
    for (let i = 0; i < 3; i++) {
        const u = (t * 0.4 + i / 3) % 1;
        part(
            g,
            cozyPalette.cream,
            circ(Math.sin(u * 5 + i) * 6 + (i - 1) * 9, -28 - u * 26, 5 + u * 5),
            {
                noOutline: true,
                flat: true,
                alpha: (1 - u) * 0.7,
            },
        );
    }

    if (a >= 0 && k > 0) {
        // The splash ring grows out to the real range, so it shows who got hit.
        g.circle(0, 0, pose.rangePx * (0.3 + 0.7 * k)).stroke({
            color: cozyPalette.sky,
            width: 4 * (1 - k) + 1.5,
            alpha: 0.9 * (1 - k),
        });
        for (let i = 0; i < 7; i++) {
            const angle = (i / 7) * tau;
            const u = seg(a, 0.12, 0.8);
            const radius = u * 46;
            const lift = Math.sin(u * Math.PI) * 26;
            part(
                g,
                cozyPalette.sky,
                circ(
                    Math.cos(angle) * radius,
                    -14 + Math.sin(angle) * radius * 0.45 - lift,
                    3.2 - u,
                ),
                {
                    outlineScale: 0.5,
                    alpha: 1 - u * u,
                },
            );
        }
    }
}

function drawMasher(g: Graphics, pose: Readonly<TowerPose>) {
    const {timeSec: t} = pose;
    // Skip the wind-up for the same reason as the Knife: start with the masher raised.
    const a = pose.attack < 0 ? -1 : 0.5 + pose.attack * 0.5;
    base(g, '#e0a050');
    part(g, cozyPalette.sage, ell(0, 20, 34, 14));
    part(g, cozyPalette.cream, ell(0, 17, 28, 9.5), {
        noOutline: true,
    });
    shine(g, {
        x: -8,
        y: 15,
        rx: 9,
        ry: 2.5,
        strength: 0.8,
    });

    let offset;
    if (a < 0) {
        offset = -10 + Math.sin(t * 2.4) * 2;
    } else if (a < 0.6) {
        offset = -36 + Math.sin(a * 100) * 0.6;
    } else if (a < 0.68) {
        offset = lerp(-36, 0, easeIn(seg(a, 0.6, 0.68)));
    } else {
        offset = lerp(0, -10, easeOut(seg(a, 0.68, 1)));
    }
    const impact = a < 0 ? 0 : seg(a, 0.68, 0.74) * (1 - seg(a, 0.74, 1));
    const falling = a >= 0.6 && a < 0.68;
    const scaleX = 1 + 0.14 * impact - (falling ? 0.06 : 0);
    const scaleY = 1 - 0.16 * impact + (falling ? 0.14 : 0);

    scope(
        g,
        {
            y: 18 + offset,
            scaleX,
            scaleY,
        },
        () => {
            part(g, cozyPalette.caramel, rr(-3.5, -46, 7, 40, 2.5), {
                outlineScale: 0.8,
            });
            part(g, cozyPalette.toffee, rr(-14, -54, 28, 9, 4.5), {
                outlineScale: 0.9,
            });
            part(g, cozyPalette.stone, rr(-22, -8, 44, 10, 4));
            for (let i = -2; i <= 2; i++) {
                part(g, cozyPalette.sage, circ(i * 8, -3, 1.8), {
                    noOutline: true,
                    flat: true,
                });
            }
        },
    );

    if (impact > 0) {
        const k = seg(a, 0.68, 1);
        g.ellipse(0, 20, 22 + k * 30, (22 + k * 30) * 0.38).stroke({
            color: cozyPalette.cream,
            width: 3,
            alpha: 1 - k,
        });
        for (const side of [
            -1,
            1,
        ]) {
            part(
                g,
                cozyPalette.cream,
                circ(side * (14 + k * 26), 12 - Math.sin(k * Math.PI) * 22, 3.5),
                {
                    outlineScale: 0.5,
                    alpha: 1 - k,
                },
            );
        }
    }
}

function drawMicrowave(g: Graphics, pose: Readonly<TowerPose>) {
    const {timeSec: t} = pose;
    const on = pose.attack >= 0;
    // The Microwave beams continuously, so "attack" here is just how long since the last beam tick.
    const fade = on ? 1 - seg(pose.attack, 0.5, 1) : 0;

    if (on) {
        // The cone is the real cone: aimed at the last target and `rangePx` long.
        const aim = Math.atan2(pose.aimY, pose.aimX);
        const half = (qualityConfig.microwaveConeHalfAngleDeg * Math.PI) / 180;
        g.moveTo(0, 0)
            .arc(0, 0, pose.rangePx, aim - half, aim + half)
            .closePath()
            .fill({
                color: cozyPalette.pumpkin,
                alpha: 0.3 * fade,
            });
        for (let k = 0; k < 3; k++) {
            const u = (t * 2 + k / 3) % 1;
            g.arc(0, 0, 14 + u * (pose.rangePx - 14), aim - half * 0.8, aim + half * 0.8).stroke({
                color: cozyPalette.butter,
                width: 3,
                alpha: (1 - u) * fade,
            });
        }
    }

    base(g, cozyPalette.caramel);
    const shake = on ? Math.sin(t * 70) * 1.1 : 0;
    scope(
        g,
        {
            x: -16 + shake,
        },
        () => {
            part(g, cozyPalette.cream, rr(-34, -20, 68, 42, 7));
            // The window, with the glow of whatever is cooking.
            part(g, cozyPalette.pine, rr(-28, -14, 40, 30, 4), {
                outlineScale: 0.8,
            });
            const glow = on ? 0.95 : 0.4 + 0.15 * Math.sin(t * 2.5);
            part(g, cozyPalette.butter, rr(-26, -12, 36, 26, 3), {
                noOutline: true,
                flat: true,
                alpha: glow * 0.7,
            });
            part(g, cozyPalette.stone, ell(-8, 10, 14, 4), {
                noOutline: true,
                flat: true,
            });
            const spin = t * (on ? 5 : 1.2);
            part(g, cozyPalette.toffee, ell(-8 + Math.cos(spin) * 3, 5, 6, 4.5), {
                noOutline: true,
                flat: true,
            });
            shine(g, {
                x: -22,
                y: -8,
                rx: 6,
                ry: 2,
                rotation: -0.6,
                strength: 0.7,
            });
            // The control panel.
            part(g, cozyPalette.sage, rr(15, -14, 14, 30, 3), {
                outlineScale: 0.7,
            });
            for (let i = 0; i < 3; i++) {
                part(
                    g,
                    i === 0 && on ? cozyPalette.butter : cozyPalette.stone,
                    circ(22, -8 + i * 7, 2.2),
                    {
                        outlineScale: 0.4,
                    },
                );
            }
            part(g, cozyPalette.sage, rr(-30, 22, 10, 4, 2), {
                noOutline: true,
            });
            part(g, cozyPalette.sage, rr(20, 22, 10, 4, 2), {
                noOutline: true,
            });
        },
    );
}

/** A little green cricket (the lab's `cricket`), facing right. */
function drawCricket(
    g: Graphics,
    {
        timeSec,
        squash = 1,
        tilt = 0,
    }: Readonly<{
        timeSec: number;
        squash?: number;
        tilt?: number;
    }>,
) {
    scope(
        g,
        {
            rotation: tilt,
            scaleX: 1 / squash,
            scaleY: squash,
        },
        () => {
            // Back leg, antennae, body, head and eye.
            line(
                g,
                cozyPalette.pine,
                2.4,
                [
                    [
                        -3,
                        2,
                    ],
                    [
                        -9,
                        -6,
                    ],
                    [
                        -13,
                        3,
                    ],
                ],
                {
                    outline: true,
                },
            );
            line(g, cozyPalette.pine, 1.2, [
                [
                    7,
                    -4,
                ],
                [
                    12,
                    -12 + Math.sin(timeSec * 12) * 2,
                ],
            ]);
            line(g, cozyPalette.pine, 1.2, [
                [
                    8,
                    -3,
                ],
                [
                    15,
                    -8 + Math.sin(timeSec * 12 + 1) * 2,
                ],
            ]);
            part(g, cozyPalette.moss, ell(0, 0, 10, 5.2), {
                outlineScale: 0.8,
            });
            part(g, cozyPalette.moss, circ(8, -1.5, 4.2), {
                outlineScale: 0.8,
            });
            part(g, '#ffffff', circ(9.5, -2.5, 1.5), {
                noOutline: true,
                flat: true,
            });
            part(g, cozyPalette.bark, circ(10, -2.5, 0.8), {
                noOutline: true,
                flat: true,
            });
            line(
                g,
                cozyPalette.pine,
                1.2,
                [
                    [
                        -2,
                        -3,
                    ],
                    [
                        3,
                        -3,
                    ],
                ],
                {
                    alpha: 0.7,
                },
            );
        },
    );
}

function drawCricketTrap(g: Graphics, pose: Readonly<TowerPose>) {
    const {attack: a, timeSec: t} = pose;
    base(g, cozyPalette.walnut);
    if (a < 0) {
        // Antennae peeking out of the box.
        for (const side of [
            -1,
            1,
        ]) {
            drawCozyLine(g, {
                color: cozyPalette.pine,
                width: 1.6,
                path(graphics) {
                    graphics
                        .moveTo(side * 4, -4)
                        .quadraticCurveTo(
                            side * 10,
                            -20,
                            side * (14 + Math.sin(t * 5 + side) * 4),
                            -24 + Math.sin(t * 4) * 2,
                        );
                },
            });
        }
    }

    part(g, cozyPalette.toffee, rr(-30, -2, 60, 30, 5));
    for (const y of [
        6,
        14,
        22,
    ]) {
        line(
            g,
            cozyPalette.caramel,
            1.6,
            [
                [
                    -28,
                    y,
                ],
                [
                    28,
                    y,
                ],
            ],
            {
                alpha: 0.55,
            },
        );
    }
    part(g, cozyPalette.bark, rr(-11, 6, 22, 12, 3), {
        outlineScale: 0.7,
        flat: true,
    });
    // The lid flips open when a cricket goes out.
    const lid = -(0.1 + (a >= 0 ? 0.55 * Math.sin(a * Math.PI) : Math.sin(t * 1.5) * 0.04));
    scope(
        g,
        {
            x: -31,
            y: -2,
            rotation: lid,
        },
        () => {
            part(g, cozyPalette.caramel, rr(0, -8, 62, 9, 3), {
                outlineScale: 0.9,
            });
        },
    );
    part(
        g,
        cozyPalette.meadow,
        ellipsePath({
            x: 20,
            y: -10,
            rx: 7,
            ry: 3.5,
        }),
        {
            outlineScale: 0.6,
        },
    );
}

/** The cricket in flight toward the gull it was thrown at, in tower-relative world pixels. */
function drawThrownCricket(g: Graphics, pose: Readonly<TowerPose>) {
    const {attack: a} = pose;
    const arcHeightPx = towerArtConfig.cricketArcPx;
    const spin = a * 3;
    scope(
        g,
        {
            x: pose.aimX * a,
            y: pose.aimY * a - arcHeightPx * 4 * a * (1 - a),
            scaleX: Math.sign(pose.aimX || 1) * towerArtConfig.scale,
            scaleY: towerArtConfig.scale,
        },
        () => {
            const f = spin % 1;
            drawCricket(g, {
                timeSec: pose.timeSec,
                squash: 1 - 0.15 * Math.sin(f * Math.PI),
                tilt: -Math.cos(f * Math.PI) * 0.5,
            });
        },
    );
}

function drawSwiper(g: Graphics, pose: Readonly<TowerPose>) {
    const {attack: a} = pose;
    base(g, '#6f8b6a');
    // The arm turns with the real simulation angle, around the hub at the tower's center. The lab's
    // y-squash is dropped because the arm's hit area is a plain circle.
    const armLength = pose.rangePx;
    const fan = a < 0 ? 0 : Math.sin(a * Math.PI);
    scope(
        g,
        {
            y: labBaseY,
            rotation: pose.swiperAngle,
        },
        () => {
            if (fan > 0.05) {
                // A swish arc trailing the paddle when it just caught a potato.
                g.arc(0, 0, armLength * 0.7, -1.5, 0).stroke({
                    color: cozyPalette.cream,
                    width: 18,
                    alpha: 0.5 * fan,
                    cap: 'round',
                });
            }
            part(g, cozyPalette.toffee, rr(6, -6, 18, 12, 4), {
                outlineScale: 0.9,
            });
            part(g, cozyPalette.toffee, rr(20, -11, armLength - 20, 22, 11));
            line(
                g,
                cozyPalette.caramel,
                1.6,
                [
                    [
                        28,
                        -3,
                    ],
                    [
                        armLength - 12,
                        -3,
                    ],
                ],
                {
                    alpha: 0.5,
                },
            );
            line(
                g,
                cozyPalette.caramel,
                1.6,
                [
                    [
                        28,
                        4,
                    ],
                    [
                        armLength - 12,
                        4,
                    ],
                ],
                {
                    alpha: 0.5,
                },
            );
            shine(g, {
                x: armLength * 0.6,
                y: -6,
                rx: 9,
                ry: 2,
                strength: 0.7,
            });
        },
    );
    // The hub on top.
    scope(
        g,
        {
            y: labBaseY,
        },
        () => {
            part(g, cozyPalette.stone, circ(0, 0, 11));
            part(g, cozyPalette.sage, circ(0, 0, 4.2), {
                outlineScale: 0.5,
            });
        },
    );
}

const towerDrawers: Record<TowerType, (g: Graphics, pose: Readonly<TowerPose>) => void> = {
    [TowerType.Knife]: drawKnife,
    [TowerType.Boiler]: drawBoiler,
    [TowerType.Masher]: drawMasher,
    [TowerType.Microwave]: drawMicrowave,
    [TowerType.CricketTrap]: drawCricketTrap,
    [TowerType.Swiper]: drawSwiper,
};

/**
 * Clears `g` and draws the tower, centered on the origin, at game scale. The art is drawn at the
 * lab's size and shrunk by `towerArtConfig.scale` so the base roughly fills the tower circle.
 */
export function drawTower(g: Graphics, pose: Readonly<TowerPose>): void {
    g.clear();
    g.save();
    g.scaleTransform(towerArtConfig.scale, towerArtConfig.scale);
    g.translateTransform(0, -labBaseY);
    // Area effects and the Swiper arm are in world pixels, so they undo the art scale themselves.
    drawWithWorldOverlays(g, pose);
    g.restore();

    if (pose.towerType === TowerType.CricketTrap && pose.attack >= 0) {
        drawThrownCricket(g, pose);
    }
}

/** Draws the lab art, converting world-pixel overlays (rings, the cone) into the scaled space. */
function drawWithWorldOverlays(g: Graphics, pose: Readonly<TowerPose>) {
    const scale = towerArtConfig.scale;
    // The art functions treat `rangePx` and the aim as lab units, so convert from world pixels.
    towerDrawers[pose.towerType](g, {
        ...pose,
        rangePx: pose.rangePx / scale,
        aimX: pose.aimX / scale,
        aimY: pose.aimY / scale,
    });
}
