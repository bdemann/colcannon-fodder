import {type ViewCreation2d} from '@antha/entity-2d';
import {Graphics} from '@antha/graphics-2d';
import {assertWrap} from '@augment-vir/assert';
import {beltConfig} from '../config/game-config.js';
import {defineEntity} from '../game-state/game-entity.mod.js';
import {levelColors} from './level.entity.js';
import {getPathDirectionAt, getPathLength, getPositionAlongPath} from './level.js';

/**
 * The moving stripes of the conveyor belt. Presentation only: the stripe offset comes from
 * `runState.elapsedMs` and the belt speed, so the stripes move with the potatoes and stop when the
 * game freezes. Added right after `LevelEntity`.
 */
export class BeltEntity extends defineEntity({
    key: 'BeltEntity',
}) {
    public override createView(): ViewCreation2d {
        return {
            view: new Graphics({
                zIndex: -0.5,
            }),
        };
    }

    public override update() {}

    public override render() {
        const {level, runState} = this.state;
        const graphics = assertWrap.instanceOf(this.view, Graphics);
        const spacing = beltConfig.stripeSpacingPx;
        const offset = (runState.elapsedMs * runState.beltSpeedPxPerMs) % spacing;

        graphics.clear();

        for (const path of level.paths) {
            const length = getPathLength(path);
            const halfStripe = (path.widthPx - 16) / 2;

            for (let distance = offset; distance <= length; distance += spacing) {
                const center = getPositionAlongPath(path, distance);
                const direction = getPathDirectionAt(path, distance);
                const normalX = -direction.y * halfStripe;
                const normalY = direction.x * halfStripe;

                graphics
                    .moveTo(center.x - normalX, center.y - normalY)
                    .lineTo(center.x + normalX, center.y + normalY);
            }
        }

        graphics.stroke({
            color: levelColors.beltStripe,
            width: 5,
            cap: 'round',
        });
    }
}
