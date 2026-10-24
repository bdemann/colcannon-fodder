import {type ViewCreation2d} from '@antha/entity-2d';
import {defineEntity} from '../game-state/game-entity.mod.js';
import {createRestaurantSign} from './restaurant-art.js';

/**
 * The hanging `RESTAURANT` sign. It is its own entity, with a zIndex above potatoes, so potatoes
 * queueing at the counter can never hide it. Presentation only. Added right after `LevelEntity`.
 */
export class RestaurantSignEntity extends defineEntity({
    key: 'RestaurantSignEntity',
}) {
    public override createView(): ViewCreation2d {
        const view = createRestaurantSign(this.state.level.restaurant);

        view.zIndex = 4;

        return {
            view,
        };
    }

    public override update() {}
}
