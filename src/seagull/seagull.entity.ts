import {type ModExecuteParams} from '@antha/engine';
import {position2dParamsShape, type ViewCreation2d} from '@antha/entity-2d';
import {Graphics} from '@antha/graphics-2d';
import {assertWrap} from '@augment-vir/assert';
import {defineShape, intersectShape} from 'object-shape-tester';
import {Container} from 'pixi.js';
import {
    addSoftShadow,
    cozyPalette,
    drawCozyLine,
    drawCozyShape,
    ellipsePath,
    polyPath,
    roundRectPath,
    type CozyPath,
} from '../art/cozy.js';
import {playSfx, Sfx} from '../audio/sfx.js';
import {seagullConfig} from '../config/game-config.js';
import {defineEntity} from '../game-state/game-entity.mod.js';
import {PotatoSize} from '../potato/potato-size.js';
import {PotatoEntity} from '../potato/potato.entity.js';
import {addCoins} from '../run/coins.js';
import {RunStatus} from '../run/run-state.js';
import {stealPotato} from '../run/serving.js';
import {nearestEdgePoint, stepToward} from './seagull-logic.js';

const bodyHeightPx = 13;
/** Wing flap and waddle speeds, in radians of animation phase per second. */
const flapRadPerSec = 11;
const waddleRadPerSec = 7;
/** How far below the gull the carried potato hangs. */
const carriedPotatoDropPx = 36;
const gullShadow = {
    flying: {
        width: 64,
        height: 18,
        offsetY: 44,
    },
    walking: {
        width: 56,
        height: 14,
        offsetY: 24,
    },
} as const;

/** A wing swept back from the body. `side` is -1 for the upper wing and 1 for the lower one. */
function wingPath({extend, side}: Readonly<{extend: number; side: number}>): CozyPath {
    function y(value: number) {
        return side * value * extend;
    }

    return (graphics) => {
        graphics
            .moveTo(9, side * 3)
            .bezierCurveTo(9, y(22), 0, y(34), -9, y(38))
            .lineTo(-15, y(33))
            .quadraticCurveTo(-14, y(26), -21, y(26))
            .quadraticCurveTo(-17, y(19), -24, y(17))
            .quadraticCurveTo(-18, y(10), -19, side * 4)
            .closePath();
    };
}

/** The dark feathered tip of a wing. */
function wingTipPath({extend, side}: Readonly<{extend: number; side: number}>): CozyPath {
    function y(value: number) {
        return side * value * extend;
    }

    return (graphics) => {
        graphics
            .moveTo(-1, y(31))
            .lineTo(-9, y(38))
            .lineTo(-15, y(33))
            .quadraticCurveTo(-14, y(26), -21, y(26))
            .lineTo(-8, y(26))
            .closePath();
    };
}

/** A straight line path between two points. */
function linePath({
    fromX,
    fromY,
    toX,
    toY,
}: Readonly<{fromX: number; fromY: number; toX: number; toY: number}>): CozyPath {
    return (graphics) => {
        graphics.moveTo(fromX, fromY).lineTo(toX, toY);
    };
}

/** A small white sheen dab. */
function drawShine(graphics: Graphics, {x, y}: Readonly<{x: number; y: number}>) {
    drawCozyShape(graphics, {
        path: ellipsePath({
            x,
            y,
            rx: 5,
            ry: 2,
        }),
        fill: '#ffffff',
        alpha: 0.5,
        outline: false,
        highlight: false,
    });
}

/** What a gull is doing: heading for a potato, or running for the nearest edge. */
export const seagullPhases = {
    approach: 'approach',
    escape: 'escape',
} as const;

/**
 * A seagull that grabs a potato off the belt and carries it to the nearest world edge. Towers can
 * knock it out with `takeHit`, which drops the potato back onto the belt.
 */
export class SeagullEntity extends defineEntity({
    key: 'SeagullEntity',
    paramsShape: intersectShape(
        position2dParamsShape,
        defineShape({
            flying: false,
            hp: 0,
            /** `'approach'` or `'escape'`. */
            phase: '',
            /** `potatoId` of the potato being chased; 0 = none. */
            targetPotatoId: 0,
            /** `potatoId` of the potato being carried; 0 = none. */
            carryingPotatoId: 0,
            /** Where the gull is running to, fixed at the moment it grabbed (or gave up). */
            escapeX: 0,
            escapeY: 0,
            /** Ate a cricket from a Cricket Trap: ignored by towers, never grabs potatoes. */
            fed: false,
        }),
    ),
    paramsMap: {
        view: {
            x: true,
            y: true,
        },
    },
}) {
    /** Presentation-only handles, set in `createView`. */
    protected flipper: Container | undefined;
    protected art: Graphics | undefined;
    protected shadow: Graphics | undefined;
    protected hpBar: Graphics | undefined;
    /** Last values seen by `render`, so each grab squawks once and the gull faces its heading. */
    protected lastSeenCarryingId = 0;
    protected lastSeenX: number | undefined;

    public override createView(): ViewCreation2d {
        const view = new Container();
        const flipper = new Container();
        const shadowSize = this.params.flying ? gullShadow.flying : gullShadow.walking;
        const shadow = addSoftShadow(view, shadowSize);
        shadow.pivot.y = shadowSize.offsetY;
        shadow.y = shadowSize.offsetY;

        const art = new Graphics();
        flipper.addChild(art);
        view.addChild(flipper);

        const hpBar = new Graphics();
        view.addChild(hpBar);

        this.flipper = flipper;
        this.art = art;
        this.shadow = shadow;
        this.hpBar = hpBar;

        return {
            view,
        };
    }

    /** Redraws the gull for this instant: wings, waddling or hanging legs, blink, cricket. */
    protected drawGull(): {bob: number; rotation: number; phase: number; flapAmount: number} {
        const art = assertWrap.isDefined(this.art);
        const {flying, fed, carryingPotatoId} = this.params;
        const seconds = this.state.runState.elapsedMs / 1000;
        const phase = seconds * (flying ? flapRadPerSec : waddleRadPerSec);
        const flapAmount = flying ? 0.25 + 0.75 * Math.abs(Math.sin(phase)) : 0;
        const bob = flying ? -Math.sin(phase) * 2.5 : -Math.abs(Math.sin(phase)) * 2.5;
        const rotation = flying ? Math.sin(phase) * 0.03 : Math.sin(phase) * 0.12;
        const legColor = cozyPalette.pumpkin;

        art.clear();

        if (carryingPotatoId !== 0) {
            for (const x of [
                -4,
                5,
            ]) {
                drawCozyLine(art, {
                    path: linePath({
                        fromX: x,
                        fromY: 8,
                        toX: x * 0.8 + 4,
                        toY: 20,
                    }),
                    color: legColor,
                    width: 2.6,
                    outline: true,
                });
            }
            drawCozyLine(art, {
                path: linePath({
                    fromX: 0,
                    fromY: 12,
                    toX: 0,
                    toY: 28,
                }),
                color: legColor,
                width: 2.4,
                outline: true,
            });
        } else if (flying) {
            drawCozyLine(art, {
                path: linePath({
                    fromX: -4,
                    fromY: 9,
                    toX: -9,
                    toY: 14,
                }),
                color: legColor,
                width: 2.4,
                outline: true,
            });
            drawCozyLine(art, {
                path: linePath({
                    fromX: 4,
                    fromY: 9,
                    toX: -4,
                    toY: 15,
                }),
                color: legColor,
                width: 2.4,
                outline: true,
            });
        } else {
            for (const [
                index,
                x,
            ] of [
                [
                    0,
                    -5,
                ],
                [
                    1,
                    5,
                ],
            ] as const) {
                const swing = Math.sin(phase + index * Math.PI) * 4;
                const lift = Math.max(0, Math.cos(phase + index * Math.PI)) * 3;
                const footX = x + swing * 0.5;
                drawCozyLine(art, {
                    path: linePath({
                        fromX: x,
                        fromY: 7,
                        toX: footX,
                        toY: 19 - lift,
                    }),
                    color: legColor,
                    width: 3,
                    outline: true,
                });
                drawCozyShape(art, {
                    path: polyPath([
                        [
                            footX - 1,
                            19 - lift,
                        ],
                        [
                            footX + 9,
                            20 - lift,
                        ],
                        [
                            footX - 2,
                            22 - lift,
                        ],
                    ]),
                    fill: legColor,
                    outlineScale: 0.5,
                });
            }
        }

        if (flying) {
            for (const side of [
                -1,
                1,
            ]) {
                const extend = Math.max(0.1, flapAmount);
                drawCozyShape(art, {
                    path: wingPath({
                        extend,
                        side,
                    }),
                    fill: cozyPalette.sage,
                    outlineScale: 0.8,
                });
                drawCozyShape(art, {
                    path: wingTipPath({
                        extend,
                        side,
                    }),
                    fill: cozyPalette.walnut,
                    outline: false,
                    highlight: false,
                });
            }
        }

        // Tail.
        drawCozyShape(art, {
            path: polyPath([
                [
                    -16,
                    -5,
                ],
                [
                    -33,
                    -3,
                ],
                [
                    -34,
                    3,
                ],
                [
                    -16,
                    6,
                ],
            ]),
            fill: cozyPalette.sage,
            outlineScale: 0.8,
        });
        drawCozyShape(art, {
            path: roundRectPath({
                x: -34,
                y: -3,
                width: 4,
                height: 6,
                radius: 1,
            }),
            fill: cozyPalette.walnut,
            outline: false,
            highlight: false,
        });

        // Body and head.
        drawCozyShape(art, {
            path: ellipsePath({
                x: 0,
                y: 0,
                rx: 22,
                ry: bodyHeightPx,
            }),
            fill: cozyPalette.cream,
        });
        drawCozyShape(art, {
            path: ellipsePath({
                x: 14,
                y: -5,
                rx: 9,
                ry: 9,
            }),
            fill: cozyPalette.cream,
        });
        drawCozyShape(art, {
            path: ellipsePath({
                x: 6,
                y: -1,
                rx: 14,
                ry: 10,
            }),
            fill: cozyPalette.cream,
            outline: false,
            highlight: false,
        });
        drawShine(art, {
            x: -4,
            y: -7,
        });

        if (!flying) {
            // Folded wing on the flank.
            drawCozyShape(art, {
                path(graphics) {
                    graphics
                        .moveTo(8, -3)
                        .bezierCurveTo(0, -9, -14, -8, -27, -2)
                        .lineTo(-19, 5)
                        .bezierCurveTo(-8, 8, 2, 6, 8, -3)
                        .closePath();
                },
                fill: cozyPalette.sage,
                outlineScale: 0.9,
            });
            drawCozyShape(art, {
                path: polyPath([
                    [
                        -27,
                        -2,
                    ],
                    [
                        -19,
                        5,
                    ],
                    [
                        -14,
                        1,
                    ],
                    [
                        -20,
                        -3,
                    ],
                ]),
                fill: cozyPalette.walnut,
                outline: false,
                highlight: false,
            });
        }

        // Beak and eye.
        drawCozyShape(art, {
            path: polyPath([
                [
                    21,
                    -8,
                ],
                [
                    34,
                    -4,
                ],
                [
                    21,
                    -1,
                ],
            ]),
            fill: cozyPalette.pumpkin,
            outlineScale: 0.85,
        });
        drawCozyShape(art, {
            path: ellipsePath({
                x: 27,
                y: -3.2,
                rx: 1.3,
                ry: 1.3,
            }),
            fill: cozyPalette.tomato,
            outline: false,
            highlight: false,
        });
        if (seconds % 3.1 < 0.1) {
            drawCozyLine(art, {
                path: linePath({
                    fromX: 14,
                    fromY: -8,
                    toX: 19,
                    toY: -8,
                }),
                color: cozyPalette.bark,
                width: 1.5,
            });
        } else {
            drawCozyShape(art, {
                path: ellipsePath({
                    x: 17,
                    y: -8,
                    rx: 2.5,
                    ry: 2.5,
                }),
                fill: cozyPalette.bark,
                outline: false,
                highlight: false,
            });
            drawCozyShape(art, {
                path: ellipsePath({
                    x: 17.8,
                    y: -8.8,
                    rx: 0.9,
                    ry: 0.9,
                }),
                fill: '#ffffff',
                outline: false,
                highlight: false,
            });
        }

        if (fed) {
            // The cricket held in the beak.
            drawCozyLine(art, {
                path: linePath({
                    fromX: 36,
                    fromY: -3,
                    toX: 40,
                    toY: 0,
                }),
                color: cozyPalette.pine,
                width: 1.2,
            });
            drawCozyShape(art, {
                path: ellipsePath({
                    x: 36,
                    y: -3,
                    rx: 5,
                    ry: 2.5,
                }),
                fill: cozyPalette.moss,
                outlineScale: 0.5,
            });
        }

        return {
            bob,
            rotation,
            phase,
            flapAmount,
        };
    }

    /** The potato with this id, if it is still on the field. */
    protected findPotato(potatoId: number): PotatoEntity | undefined {
        if (potatoId === 0) {
            return undefined;
        }
        for (const potato of this.state.entityStore.getEntities(PotatoEntity)) {
            if (potato.params.potatoId === potatoId) {
                return potato;
            }
        }

        return undefined;
    }

    /**
     * The unserved potato that is not carried furthest along its path that no other gull is
     * chasing.
     */
    protected pickNewTarget(): PotatoEntity | undefined {
        const claimed = new Set<number>();
        for (const gull of this.state.entityStore.getEntities(SeagullEntity)) {
            if (gull !== this && gull.params.phase === seagullPhases.approach) {
                claimed.add(gull.params.targetPotatoId);
            }
        }

        let best: PotatoEntity | undefined;
        for (const potato of this.state.entityStore.getEntities(PotatoEntity)) {
            if (
                potato.params.served ||
                potato.params.carriedBySeagull ||
                claimed.has(potato.params.potatoId) ||
                potato.params.dropInMs > 0 ||
                potato.params.size === PotatoSize.King
            ) {
                continue;
            }
            if (!best || potato.params.distancePx > best.params.distancePx) {
                best = potato;
            }
        }

        return best;
    }

    protected startEscape() {
        const edge = nearestEdgePoint(this.params);
        this.params.phase = seagullPhases.escape;
        this.params.escapeX = edge.x;
        this.params.escapeY = edge.y;
    }

    /** Knocks the gull down. A carried potato drops back to its belt spot; the killer earns coins. */
    public takeHit(damage: number) {
        if (this.params.hp <= 0) {
            return;
        }
        this.params.hp -= damage;
        if (this.params.hp > 0) {
            return;
        }

        const carried = this.findPotato(this.params.carryingPotatoId);
        if (carried) {
            carried.params.carriedBySeagull = false;
            carried.view.pivot.set(0, 0);
        }
        addCoins(this.state.runState, {
            amount: seagullConfig.bountyCoins,
            reason: 'Seagull bonk',
            x: this.params.x,
            y: this.params.y,
        });
        this.destroy();
    }

    /**
     * Eats a cricket: drops any carried potato back on the belt, then leaves for the nearest edge
     * with no satisfaction penalty. Pays the bounty.
     */
    public feedCricket() {
        if (this.params.hp <= 0 || this.params.fed) {
            return;
        }
        const carried = this.findPotato(this.params.carryingPotatoId);
        if (carried) {
            carried.params.carriedBySeagull = false;
            carried.view.pivot.set(0, 0);
        }
        this.params.fed = true;
        this.params.carryingPotatoId = 0;
        this.params.targetPotatoId = 0;
        this.startEscape();
        addCoins(this.state.runState, {
            amount: seagullConfig.bountyCoins,
            reason: 'Seagull fed',
            x: this.params.x,
            y: this.params.y,
        });
    }

    public override update({msSinceLastExecute}: Readonly<ModExecuteParams>) {
        if (this.params.hp <= 0) {
            return;
        }
        const speed = this.params.flying
            ? seagullConfig.flySpeedPxPerMs
            : seagullConfig.walkSpeedPxPerMs;
        const stepPx = speed * msSinceLastExecute;

        if (this.params.phase === seagullPhases.approach) {
            let target = this.findPotato(this.params.targetPotatoId);
            if (
                !target ||
                target.params.served ||
                target.params.carriedBySeagull ||
                target.params.dropInMs > 0
            ) {
                target = this.pickNewTarget();
                this.params.targetPotatoId = target?.params.potatoId ?? 0;
            }
            if (!target) {
                this.startEscape();
                return;
            }

            const next = stepToward({
                from: this.params,
                to: target.params,
                stepPx,
            });
            this.params.x = next.x;
            this.params.y = next.y;
            if (
                Math.hypot(target.params.x - next.x, target.params.y - next.y) <=
                seagullConfig.grabRadiusPx
            ) {
                target.params.carriedBySeagull = true;
                this.params.carryingPotatoId = target.params.potatoId;
                this.startEscape();
            }
            return;
        }

        const next = stepToward({
            from: this.params,
            to: {
                x: this.params.escapeX,
                y: this.params.escapeY,
            },
            stepPx,
        });
        this.params.x = next.x;
        this.params.y = next.y;
        const carried = this.findPotato(this.params.carryingPotatoId);
        if (carried) {
            carried.params.x = next.x;
            carried.params.y = next.y;
        }

        if (next.x === this.params.escapeX && next.y === this.params.escapeY) {
            if (carried) {
                carried.destroy();
                stealPotato(this.state.runState);
            }
            this.destroy();
        }
    }

    /** Animates the gull, faces it along its heading, squawks on grab. Presentation only. */
    public override render() {
        const {flipper, hpBar, shadow} = this;
        if (!flipper || !hpBar || !shadow) {
            return;
        }
        const {x, carryingPotatoId, flying, hp} = this.params;

        if (
            carryingPotatoId !== 0 &&
            this.lastSeenCarryingId === 0 &&
            this.state.runState.status === RunStatus.Playing
        ) {
            playSfx(Sfx.Squawk);
        }
        this.lastSeenCarryingId = carryingPotatoId;

        if (this.lastSeenX != undefined && x !== this.lastSeenX) {
            flipper.scale.x = x > this.lastSeenX ? 1 : -1;
        }
        this.lastSeenX = x;

        const {bob, rotation, phase, flapAmount} = this.drawGull();
        flipper.y = bob;
        flipper.rotation = rotation;
        if (flying) {
            // The shadow breathes with the flap: bigger and lighter when the wings are up.
            shadow.scale.set(1 + 0.2 * flapAmount);
            shadow.alpha = 0.75 - 0.25 * flapAmount;
        }

        // The carried potato hangs from the feet and swings a little. The pivot shifts only what is
        // drawn: the potato's own position still follows the gull, and the `x`/`y` view sync can't
        // undo it.
        const carried = this.findPotato(carryingPotatoId);
        if (carried) {
            carried.view.pivot.set(
                -(flipper.scale.x * 2 + Math.sin(phase * 0.5) * 4),
                -(bob + carriedPotatoDropPx),
            );
        }

        hpBar.clear();
        if (hp < seagullConfig.hp) {
            const barWidth = 40;
            const barY = -bodyHeightPx - 26;
            hpBar.rect(-barWidth / 2, barY, barWidth, 6).fill({
                color: 'rgba(0,0,0,0.6)',
            });
            hpBar
                .rect(-barWidth / 2, barY, (barWidth * Math.max(0, hp)) / seagullConfig.hp, 6)
                .fill({
                    color: '#e53935',
                });
        }
    }
}
