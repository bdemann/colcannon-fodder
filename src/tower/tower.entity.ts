import {type ModExecuteParams} from '@antha/engine';
import {position2dParamsShape, type ViewCreation2d} from '@antha/entity-2d';
import {Graphics} from '@antha/graphics-2d';
import {defineShape, enumShape, intersectShape} from 'object-shape-tester';
import {Container, Text} from 'pixi.js';
import {playSfx, Sfx} from '../audio/sfx.js';
import {towerConfig, towerFeedbackConfig} from '../config/game-config.js';
import {defineEntity} from '../game-state/game-entity.mod.js';
import {applyTowerHit} from '../potato/mash.js';
import {PotatoEntity} from '../potato/potato.entity.js';
import {RunStatus} from '../run/run-state.js';
import {shouldShowTowerRange} from './tower-placement.js';
import {chooseAreaTargetIndexes, chooseTargetIndex} from './tower-targeting.js';
import {TowerType, towerTypes} from './tower-type.js';

const processSfx: Record<TowerType, Sfx> = {
    [TowerType.Knife]: Sfx.Chop,
    [TowerType.Boiler]: Sfx.Boil,
    [TowerType.Masher]: Sfx.Squish,
};

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
    protected rangeView: Graphics | undefined;
    protected body: Graphics | undefined;
    protected letter: Text | undefined;
    protected beam: Graphics | undefined;
    protected splash: Graphics | undefined;
    /** Last `lastProcessedAtMs` seen by `render`, so each processing plays one sound. */
    protected lastSeenProcessedAtMs: number | undefined;

    public override createView(): ViewCreation2d {
        const definition = towerTypes[this.params.towerType];
        const view = new Container();

        const rangeView = new Graphics()
            .circle(0, 0, definition.rangePx)
            .fill({
                color: definition.color,
                alpha: 0.08,
            })
            .stroke({
                color: definition.color,
                alpha: 0.35,
                width: 3,
            });
        view.addChild(rangeView);
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

        const splash = new Graphics();
        view.addChild(splash);

        this.rangeView = rangeView;
        this.body = body;
        this.letter = letter;
        this.beam = beam;
        this.splash = splash;

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
        const potatoCandidates = potatoes.map((potato) => {
            return {
                x: potato.params.x,
                y: potato.params.y,
                distancePx: potato.params.distancePx,
                processing: potato.getProcessing(),
            };
        });

        if (definition.areaOfEffect) {
            const targetIndexes = chooseAreaTargetIndexes(
                {
                    x: this.params.x,
                    y: this.params.y,
                    rangePx: definition.rangePx,
                },
                potatoCandidates,
            );
            if (targetIndexes.length === 0) {
                return;
            }
            for (const targetIndex of targetIndexes) {
                const hitPotato = potatoes[targetIndex];
                if (!hitPotato) {
                    continue;
                }
                const hitProcessing = hitPotato.getProcessing();
                applyTowerHit(hitProcessing, this.params.towerType);
                hitPotato.params.cut = hitProcessing.cut;
                hitPotato.params.cooked = hitProcessing.cooked;
                hitPotato.params.mashHp = hitProcessing.mashHp;
            }
            this.params.cooldownRemainingMs = definition.cooldownMs;
            this.params.lastProcessedAtMs = this.state.runState.elapsedMs;
            this.params.lastTargetX = this.params.x;
            this.params.lastTargetY = this.params.y;
            return;
        }

        const index = chooseTargetIndex(
            {
                x: this.params.x,
                y: this.params.y,
                rangePx: definition.rangePx,
                appliesEffect: definition.appliesEffect,
            },
            potatoCandidates,
        );
        const target = potatoes[index];
        if (!target) {
            return;
        }

        const processing = target.getProcessing();
        applyTowerHit(processing, this.params.towerType);
        target.params.cut = processing.cut;
        target.params.cooked = processing.cooked;
        target.params.mashHp = processing.mashHp;
        this.params.cooldownRemainingMs = definition.cooldownMs;
        this.params.lastProcessedAtMs = this.state.runState.elapsedMs;
        this.params.lastTargetX = target.params.x;
        this.params.lastTargetY = target.params.y;
    }

    /** Flashes the tower and draws a beam to the last target. Presentation only. */
    public override render() {
        const {body, letter, beam, splash, rangeView} = this;
        if (!body || !letter || !beam || !splash || !rangeView) {
            return;
        }

        rangeView.visible = shouldShowTowerRange({
            tower: this.params,
            pointerWorld: this.state.ui.pointerWorld,
            selectedTowerType: this.state.ui.selectedTowerType,
        });

        const {lastProcessedAtMs, lastTargetX, lastTargetY, x, y, towerType} = this.params;
        const flashing =
            lastProcessedAtMs >= 0 &&
            this.state.runState.elapsedMs - lastProcessedAtMs < towerFeedbackConfig.flashMs;
        if (
            this.lastSeenProcessedAtMs != undefined &&
            lastProcessedAtMs !== this.lastSeenProcessedAtMs &&
            lastProcessedAtMs >= 0 &&
            this.state.runState.status === RunStatus.Playing
        ) {
            playSfx(processSfx[towerType]);
        }
        this.lastSeenProcessedAtMs = lastProcessedAtMs;

        const scale = flashing ? 1.25 : 1;

        body.scale.set(scale);
        letter.scale.set(scale);
        beam.clear();
        splash.clear();
        const definition = towerTypes[towerType];
        const sinceMs = this.state.runState.elapsedMs - lastProcessedAtMs;
        if (definition.areaOfEffect) {
            if (lastProcessedAtMs >= 0 && sinceMs < towerFeedbackConfig.splashMs) {
                const t = sinceMs / towerFeedbackConfig.splashMs;
                splash.circle(0, 0, definition.rangePx * (0.3 + 0.7 * t)).stroke({
                    color: definition.color,
                    width: 10,
                    alpha: 0.8 * (1 - t),
                });
            }
        } else if (flashing) {
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
