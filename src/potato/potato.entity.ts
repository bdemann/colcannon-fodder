import {type ModExecuteParams} from '@antha/engine';
import {position2dParamsShape, type ViewCreation2d} from '@antha/entity-2d';
import {Graphics} from '@antha/graphics-2d';
import {assertWrap} from '@augment-vir/assert';
import {Circle} from 'detect-collisions';
import {defineShape, intersectShape} from 'object-shape-tester';
import {potatoConfig} from '../config/game-config.js';
import {defineEntity} from '../game-state/game-entity.mod.js';
import {getPath, getPathLength, getPositionAlongPath} from '../level/level.js';
import {servePotato} from '../run/serving.js';
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
            speedPxPerMs: 0,
            cut: false,
            cooked: false,
            mashed: false,
            /** True once served, so it is never served twice. */
            served: false,
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
    /** Which look is currently drawn, so we only redraw when a flag changes. */
    protected drawnKey = '';

    public override createView(): ViewCreation2d {
        const {cut, cooked, mashed} = this.params;
        this.drawnKey = this.getLookKey();

        return {
            hitbox: new Circle(
                {
                    x: 0,
                    y: 0,
                },
                potatoConfig.radius,
            ),
            view: drawPotato(new Graphics(), {
                cut,
                cooked,
                mashed,
            }),
        };
    }

    protected getLookKey(): string {
        return `${this.params.cut}${this.params.cooked}${this.params.mashed}`;
    }

    protected redrawIfChanged() {
        const key = this.getLookKey();
        if (key === this.drawnKey) {
            return;
        }
        this.drawnKey = key;
        drawPotato(assertWrap.instanceOf(this.view, Graphics), {
            cut: this.params.cut,
            cooked: this.params.cooked,
            mashed: this.params.mashed,
        });
    }

    public override update({msSinceLastExecute}: Readonly<ModExecuteParams>) {
        if (this.params.served) {
            return;
        }

        this.params.distancePx += this.params.speedPxPerMs * msSinceLastExecute;

        const path = getPath(this.state.level, this.params.pathId);
        const position = getPositionAlongPath(path, this.params.distancePx);
        this.params.x = position.x;
        this.params.y = position.y;

        if (this.params.distancePx >= getPathLength(path)) {
            this.params.served = true;
            servePotato(this.state.runState, {
                processing: {
                    cut: this.params.cut,
                    cooked: this.params.cooked,
                    mashed: this.params.mashed,
                },
                ownerSlot: path.ownerSlot,
            });
            this.destroy();
            return;
        }

        this.redrawIfChanged();
    }
}
