import {type ModExecuteParams} from '@antha/engine';
import {position2dParamsShape, type ViewCreation2d} from '@antha/entity-2d';
import {Graphics} from '@antha/graphics-2d';
import {assertWrap} from '@augment-vir/assert';
import {Circle} from 'detect-collisions';
import {defineShape, enumShape, intersectShape} from 'object-shape-tester';
import {Text, type Container} from 'pixi.js';
import {addSoftShadow} from '../art/cozy.js';
import {bossConfig} from '../config/boss-config.js';
import {doorConfig} from '../config/door-config.js';
import {chuteConfig, comboDisplayConfig, potatoSizeConfig} from '../config/game-config.js';
import {capQueuedDistance} from '../door/queue.js';
import {defineEntity} from '../game-state/game-entity.mod.js';
import {getDropScale, tickDropMs} from '../level/chute.js';
import {getPath, getPathLength, getPositionAlongPath} from '../level/level.js';
import {type PotatoToppings} from '../order/topping.js';
import {getPotatoToppings} from '../order/toppings.js';
import {type PotatoProcessing} from '../run/run-state.js';
import {servePotato} from '../run/serving.js';
import {getPlayerCount, getSlotColor} from '../run/slot-ranking.js';
import {type TowerType} from '../tower/tower-type.js';
import {getHitDamage, getHitMultiplier, getMashProgress} from './mash.js';
import {getPotatoMotion} from './potato-motion.js';
import {PotatoSize} from './potato-size.js';
import {defaultMeter, drawPotato, getRubberyStep} from './potato-view.js';

const shadowLabel = 'chute-shadow';

/** A potato walking along a path toward the restaurant. Served (and removed) when it arrives. */
export class PotatoEntity extends defineEntity({
    key: 'PotatoEntity',
    paramsShape: intersectShape(
        position2dParamsShape,
        defineShape({
            pathId: '',
            /** How far along the path it is. */
            distancePx: 0,
            /**
             * Ms left falling from a drop chute. While above 0 the potato sits at its chute, can't
             * be targeted, topped or stolen, and doesn't move along the belt.
             */
            dropInMs: 0,
            size: enumShape(PotatoSize),
            cut: false,
            cooked: false,
            mashHp: 0,
            maxMashHp: 1,
            /** True once served, so it is never served twice. */
            served: false,
            /** True while a seagull holds it: it stops moving, can't be served, towers skip it. */
            carriedBySeagull: false,
            /** 0 to 100. Shortcuts (Microwave) and waiting under the heat lamp lower it. */
            quality: 100,
            /** How many times customers have sent this potato back to the start of the belt. */
            timesSentBack: 0,
            /** `runState.elapsedMs` of the last Swiper hit, or -1. Used to debounce the Swiper. */
            lastSwipedAtMs: -1,
            /** Ms spent in the pass zone; the heat lamp only hurts after a grace period. */
            passWaitMs: 0,
            /** Unique per run (from `runState.nextPotatoId`), so commands can name this potato. */
            potatoId: 0,
            /** Hand-applied toppings. Keys match `Topping` values. */
            butter: false,
            scallions: false,
            cabbage: false,
            gravy: false,
            /** The latest hit, for the floating damage number. Presentation only. */
            lastHitDamage: 0,
            /** Cut x soft multiplier applied by the latest hit (1 = none). */
            lastHitMultiplier: 1,
            /** `runState.elapsedMs` of the latest hit, or -1. */
            lastHitAtMs: -1,
            lastHitTowerType: '',
        }),
    ),
    paramsMap: {
        hitbox: {
            x: true,
            y: true,
        },
        view: {
            x: true,
            y: true,
        },
    },
}) {
    /** Which look is currently drawn, so we only redraw when it changes. */
    protected drawnKey = '';

    /** The floating hit number, created on the first hit. */
    protected hitText: Text | undefined;

    public override createView(): ViewCreation2d {
        this.drawnKey = this.getLookKey();
        const radius = this.getRadius();
        const view = drawPotato({
            graphics: new Graphics(),
            processing: this.getProcessing(),
            radius,
            toppings: this.getToppings(),
            quality: this.params.quality,
            meter: this.getMeter(),
            crown: this.params.size === PotatoSize.King,
            seed: this.params.potatoId,
        });
        addSoftShadow(view, {
            width: radius * 2.4,
            height: radius * 0.9,
            offsetY: radius * 0.8,
        });
        if (getPlayerCount(this.state.runState) > 1) {
            const path = getPath(this.state.level, this.params.pathId);
            const marker = new Graphics();
            marker.ellipse(0, radius * 0.8, radius * 1.1, radius * 0.4).fill({
                color: getSlotColor(path.ownerSlot),
            });
            view.addChildAt(marker, 0);
        }
        const shadow = new Graphics({
            label: shadowLabel,
        });
        shadow.ellipse(0, radius * 0.5, radius * 1.1, radius * 0.5).fill({
            color: '#000000',
        });
        shadow.visible = this.params.dropInMs > 0;
        view.addChildAt(shadow, 0);
        if (this.params.dropInMs > 0) {
            this.drawFalling(view);
        }

        return {
            hitbox: new Circle(
                {
                    x: 0,
                    y: 0,
                },
                this.getRadius(),
            ),
            view,
        };
    }

    /**
     * Records the hit about to be applied (call before `applyTowerHit`, which changes the state the
     * multiplier depends on). With `minIntervalMs`, a hit within that time of the last one is
     * skipped, so continuous towers don't spam numbers.
     */
    public recordHit({
        towerType,
        tower,
        minIntervalMs = 0,
    }: Readonly<{
        towerType: TowerType;
        tower: Readonly<{level?: number; wear?: number}>;
        minIntervalMs?: number;
    }>) {
        const now = this.state.runState.elapsedMs;
        if (this.params.lastHitAtMs >= 0 && now - this.params.lastHitAtMs < minIntervalMs) {
            return;
        }
        const processing = this.getProcessing();
        this.params.lastHitDamage = Math.round(getHitDamage(processing, towerType, tower));
        this.params.lastHitMultiplier = getHitMultiplier(processing, towerType);
        this.params.lastHitAtMs = now;
        this.params.lastHitTowerType = towerType;
    }

    /** Shows the floating hit number for `comboDisplayConfig.hitNumberMs` after the latest hit. */
    protected updateHitNumber() {
        const age = this.state.runState.elapsedMs - this.params.lastHitAtMs;
        if (this.params.lastHitAtMs < 0 || age < 0 || age >= comboDisplayConfig.hitNumberMs) {
            if (this.hitText) {
                this.hitText.visible = false;
            }
            return;
        }
        const tier =
            comboDisplayConfig.tiers.find(
                (candidate) => this.params.lastHitMultiplier >= candidate.minMultiplier,
            ) ?? comboDisplayConfig.tiers[comboDisplayConfig.tiers.length - 1];
        if (!tier) {
            return;
        }
        const text =
            this.hitText ??
            new Text({
                text: '',
                style: {
                    fill: '#ffffff',
                    fontSize: 20,
                    fontWeight: 'bold',
                    stroke: {
                        color: '#000000',
                        width: 4,
                    },
                },
            });
        if (!this.hitText) {
            text.anchor.set(0.5);
            this.hitText = text;
            this.view.addChild(text);
        }
        const progress = age / comboDisplayConfig.hitNumberMs;
        text.visible = true;
        text.text = `-${this.params.lastHitDamage}${tier.suffix}`;
        text.style.fill = tier.color;
        text.style.fontSize = tier.fontSize;
        text.alpha = 1 - progress;
        text.position.set(
            0,
            -this.getRadius() - 40 - comboDisplayConfig.hitNumberRisePx * progress,
        );
        text.scale.set(tier.pop ? 1 + 0.5 * Math.max(0, 1 - progress * 5) : 1);
    }

    /** Scales the potato down from the chute and fades its shadow in as it lands. */
    protected drawFalling(view: Container) {
        const {dropInMs} = this.params;
        const scale = getDropScale({
            dropInMs,
            dropMs: chuteConfig.dropMs,
            startScale: chuteConfig.startScale,
        });
        const shadow = view.getChildByLabel(shadowLabel);
        view.scale.set(scale);
        if (shadow) {
            shadow.scale.set(1 / scale);
            shadow.visible = dropInMs > 0;
            shadow.alpha = 0.6 * (1 - (scale - 1) / (chuteConfig.startScale - 1));
        }
    }

    protected getRadius(): number {
        return potatoSizeConfig[this.params.size].radius;
    }

    /** The processing state held in the params. */
    public getProcessing(): PotatoProcessing {
        const {cut, cooked, mashHp, maxMashHp} = this.params;
        return {
            cut,
            cooked,
            mashHp,
            maxMashHp,
        };
    }

    /** The hand-applied toppings held in the params. */
    public getToppings(): PotatoToppings {
        return getPotatoToppings(this.params);
    }

    protected getLookKey(): string {
        const progress = getMashProgress(this.getProcessing());
        const {butter, scallions, cabbage, gravy} = this.params;
        return `${this.params.cut}${this.params.cooked}${Math.round(progress * 20)}${butter}${scallions}${cabbage}${gravy}${getRubberyStep(this.params.quality)}`;
    }

    protected redrawIfChanged() {
        const key = this.getLookKey();
        if (key === this.drawnKey) {
            return;
        }
        this.drawnKey = key;
        drawPotato({
            graphics: assertWrap.instanceOf(this.view, Graphics),
            processing: this.getProcessing(),
            radius: this.getRadius(),
            toppings: this.getToppings(),
            quality: this.params.quality,
            meter: this.getMeter(),
            crown: this.params.size === PotatoSize.King,
            seed: this.params.potatoId,
        });
    }

    /** Bosses get a bigger mash meter. */
    protected getMeter() {
        return this.params.size === PotatoSize.King ? bossConfig.meter : defaultMeter;
    }

    public override update({msSinceLastExecute}: Readonly<ModExecuteParams>) {
        this.updateHitNumber();
        // A carried potato stays put: the gull sets x/y, and `distancePx` doesn't change, so a
        // dropped potato snaps back to its belt spot.
        if (this.params.served || this.params.carriedBySeagull) {
            return;
        } else if (this.params.dropInMs > 0) {
            this.params.dropInMs = tickDropMs({
                dropInMs: this.params.dropInMs,
                msSinceLastExecute,
            });
            this.drawFalling(this.view);
            return;
        }

        const path = getPath(this.state.level, this.params.pathId);
        const aheadDistances: number[] = [];
        for (const other of this.state.entityStore.getEntities(PotatoEntity)) {
            if (
                other !== this &&
                other.params.pathId === this.params.pathId &&
                !other.params.carriedBySeagull &&
                !other.params.served &&
                other.params.dropInMs <= 0 &&
                other.params.distancePx > this.params.distancePx
            ) {
                aheadDistances.push(other.params.distancePx);
            }
        }
        // Potatoes queue behind the one ahead and wait at the counter for the waiter (`PassEntity`).
        // Never move backwards: a freshly sent-back potato may start closer than the spacing.
        this.params.distancePx = Math.max(
            this.params.distancePx,
            capQueuedDistance({
                next:
                    this.params.distancePx +
                    this.state.runState.beltSpeedPxPerMs * msSinceLastExecute,
                aheadDistances,
                spacingPx: doorConfig.queueSpacingPx,
                endPx: getPathLength(path),
            }),
        );

        this.moveToDistance();
        this.redrawIfChanged();
        this.applyMotion();
    }

    /** Render-only wobble, bob and hit squash while riding the belt. */
    protected applyMotion() {
        const radius = this.getRadius();
        const motion = getPotatoMotion({
            elapsedMs: this.state.runState.elapsedMs,
            potatoId: this.params.potatoId,
            radius,
            lastHitAtMs: this.params.lastHitAtMs,
        });
        this.view.rotation = motion.rotation;
        this.view.scale.set(motion.scaleX, motion.scaleY);
        this.view.pivot.set(0, -motion.offsetY);
    }

    protected moveToDistance() {
        const path = getPath(this.state.level, this.params.pathId);
        const position = getPositionAlongPath(path, this.params.distancePx);
        this.params.x = position.x;
        this.params.y = position.y;
    }

    /**
     * The waiter takes this potato to the customers. A bad one may be sent back to the start of the
     * belt (keeping its processing and toppings); otherwise it is served and removed.
     */
    public serveAtCounter() {
        const path = getPath(this.state.level, this.params.pathId);
        const {sentBack} = servePotato(this.state.runState, {
            processing: this.getProcessing(),
            ownerSlot: path.ownerSlot,
            value: potatoSizeConfig[this.params.size].value,
            toppings: this.getToppings(),
            timesSentBack: this.params.timesSentBack,
            quality: this.params.quality,
            penaltyMultiplier:
                this.params.size === PotatoSize.King ? bossConfig.penaltyMultiplier : 1,
        });

        if (sentBack) {
            this.params.distancePx = 0;
            this.params.passWaitMs = 0;
            this.params.timesSentBack += 1;
            this.moveToDistance();
        } else {
            this.params.served = true;
            this.destroy();
        }
    }
}
