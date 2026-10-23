import {position2dParamsShape, type ViewCreation2d} from '@antha/entity-2d';
import {Graphics} from '@antha/graphics-2d';
import {defineShape, enumShape, intersectShape} from 'object-shape-tester';
import {Container, Text} from 'pixi.js';
import {towerConfig} from '../config/game-config.js';
import {defineEntity} from '../game-state/game-entity.mod.js';
import {TowerType, towerTypes} from './tower-type.js';

/** A built tower. Placed by the `PlaceTower` command; processing potatoes comes later. */
export class TowerEntity extends defineEntity({
    key: 'TowerEntity',
    paramsShape: intersectShape(
        position2dParamsShape,
        defineShape({
            towerType: enumShape(TowerType),
            ownerSlot: 0,
            cooldownRemainingMs: 0,
            lastProcessedAtMs: -1,
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
    public override createView(): ViewCreation2d {
        const definition = towerTypes[this.params.towerType];
        const view = new Container();

        view.addChild(
            new Graphics()
                .circle(0, 0, definition.rangePx)
                .fill({
                    color: definition.color,
                    alpha: 0.08,
                })
                .stroke({
                    color: definition.color,
                    alpha: 0.35,
                    width: 3,
                }),
        );
        view.addChild(
            new Graphics()
                .circle(0, 0, towerConfig.radius)
                .fill({
                    color: definition.color,
                })
                .stroke({
                    color: '#222222',
                    width: 4,
                }),
        );

        const letter = new Text({
            text: definition.label.slice(0, 1),
            style: {
                fill: '#1a1a1a',
                fontSize: 30,
                fontWeight: 'bold',
            },
        });
        letter.anchor.set(0.5);
        view.addChild(letter);

        return {
            view,
        };
    }

    public override update() {}
}
