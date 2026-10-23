import {type ModExecuteParams} from '@antha/engine';
import {position2dParamsShape, type ViewCreation2d} from '@antha/entity-2d';
import {Graphics} from '@antha/graphics-2d';
import {defineShape, intersectShape} from 'object-shape-tester';
import {Container} from 'pixi.js';
import {playSfx, Sfx} from '../audio/sfx.js';
import {seagullConfig} from '../config/game-config.js';
import {defineEntity} from '../game-state/game-entity.mod.js';
import {PotatoEntity} from '../potato/potato.entity.js';
import {RunStatus} from '../run/run-state.js';
import {stealPotato} from '../run/serving.js';
import {nearestEdgePoint, stepToward} from './seagull-logic.js';

const bodyWidthPx = 22;
const bodyHeightPx = 13;
/** How far below a flying gull its shadow falls. */
const shadowOffsetPx = 30;
const wingFlapPeriodMs = 90;

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
    protected wings: Graphics | undefined;
    protected hpBar: Graphics | undefined;
    /** Last values seen by `render`, so each grab squawks once and the gull faces its heading. */
    protected lastSeenCarryingId = 0;
    protected lastSeenX: number | undefined;

    public override createView(): ViewCreation2d {
        const view = new Container();
        const flipper = new Container();
        const {flying} = this.params;

        if (flying) {
            view.addChild(
                new Graphics()
                    .ellipse(0, shadowOffsetPx, bodyWidthPx * 1.2, bodyHeightPx * 0.7)
                    .fill({
                        color: '#000000',
                        alpha: 0.25,
                    }),
            );
        } else {
            flipper.addChild(
                new Graphics()
                    .moveTo(-5, bodyHeightPx - 4)
                    .lineTo(-5, bodyHeightPx + 9)
                    .moveTo(5, bodyHeightPx - 4)
                    .lineTo(5, bodyHeightPx + 9)
                    .stroke({
                        color: '#ff9800',
                        width: 3,
                    }),
            );
        }

        const wings = new Graphics()
            .ellipse(-2, -bodyHeightPx, 7, 14)
            .fill({
                color: '#9aa3ab',
            })
            .ellipse(-2, bodyHeightPx, 7, 14)
            .fill({
                color: '#9aa3ab',
            });
        flipper.addChild(wings);
        flipper.addChild(
            new Graphics().ellipse(0, 0, bodyWidthPx, bodyHeightPx).fill({
                color: '#ffffff',
            }),
        );
        flipper.addChild(
            new Graphics()
                .poly([
                    bodyWidthPx - 4,
                    -4,
                    bodyWidthPx + 9,
                    1,
                    bodyWidthPx - 4,
                    5,
                ])
                .fill({
                    color: '#ff9800',
                }),
        );
        flipper.addChild(
            new Graphics().circle(bodyWidthPx - 8, -3, 2.5).fill({
                color: '#000000',
            }),
        );
        view.addChild(flipper);

        const hpBar = new Graphics();
        view.addChild(hpBar);

        this.flipper = flipper;
        this.wings = wings;
        this.hpBar = hpBar;

        return {
            view,
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
                claimed.has(potato.params.potatoId)
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
        }
        this.state.runState.coins += seagullConfig.bountyCoins;
        this.destroy();
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
            if (!target || target.params.served || target.params.carriedBySeagull) {
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

    /** Flaps the wings, faces the gull along its heading, squawks on grab. Presentation only. */
    public override render() {
        const {flipper, wings, hpBar} = this;
        if (!flipper || !wings || !hpBar) {
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

        wings.scale.y = flying
            ? 0.6 + 0.4 * Math.abs(Math.sin(this.state.runState.elapsedMs / wingFlapPeriodMs))
            : 0.6;

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
