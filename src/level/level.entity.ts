import {type ViewCreation2d} from '@antha/entity-2d';
import {Graphics} from '@antha/graphics-2d';
import {Container, Text} from 'pixi.js';
import {defineEntity} from '../game-state/game-entity.mod.js';
import {gameWorldSize} from '../game-state/game-world.js';

/** Placeholder palette for the playfield. Swapped for real art in the art pass. */
export const levelColors = {
    grass: '#5b8c3a',
    belt: '#4a4a4a',
    beltRail: '#2b2b2b',
    beltStripe: '#6a6a6a',
    restaurant: '#c0392b',
    restaurantRoof: '#f5e6c8',
    text: '#ffffff',
} as const;

/**
 * Draws the static playfield: grass, every path, each path's spawn marker, and the restaurant.
 * Reads the level from `state.level`. Added first in a run so it renders underneath everything.
 */
export class LevelEntity extends defineEntity({
    key: 'LevelEntity',
}) {
    public override createView(): ViewCreation2d {
        const {level} = this.state;
        const view = new Container({
            zIndex: -1,
        });
        const ground = new Graphics().rect(0, 0, gameWorldSize.width, gameWorldSize.height).fill({
            color: levelColors.grass,
        });

        level.paths.forEach((path) => {
            const [
                first,
                ...rest
            ] = path.waypoints;

            if (!first) {
                return;
            }

            ground.moveTo(first.x, first.y);
            rest.forEach((point) => ground.lineTo(point.x, point.y));
            ground.stroke({
                color: levelColors.beltRail,
                width: path.widthPx + 14,
                cap: 'round',
                join: 'round',
            });

            ground.moveTo(first.x, first.y);
            rest.forEach((point) => ground.lineTo(point.x, point.y));
            ground.stroke({
                color: levelColors.belt,
                width: path.widthPx,
                cap: 'round',
                join: 'round',
            });

            ground.circle(first.x, first.y, path.widthPx * 0.6).fill({
                color: levelColors.beltRail,
            });
        });

        const {restaurant} = level;
        const half = restaurant.sizePx / 2;

        ground
            .rect(restaurant.x - half, restaurant.y - half, restaurant.sizePx, restaurant.sizePx)
            .fill({
                color: levelColors.restaurant,
            })
            .stroke({
                color: levelColors.restaurantRoof,
                width: 8,
            });

        view.addChild(ground);

        const restaurantLabel = new Text({
            text: 'RESTAURANT',
            style: {
                fill: levelColors.text,
                fontSize: 32,
                fontWeight: 'bold',
            },
        });
        restaurantLabel.anchor.set(0.5);
        restaurantLabel.position.set(restaurant.x, restaurant.y);
        view.addChild(restaurantLabel);

        level.paths.forEach((path) => {
            const first = path.waypoints[0];

            if (!first) {
                return;
            }

            const spawnLabel = new Text({
                text: 'POTATOES',
                style: {
                    fill: levelColors.text,
                    fontSize: 22,
                    fontWeight: 'bold',
                },
            });
            spawnLabel.anchor.set(0, 1);
            spawnLabel.position.set(first.x + 8, first.y - path.widthPx / 2 - 12);
            view.addChild(spawnLabel);
        });

        return {
            view,
        };
    }

    public override update() {}
}
