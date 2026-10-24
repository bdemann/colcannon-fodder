import {type ViewCreation2d} from '@antha/entity-2d';
import {assertWrap} from '@augment-vir/assert';
import {Container, Graphics, GraphicsContext} from 'pixi.js';
import {beltConfig} from '../config/game-config.js';
import {defineEntity} from '../game-state/game-entity.mod.js';
import {levelColors} from './level.entity.js';
import {getPathDirectionAt, getPathLength, getPositionAlongPath} from './level.js';

/**
 * The moving stripes of the conveyor belt. Presentation only: the stripe offset comes from
 * `runState.elapsedMs` and the belt speed, so the stripes move with the potatoes and stop when the
 * game freezes. Added right after `LevelEntity`.
 *
 * Every stripe of a path is a `Graphics` sharing one `GraphicsContext`, so Pixi builds the stripe
 * geometry once and each frame only moves and turns the stripes (redrawing one big path every frame
 * made Pixi rebuild its geometry every frame).
 */
export class BeltEntity extends defineEntity({
    key: 'BeltEntity',
}) {
    /** One pool of stripes per path (same order as `level.paths`), built on the first render. */
    protected stripePools: Graphics[][] | undefined;

    public override createView(): ViewCreation2d {
        return {
            view: new Container({
                zIndex: -0.5,
            }),
        };
    }

    public override update() {}

    /** Creates enough stripes for the longest case on each path. */
    protected createStripePools(container: Container): Graphics[][] {
        const spacing = beltConfig.stripeSpacingPx;

        return this.state.level.paths.map((path) => {
            const halfStripe = (path.widthPx - 16) / 2;
            const context = new GraphicsContext()
                .moveTo(-halfStripe, 0)
                .lineTo(halfStripe, 0)
                .stroke({
                    color: levelColors.beltStripe,
                    width: 5,
                    cap: 'round',
                });
            const count = Math.floor(getPathLength(path) / spacing) + 1;
            const pool: Graphics[] = [];

            for (let index = 0; index < count; index++) {
                const stripe = new Graphics(context);
                stripe.visible = false;
                container.addChild(stripe);
                pool.push(stripe);
            }

            return pool;
        });
    }

    public override render() {
        const {level, runState} = this.state;
        const container = assertWrap.instanceOf(this.view, Container);
        const spacing = beltConfig.stripeSpacingPx;
        const offset = (runState.elapsedMs * runState.beltSpeedPxPerMs) % spacing;
        const pools = (this.stripePools ??= this.createStripePools(container));

        level.paths.forEach((path, pathIndex) => {
            const pool = pools[pathIndex] ?? [];
            const length = getPathLength(path);
            let used = 0;

            for (let distance = offset; distance <= length; distance += spacing) {
                const stripe = pool[used];
                if (!stripe) {
                    break;
                }
                const center = getPositionAlongPath(path, distance);
                const direction = getPathDirectionAt(path, distance);

                stripe.position.set(center.x, center.y);
                // The stripe lies across the belt, perpendicular to the direction of travel.
                stripe.rotation = Math.atan2(direction.x, -direction.y);
                stripe.visible = true;
                used++;
            }
            for (let index = used; index < pool.length; index++) {
                const stripe = pool[index];
                if (stripe) {
                    stripe.visible = false;
                }
            }
        });
    }
}
