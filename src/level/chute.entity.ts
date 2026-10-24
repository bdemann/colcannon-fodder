import {position2dParamsShape, type ViewCreation2d} from '@antha/entity-2d';
import {Graphics} from '@antha/graphics-2d';
import {assertWrap} from '@augment-vir/assert';
import {defineShape, intersectShape} from 'object-shape-tester';
import {defineEntity} from '../game-state/game-entity.mod.js';
import {PotatoEntity} from '../potato/potato.entity.js';

const chuteColors = {
    idle: '#2b2b2b',
    active: '#ff8c1a',
    rim: '#111111',
} as const;

/**
 * A drop chute: a dark hopper over the belt that flashes orange while a potato is falling from it.
 * One per chute in the level, added by `StartRun`. Presentation only apart from the `active` flag.
 */
export class ChuteEntity extends defineEntity({
    key: 'ChuteEntity',
    paramsShape: intersectShape(
        position2dParamsShape,
        defineShape({
            pathId: '',
            /** The chute's distance along its path, matching `PathDefinition.chutes`. */
            distancePx: 0,
            /** True while a potato is falling from this chute. */
            active: false,
        }),
    ),
    paramsMap: {
        view: {
            x: true,
            y: true,
        },
    },
}) {
    /** Which look is drawn, so we only redraw when it changes. */
    protected drawnActive: boolean | undefined;

    public override createView(): ViewCreation2d {
        const graphics = new Graphics({
            zIndex: 5,
        });

        this.drawHopper(graphics, this.params.active);

        return {
            view: graphics,
        };
    }

    protected drawHopper(graphics: Graphics, active: boolean) {
        this.drawnActive = active;
        graphics
            .clear()
            .poly([
                -60,
                -80,
                60,
                -80,
                34,
                -10,
                -34,
                -10,
            ])
            .fill({
                color: active ? chuteColors.active : chuteColors.idle,
            })
            .stroke({
                color: chuteColors.rim,
                width: 5,
            })
            .rect(-34, -10, 68, 12)
            .fill({
                color: chuteColors.rim,
            });
    }

    public override update() {
        let falling = false;

        for (const potato of this.state.entityStore.getEntities(PotatoEntity)) {
            if (
                potato.params.dropInMs > 0 &&
                potato.params.pathId === this.params.pathId &&
                potato.params.distancePx === this.params.distancePx
            ) {
                falling = true;
                break;
            }
        }

        this.params.active = falling;

        if (this.drawnActive !== falling) {
            this.drawHopper(assertWrap.instanceOf(this.view, Graphics), falling);
        }
    }
}
