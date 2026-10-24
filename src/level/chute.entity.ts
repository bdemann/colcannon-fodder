import {position2dParamsShape, type ViewCreation2d} from '@antha/entity-2d';
import {Graphics} from '@antha/graphics-2d';
import {assertWrap} from '@augment-vir/assert';
import {defineShape, intersectShape} from 'object-shape-tester';
import {cozyPalette, drawCozyShape, polyPath, roundRectPath} from '../art/cozy.js';
import {defineEntity} from '../game-state/game-entity.mod.js';
import {PotatoEntity} from '../potato/potato.entity.js';

/**
 * A drop chute: a wooden hopper over the belt that flashes orange while a potato is falling from
 * it. One per chute in the level, added by `StartRun`. Presentation only apart from the `active`
 * flag.
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
        graphics.clear();

        const wood = active ? cozyPalette.pumpkin : cozyPalette.toffee;

        if (active) {
            // the orange warning flash: a warm glow around the hopper
            graphics.ellipse(0, -40, 84, 64).fill({
                color: cozyPalette.pumpkin,
                alpha: 0.28,
            });
        }

        // funnel body, plank seams, spout and rim
        drawCozyShape(graphics, {
            path: polyPath([
                [
                    -60,
                    -80,
                ],
                [
                    60,
                    -80,
                ],
                [
                    34,
                    -10,
                ],
                [
                    -34,
                    -10,
                ],
            ]),
            fill: wood,
        });
        for (const seamX of [
            -20,
            20,
        ]) {
            graphics
                .moveTo(seamX * 2.2, -80)
                .lineTo(seamX * 1.3, -10)
                .stroke({
                    color: cozyPalette.walnut,
                    width: 3,
                    cap: 'round',
                });
        }
        drawCozyShape(graphics, {
            path: roundRectPath({
                x: -36,
                y: -10,
                width: 72,
                height: 14,
                radius: 4,
            }),
            fill: cozyPalette.walnut,
            outlineScale: 0.9,
        });
        drawCozyShape(graphics, {
            path: roundRectPath({
                x: -68,
                y: -92,
                width: 136,
                height: 16,
                radius: 6,
            }),
            fill: cozyPalette.oak,
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
