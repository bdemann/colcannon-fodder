import {type ModExecuteParams} from '@antha/engine';
import {position2dParamsShape, type ViewCreation2d} from '@antha/entity-2d';
import {Graphics} from '@antha/graphics-2d';
import {assertWrap} from '@augment-vir/assert';
import {Circle} from 'detect-collisions';
import {defineShape, enumShape, intersectShape} from 'object-shape-tester';
import {doorConfig} from '../config/door-config.js';
import {potatoSizeConfig} from '../config/game-config.js';
import {capQueuedDistance} from '../door/queue.js';
import {defineEntity} from '../game-state/game-entity.mod.js';
import {getPath, getPathLength, getPositionAlongPath} from '../level/level.js';
import {type PotatoToppings} from '../order/topping.js';
import {getPotatoToppings} from '../order/toppings.js';
import {type PotatoProcessing} from '../run/run-state.js';
import {servePotato} from '../run/serving.js';
import {getMashProgress} from './mash.js';
import {PotatoSize} from './potato-size.js';
import {drawPotato} from './potato-view.js';

/** A potato walking along a path toward the restaurant. Served (and removed) when it arrives. */
export class PotatoEntity extends defineEntity({
    key: 'PotatoEntity',
    paramsShape: intersectShape(
        position2dParamsShape,
        defineShape({
            pathId: '',
            /** How far along the path it is. */
            distancePx: 0,
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
            /**
             * `runState.elapsedMs` of the last Swiper hit, or -1. A Swiper skips recently swiped
             * potatoes.
             */
            lastSwipedAtMs: -1,
            /** Unique per run (from `runState.nextPotatoId`), so commands can name this potato. */
            potatoId: 0,
            /** Hand-applied toppings. Keys match `Topping` values. */
            butter: false,
            scallions: false,
            cabbage: false,
            gravy: false,
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

    public override createView(): ViewCreation2d {
        this.drawnKey = this.getLookKey();

        return {
            hitbox: new Circle(
                {
                    x: 0,
                    y: 0,
                },
                this.getRadius(),
            ),
            view: drawPotato({
                graphics: new Graphics(),
                processing: this.getProcessing(),
                radius: this.getRadius(),
                toppings: this.getToppings(),
            }),
        };
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
        return `${this.params.cut}${this.params.cooked}${Math.round(progress * 20)}${butter}${scallions}${cabbage}${gravy}`;
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
        });
    }

    public override update({msSinceLastExecute}: Readonly<ModExecuteParams>) {
        // A carried potato stays put: the gull sets x/y, and `distancePx` doesn't change, so a
        // dropped potato snaps back to its belt spot.
        if (this.params.served || this.params.carriedBySeagull) {
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
        });

        if (sentBack) {
            this.params.distancePx = 0;
            this.params.timesSentBack += 1;
            this.moveToDistance();
        } else {
            this.params.served = true;
            this.destroy();
        }
    }
}
