import {type ModExecuteParams} from '@antha/engine';
import {position2dParamsShape, type ViewCreation2d} from '@antha/entity-2d';
import {Graphics} from '@antha/graphics-2d';
import {assertWrap} from '@augment-vir/assert';
import {Circle} from 'detect-collisions';
import {defineShape, enumShape, intersectShape} from 'object-shape-tester';
import {potatoSizeConfig} from '../config/game-config.js';
import {defineEntity} from '../game-state/game-entity.mod.js';
import {getPath, getPathLength, getPositionAlongPath} from '../level/level.js';
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
            view: drawPotato(new Graphics(), this.getProcessing(), this.getRadius()),
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

    protected getLookKey(): string {
        const progress = getMashProgress(this.getProcessing());
        return `${this.params.cut}${this.params.cooked}${Math.round(progress * 20)}`;
    }

    protected redrawIfChanged() {
        const key = this.getLookKey();
        if (key === this.drawnKey) {
            return;
        }
        this.drawnKey = key;
        drawPotato(
            assertWrap.instanceOf(this.view, Graphics),
            this.getProcessing(),
            this.getRadius(),
        );
    }

    public override update({msSinceLastExecute}: Readonly<ModExecuteParams>) {
        if (this.params.served) {
            return;
        }

        this.params.distancePx += this.state.runState.beltSpeedPxPerMs * msSinceLastExecute;

        const path = getPath(this.state.level, this.params.pathId);
        const position = getPositionAlongPath(path, this.params.distancePx);
        this.params.x = position.x;
        this.params.y = position.y;

        if (this.params.distancePx >= getPathLength(path)) {
            this.params.served = true;
            servePotato(this.state.runState, {
                processing: this.getProcessing(),
                ownerSlot: path.ownerSlot,
                value: potatoSizeConfig[this.params.size].value,
                toppings: getPotatoToppings(this.params),
            });
            this.destroy();
            return;
        }

        this.redrawIfChanged();
    }
}
