import {type ModExecuteParams} from '@antha/engine';
import {position2dParamsShape, type ViewCreation2d} from '@antha/entity-2d';
import {Graphics} from '@antha/graphics-2d';
import {defineShape, enumShape, intersectShape} from 'object-shape-tester';
import {Container, Text} from 'pixi.js';
import {playSfx, Sfx} from '../audio/sfx.js';
import {towerConfig, towerFeedbackConfig} from '../config/game-config.js';
import {knifeConfig} from '../config/knife-config.js';
import {qualityConfig} from '../config/quality-config.js';
import {swiperConfig} from '../config/swiper-config.js';
import {wearConfig} from '../config/wear-config.js';
import {defineEntity} from '../game-state/game-entity.mod.js';
import {applyTowerHit} from '../potato/mash.js';
import {PotatoEntity} from '../potato/potato.entity.js';
import {RunStatus} from '../run/run-state.js';
import {SeagullEntity} from '../seagull/seagull.entity.js';
import {updateGullTrap} from './behaviors/gull-trap.js';
import {getKnifeLine, updateKnife} from './behaviors/knife.js';
import {updateMicrowave} from './behaviors/microwave.js';
import {getArmTip, getSwiperAngle, updateSwiper} from './behaviors/swiper.js';
import {shouldShowTowerRange} from './tower-placement.js';
import {
    chooseAreaTargetIndexes,
    chooseGullTargetIndex,
    chooseTargetIndex,
    getGullsInRange,
} from './tower-targeting.js';
import {getTowerStats, TowerType, towerTypes} from './tower-type.js';
import {addWear, getWearPerUse} from './wear.js';

const processSfx: Record<TowerType, Sfx> = {
    [TowerType.Knife]: Sfx.Chop,
    [TowerType.Boiler]: Sfx.Boil,
    [TowerType.Masher]: Sfx.Squish,
    /** Placeholder sounds; the issues for these towers may swap them. */
    [TowerType.Microwave]: Sfx.Boil,
    [TowerType.CricketTrap]: Sfx.Build,
    [TowerType.Swiper]: Sfx.Chop,
};

/** Level pips: gold dots under the tower body. */
const pipRadiusPx = 5;
const pipSpacingPx = 16;
/** The white selection circle sits this far outside the tower body. */
const selectionGapPx = 8;

/** The wear bar under the pips. */
const wearBarWidthPx = 44;
const wearBarHeightPx = 6;

const trapBoxPx = 44;
/** How long the thrown cricket is drawn in flight, and how high its arc peaks. */
const trapThrowMs = 400;
const trapArcHeightPx = 30;

/** A built tower. Placed by the `PlaceTower` command; processes potatoes in range. */
export class TowerEntity extends defineEntity({
    key: 'TowerEntity',
    paramsShape: intersectShape(
        position2dParamsShape,
        defineShape({
            towerType: enumShape(TowerType),
            /** Unique per run (from `runState.nextTowerId`), so commands can name this tower. */
            towerId: 0,
            /** Upgrade level, starting at 1. */
            level: 1,
            /** `runState.elapsedMs` when built. Rotating towers use it for their phase. */
            builtAtMs: 0,
            ownerSlot: 0,
            cooldownRemainingMs: 0,
            lastProcessedAtMs: -1,
            lastTargetX: 0,
            lastTargetY: 0,
            /** Cut direction in degrees (0 is right, clockwise). Only the Knife uses it. */
            angleDeg: 0,
            /** 0 to 100. At 100 the tower is worn and works at reduced strength until serviced. */
            wear: 0,
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
    /** Swiper only: the rotating paddle. */
    protected paddle: Graphics | undefined;
    protected splash: Graphics | undefined;
    protected pips: Graphics | undefined;
    protected selection: Graphics | undefined;
    /** Wear bar under the pips, cracks over the body, and the bobbing wrench. */
    protected wearBar: Graphics | undefined;
    protected cracks: Graphics | undefined;
    protected wrench: Text | undefined;
    /** The level the range ring, paddle and pips were last drawn for. */
    protected drawnLevel = 0;
    /** Last `lastProcessedAtMs` seen by `render`, so each processing plays one sound. */
    protected lastSeenProcessedAtMs: number | undefined;

    public override createView(): ViewCreation2d {
        const definition = towerTypes[this.params.towerType];
        const view = new Container();

        const rangeView = new Graphics();
        view.addChild(rangeView);
        const isTrap = definition.behavior === 'gull-trap';
        const body = new Graphics();
        if (isTrap) {
            // A wooden box with a little cricket on top.
            body.roundRect(-trapBoxPx / 2, -trapBoxPx / 2, trapBoxPx, trapBoxPx, 6)
                .fill({
                    color: '#8d6e63',
                })
                .stroke({
                    color: '#5d4037',
                    width: 4,
                })
                .ellipse(0, 0, 9, 4.5)
                .fill({
                    color: '#1b5e20',
                })
                .moveTo(-4, 3)
                .lineTo(-9, 9)
                .moveTo(4, 3)
                .lineTo(9, 9)
                .stroke({
                    color: '#1b5e20',
                    width: 2,
                });
        } else {
            body.circle(0, 0, towerConfig.radius)
                .fill({
                    color: definition.color,
                })
                .stroke({
                    color: '#222222',
                    width: 4,
                });
        }
        view.addChild(body);

        if (definition.behavior === 'swipe') {
            this.paddle = new Graphics();
            view.addChild(this.paddle);
        }

        const letter = new Text({
            text: definition.glyph,
            style: {
                fill: '#1a1a1a',
                fontSize: 30,
                fontWeight: 'bold',
            },
        });
        letter.anchor.set(0.5);
        letter.visible = !isTrap;
        view.addChild(letter);

        const selection = new Graphics();
        view.addChild(selection);

        const pips = new Graphics();
        view.addChild(pips);

        const wearBar = new Graphics();
        view.addChild(wearBar);

        const cracks = new Graphics();
        const crackRadius = isTrap ? trapBoxPx / 2 : towerConfig.radius;
        cracks
            .moveTo(-crackRadius * 0.6, -crackRadius * 0.7)
            .lineTo(-crackRadius * 0.1, -crackRadius * 0.1)
            .lineTo(-crackRadius * 0.3, crackRadius * 0.2)
            .lineTo(crackRadius * 0.2, crackRadius * 0.8)
            .moveTo(crackRadius * 0.7, -crackRadius * 0.5)
            .lineTo(crackRadius * 0.2, -crackRadius * 0.05)
            .lineTo(crackRadius * 0.5, crackRadius * 0.4)
            .stroke({
                color: '#1a1a1a',
                width: 3,
            });
        cracks.visible = false;
        view.addChild(cracks);

        const wrench = new Text({
            text: '🔧',
            style: {
                fontSize: 28,
            },
        });
        wrench.anchor.set(0.5);
        wrench.visible = false;
        view.addChild(wrench);

        const beam = new Graphics();
        view.addChild(beam);

        const splash = new Graphics();
        view.addChild(splash);

        this.rangeView = rangeView;
        this.body = body;
        this.letter = letter;
        this.beam = beam;
        this.splash = splash;
        this.pips = pips;
        this.wearBar = wearBar;
        this.cracks = cracks;
        this.wrench = wrench;
        this.selection = selection;
        this.drawnLevel = 0;

        return {
            view,
        };
    }

    public override update({msSinceLastExecute}: Readonly<ModExecuteParams>) {
        const {behavior} = towerTypes[this.params.towerType];

        if (behavior === 'gull-trap') {
            updateGullTrap(this, msSinceLastExecute);
            return;
        } else if (behavior === 'cone') {
            updateMicrowave(this, msSinceLastExecute);
            return;
        } else if (behavior === 'swipe') {
            updateSwiper(this, msSinceLastExecute);
            return;
        } else if (behavior === 'line') {
            updateKnife(this, msSinceLastExecute);
            return;
        }

        this.params.cooldownRemainingMs = Math.max(
            0,
            this.params.cooldownRemainingMs - msSinceLastExecute,
        );
        if (this.params.cooldownRemainingMs > 0) {
            return;
        }

        const definition = towerTypes[this.params.towerType];
        const stats = getTowerStats(this.params.towerType, this.params.level, this.params.wear);
        const gulls = [...this.state.entityStore.getEntities(SeagullEntity)].filter(
            (gull) => gull.params.hp > 0 && !gull.params.fed,
        );
        const gullCandidates = gulls.map((gull) => {
            return {
                x: gull.params.x,
                y: gull.params.y,
                carrying: gull.params.carryingPotatoId !== 0,
            };
        });
        const towerCircle = {
            x: this.params.x,
            y: this.params.y,
            rangePx: stats.rangePx,
        };
        const gullIndexes = definition.areaOfEffect
            ? getGullsInRange(towerCircle, gullCandidates)
            : [chooseGullTargetIndex(towerCircle, gullCandidates)].filter((index) => index >= 0);
        const hitGulls = gullIndexes.flatMap((index) => gulls[index] ?? []);

        if (!definition.areaOfEffect && hitGulls[0]) {
            // Gulls come first: knocking one out beats processing a potato.
            const gull = hitGulls[0];
            this.params.lastTargetX = gull.params.x;
            this.params.lastTargetY = gull.params.y;
            gull.takeHit(stats.damage);
            this.wearFromUse();
            this.params.cooldownRemainingMs = stats.cooldownMs;
            this.params.lastProcessedAtMs = this.state.runState.elapsedMs;
            return;
        }

        const potatoes = [...this.state.entityStore.getEntities(PotatoEntity)].filter(
            (potato) => !potato.params.served && !potato.params.carriedBySeagull,
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
                    rangePx: stats.rangePx,
                },
                potatoCandidates,
            );
            if (targetIndexes.length === 0 && hitGulls.length === 0) {
                return;
            }
            for (const gull of hitGulls) {
                gull.takeHit(stats.damage);
            }
            for (const targetIndex of targetIndexes) {
                const hitPotato = potatoes[targetIndex];
                if (!hitPotato) {
                    continue;
                }
                hitPotato.recordHit({
                    towerType: this.params.towerType,
                    tower: this.params,
                });
                const hitProcessing = hitPotato.getProcessing();
                applyTowerHit(hitProcessing, this.params.towerType, this.params);
                hitPotato.params.cut = hitProcessing.cut;
                hitPotato.params.cooked = hitProcessing.cooked;
                hitPotato.params.mashHp = hitProcessing.mashHp;
            }
            this.wearFromUse();
            this.params.cooldownRemainingMs = stats.cooldownMs;
            this.params.lastProcessedAtMs = this.state.runState.elapsedMs;
            this.params.lastTargetX = this.params.x;
            this.params.lastTargetY = this.params.y;
            return;
        }

        const index = chooseTargetIndex(
            {
                x: this.params.x,
                y: this.params.y,
                rangePx: stats.rangePx,
                appliesEffect: definition.appliesEffect,
            },
            potatoCandidates,
        );
        const target = potatoes[index];
        if (!target) {
            return;
        }

        target.recordHit({
            towerType: this.params.towerType,
            tower: this.params,
        });
        const processing = target.getProcessing();
        applyTowerHit(processing, this.params.towerType, this.params);
        target.params.cut = processing.cut;
        target.params.cooked = processing.cooked;
        target.params.mashHp = processing.mashHp;
        this.wearFromUse();
        this.params.cooldownRemainingMs = stats.cooldownMs;
        this.params.lastProcessedAtMs = this.state.runState.elapsedMs;
        this.params.lastTargetX = target.params.x;
        this.params.lastTargetY = target.params.y;
    }

    /** Adds one use of wear for this tower type. */
    protected wearFromUse() {
        this.params.wear = addWear({
            wear: this.params.wear,
            amount: getWearPerUse(this.params.towerType),
        });
    }

    /** Draws the wear bar, cracks, fade and bobbing wrench. Presentation only. */
    protected renderWear() {
        const {wearBar, cracks, wrench, body} = this;
        if (!wearBar || !cracks || !wrench || !body) {
            return;
        }
        const {wear, towerType} = this.params;
        const worn = wear >= wearConfig.maxWear;
        const bodyRadius =
            towerTypes[towerType].behavior === 'gull-trap' ? trapBoxPx / 2 : towerConfig.radius;

        wearBar.clear();
        if (wear > 0) {
            const y = bodyRadius + selectionGapPx + 14 + pipRadiusPx + 6;
            const fraction = wear / wearConfig.maxWear;
            wearBar
                .rect(-wearBarWidthPx / 2, y, wearBarWidthPx, wearBarHeightPx)
                .fill({
                    color: '#000000',
                    alpha: 0.6,
                })
                .rect(-wearBarWidthPx / 2, y, wearBarWidthPx * fraction, wearBarHeightPx)
                .fill({
                    color: `hsl(${Math.round(120 - fraction * 120)}, 75%, 45%)`,
                });
        }

        cracks.visible = worn;
        body.alpha = worn ? 0.75 : 1;

        wrench.visible = worn;
        wrench.y = -bodyRadius - 22 + Math.sin(this.state.runState.elapsedMs / 200) * 5;
    }

    /** Redraws everything that depends on the level: range ring, swiper arm, pips, selection ring. */
    protected drawLevelParts() {
        const {rangeView, pips, selection, paddle} = this;
        if (!rangeView || !pips || !selection) {
            return;
        }
        const {towerType, level} = this.params;
        const definition = towerTypes[towerType];
        const {rangePx} = getTowerStats(towerType, level);
        this.drawnLevel = level;

        if (definition.behavior === 'line') {
            // The Knife shows its fixed cut line instead of a range ring.
            const line = getKnifeLine({
                origin: {
                    x: 0,
                    y: 0,
                },
                angleDeg: this.params.angleDeg,
                lengthPx: rangePx,
            });
            rangeView
                .clear()
                .moveTo(line.start.x, line.start.y)
                .lineTo(line.end.x, line.end.y)
                .stroke({
                    color: knifeConfig.lineColor,
                    alpha: knifeConfig.lineAlpha,
                    width: knifeConfig.lineWidthPx,
                });
        } else {
            rangeView
                .clear()
                .circle(0, 0, rangePx)
                .fill({
                    color: definition.color,
                    alpha: 0.08,
                })
                .stroke({
                    color: definition.color,
                    alpha: 0.35,
                    width: 3,
                });
        }

        if (paddle) {
            const tip = getArmTip({
                center: {
                    x: 0,
                    y: 0,
                },
                angle: 0,
                lengthPx: rangePx,
            });
            paddle
                .clear()
                .roundRect(
                    0,
                    -swiperConfig.armHalfWidthPx,
                    tip.x,
                    swiperConfig.armHalfWidthPx * 2,
                    swiperConfig.armHalfWidthPx,
                )
                .fill({
                    color: '#a1887f',
                })
                .stroke({
                    color: '#5d4037',
                    width: 3,
                });
        }

        const bodyRadius = definition.behavior === 'gull-trap' ? trapBoxPx / 2 : towerConfig.radius;
        pips.clear();
        for (let index = 0; index < level; index++) {
            pips.circle(
                (index - (level - 1) / 2) * pipSpacingPx,
                bodyRadius + selectionGapPx + 14,
                pipRadiusPx,
            ).fill({
                color: '#ffd700',
            });
        }

        selection
            .clear()
            .circle(0, 0, towerConfig.radius + selectionGapPx)
            .stroke({
                color: '#ffffff',
                width: 4,
            });
    }

    /** Flashes the tower and draws a beam to the last target. Presentation only. */
    public override render() {
        const {body, letter, beam, splash, rangeView} = this;
        if (!body || !letter || !beam || !splash || !rangeView) {
            return;
        }

        if (this.drawnLevel !== this.params.level) {
            this.drawLevelParts();
        }

        const isKnife = towerTypes[this.params.towerType].behavior === 'line';
        rangeView.visible =
            isKnife ||
            shouldShowTowerRange({
                tower: this.params,
                pointerWorld: this.state.ui.pointerWorld,
                selectedTowerType: this.state.ui.selectedTowerType,
                selectedTowerId: this.state.ui.selectedTowerId,
            });
        this.renderWear();
        if (this.selection) {
            this.selection.visible = this.state.ui.selectedTowerId === this.params.towerId;
        }

        if (this.paddle) {
            this.paddle.rotation = getSwiperAngle({
                elapsedMs: this.state.runState.elapsedMs,
                builtAtMs: this.params.builtAtMs,
            });
        }

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
        if (definition.behavior === 'cone') {
            if (lastProcessedAtMs >= 0 && sinceMs < qualityConfig.microwaveFlashMs) {
                const aim = Math.atan2(lastTargetY - y, lastTargetX - x);
                const half = (qualityConfig.microwaveConeHalfAngleDeg * Math.PI) / 180;
                splash
                    .moveTo(0, 0)
                    .arc(
                        0,
                        0,
                        getTowerStats(towerType, this.params.level).rangePx,
                        aim - half,
                        aim + half,
                    )
                    .closePath()
                    .fill({
                        color: definition.color,
                        alpha: 0.24 + 0.06 * Math.sin(this.state.runState.elapsedMs / 60),
                    });
            }
        } else if (definition.areaOfEffect) {
            if (lastProcessedAtMs >= 0 && sinceMs < towerFeedbackConfig.splashMs) {
                const t = sinceMs / towerFeedbackConfig.splashMs;
                splash
                    .circle(
                        0,
                        0,
                        getTowerStats(towerType, this.params.level).rangePx * (0.3 + 0.7 * t),
                    )
                    .stroke({
                        color: definition.color,
                        width: 10,
                        alpha: 0.8 * (1 - t),
                    });
            }
        } else if (definition.behavior === 'gull-trap') {
            if (lastProcessedAtMs >= 0 && sinceMs < trapThrowMs) {
                // A cricket dot arcing from the trap to the gull it was thrown at.
                const t = sinceMs / trapThrowMs;
                const dx = lastTargetX - x;
                const dy = lastTargetY - y;
                splash.circle(dx * t, dy * t - trapArcHeightPx * 4 * t * (1 - t), 4).fill({
                    color: '#1b5e20',
                });
            }
        } else if (definition.behavior === 'line') {
            if (flashing) {
                beam.moveTo(0, 0)
                    .lineTo(lastTargetX - x, lastTargetY - y)
                    .stroke({
                        color: '#e0e0e0',
                        width: 6,
                        alpha: 0.9,
                    })
                    .moveTo(0, 0)
                    .lineTo(lastTargetX - x, lastTargetY - y)
                    .stroke({
                        color: '#ffffff',
                        width: 2,
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
