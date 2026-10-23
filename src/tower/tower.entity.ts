import {type ModExecuteParams} from '@antha/engine';
import {position2dParamsShape, type ViewCreation2d} from '@antha/entity-2d';
import {Graphics} from '@antha/graphics-2d';
import {defineShape, enumShape, intersectShape} from 'object-shape-tester';
import {Container, Text} from 'pixi.js';
import {towerConfig, towerFeedbackConfig} from '../config/game-config.js';
import {defineEntity} from '../game-state/game-entity.mod.js';
import {PotatoEntity} from '../potato/potato.entity.js';
import {chooseTargetIndex} from './tower-targeting.js';
import {TowerType, towerTypes} from './tower-type.js';

/** A built tower. Placed by the `PlaceTower` command; processes potatoes in range. */
export class TowerEntity extends defineEntity({
    key: 'TowerEntity',
    paramsShape: intersectShape(
        position2dParamsShape,
        defineShape({
            towerType: enumShape(TowerType),
            ownerSlot: 0,
            cooldownRemainingMs: 0,
            lastProcessedAtMs: -1,
            lastTargetX: 0,
            lastTargetY: 0,
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
    /** Presentation-only handles, set in `createView`. */
    protected body: Graphics | undefined;
    protected letter: Text | undefined;
    protected beam: Graphics | undefined;

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
        const body = new Graphics()
            .circle(0, 0, towerConfig.radius)
            .fill({
                color: definition.color,
            })
            .stroke({
                color: '#222222',
                width: 4,
            });
        view.addChild(body);

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

        const beam = new Graphics();
        view.addChild(beam);

        this.body = body;
        this.letter = letter;
        this.beam = beam;

        return {
            view,
        };
    }

    public override update({msSinceLastExecute}: Readonly<ModExecuteParams>) {
        this.params.cooldownRemainingMs = Math.max(
            0,
            this.params.cooldownRemainingMs - msSinceLastExecute,
        );
        if (this.params.cooldownRemainingMs > 0) {
            return;
        }

        const definition = towerTypes[this.params.towerType];
        const potatoes = [...this.state.entityStore.getEntities(PotatoEntity)].filter(
            (potato) => !potato.params.served,
        );
        const index = chooseTargetIndex(
            {
                x: this.params.x,
                y: this.params.y,
                rangePx: definition.rangePx,
                processes: definition.processes,
            },
            potatoes.map((potato) => {
                return {
                    x: potato.params.x,
                    y: potato.params.y,
                    distancePx: potato.params.distancePx,
                    processing: {
                        cut: potato.params.cut,
                        cooked: potato.params.cooked,
                        mashed: potato.params.mashed,
                    },
                };
            }),
        );
        const target = potatoes[index];
        if (!target) {
            return;
        }

        target.params[definition.processes] = true;
        this.params.cooldownRemainingMs = definition.cooldownMs;
        this.params.lastProcessedAtMs = this.state.runState.elapsedMs;
        this.params.lastTargetX = target.params.x;
        this.params.lastTargetY = target.params.y;
    }

    /** Flashes the tower and draws a beam to the last target. Presentation only. */
    public override render() {
        const {body, letter, beam} = this;
        if (!body || !letter || !beam) {
            return;
        }

        const {lastProcessedAtMs, lastTargetX, lastTargetY, x, y, towerType} = this.params;
        const flashing =
            lastProcessedAtMs >= 0 &&
            this.state.runState.elapsedMs - lastProcessedAtMs < towerFeedbackConfig.flashMs;
        const scale = flashing ? 1.25 : 1;

        body.scale.set(scale);
        letter.scale.set(scale);
        beam.clear();
        if (flashing) {
            beam.moveTo(0, 0)
                .lineTo(lastTargetX - x, lastTargetY - y)
                .stroke({
                    color: towerTypes[towerType].color,
                    width: 8,
                    alpha: 0.9,
                });
        }
    }
}
