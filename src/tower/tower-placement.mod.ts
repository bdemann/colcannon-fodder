import {defineAnthaMod} from '@antha/engine';
import {Graphics} from '@antha/graphics-2d';
import {Text} from 'pixi.js';
import {cozyPalette} from '../art/cozy.js';
import {towerConfig} from '../config/game-config.js';
import {knifeConfig} from '../config/knife-config.js';
import {GameCommandType, sendGameCommand} from '../game-state/game-command.js';
import {type FullGameState} from '../game-state/game-state.js';
import {getStarsFromPoints, isTowerUnlocked} from '../progression/progression.js';
import {getSlotForClient, RunStatus} from '../run/run-state.js';
import {getKnifeLine, getPerpendicularKnifeAngle} from './behaviors/knife.js';
import {drawTower} from './tower-art.js';
import {canAfford, canPlaceTower} from './tower-placement.js';
import {getTowerStats, TowerType, towerTypes} from './tower-type.js';
import {TowerEntity} from './tower.entity.js';

/** Keeps the placement angle in 0 to 359 degrees. */
function normalizeAngleDeg(angleDeg: number): number {
    return ((angleDeg % 360) + 360) % 360;
}

/** The ghost tower. Owned by this mod, not an entity, because it is UI only. */
let preview: Graphics | undefined;
/** The tower art drawn at half transparency under the pointer. */
let ghost: Graphics | undefined;
/** Explains why the ghost is red. */
let reasonLabel: Text | undefined;

/**
 * UI side of tower placement: hotkeys, selection, the ghost under the pointer, and sending the
 * `PlaceTower` command on click. Never changes entities itself.
 */
export const towerPlacementMod = defineAnthaMod<FullGameState>({
    modName: 'tower-placement',
    execute({state}) {
        const stage = state.pixi?.pixiApplication?.stage;
        const {ui} = state;

        if (!stage || !ui || !state.entityStore || !state.level || !state.runState) {
            return;
        }

        if (!preview || preview.destroyed) {
            preview = new Graphics();
            preview.zIndex = 1000;
            stage.sortableChildren = true;
            stage.addChild(preview);
        }

        if (!ghost || ghost.destroyed) {
            ghost = new Graphics();
            ghost.zIndex = 1000;
            ghost.alpha = 0.5;
            stage.addChild(ghost);
        }

        if (!reasonLabel || reasonLabel.destroyed) {
            reasonLabel = new Text({
                text: '',
                style: {
                    fill: '#ffffff',
                    fontSize: 24,
                    stroke: {
                        color: '#000000',
                        width: 4,
                    },
                },
            });
            reasonLabel.anchor.set(0.5, 0);
            reasonLabel.zIndex = 1000;
            stage.addChild(reasonLabel);
        }

        preview.clear();
        reasonLabel.visible = false;
        ghost.visible = false;

        if (state.runState.status !== RunStatus.Playing || state.runState.paused) {
            ui.selectedTowerType = undefined;
            ui.selectedTowerId = undefined;
            preview.visible = false;
            return;
        }

        preview.visible = true;

        const stars = getStarsFromPoints(state.runState.prestigePoints);
        if (ui.selectedTowerType && !isTowerUnlocked(ui.selectedTowerType, stars)) {
            ui.selectedTowerType = undefined;
        }

        for (const key of ui.keys) {
            if (key === 'Escape') {
                ui.selectedTowerType = undefined;
                ui.selectedTowerId = undefined;
                continue;
            }

            if (ui.selectedTowerId != undefined && (key === 'u' || key === 'U')) {
                sendGameCommand(state, {
                    type: GameCommandType.UpgradeTower,
                    towerId: ui.selectedTowerId,
                });
                continue;
            } else if (ui.selectedTowerId != undefined && (key === 's' || key === 'S')) {
                sendGameCommand(state, {
                    type: GameCommandType.ServiceTower,
                    towerId: ui.selectedTowerId,
                });
                continue;
            } else if (ui.selectedTowerId != undefined && (key === 'x' || key === 'X')) {
                sendGameCommand(state, {
                    type: GameCommandType.SellTower,
                    towerId: ui.selectedTowerId,
                });
                ui.selectedTowerId = undefined;
                continue;
            }

            if (ui.selectedTowerType === TowerType.Laser && (key === '[' || key === ']')) {
                ui.placementAngleDeg = normalizeAngleDeg(
                    ui.placementAngleDeg + (key === ']' ? 1 : -1) * knifeConfig.rotateStepDeg,
                );
                continue;
            }

            const pressed = Object.values(TowerType).find(
                (towerType) => towerTypes[towerType].hotkey === key,
            );

            if (pressed && isTowerUnlocked(pressed, stars)) {
                ui.selectedTowerType = ui.selectedTowerType === pressed ? undefined : pressed;
                if (ui.selectedTowerType) {
                    ui.selectedTopping = undefined;
                }
            }
        }

        if (ui.selectedTowerType === TowerType.Laser && ui.wheelSteps !== 0) {
            ui.placementAngleDeg = normalizeAngleDeg(
                ui.placementAngleDeg + ui.wheelSteps * knifeConfig.rotateStepDeg,
            );
        }

        const slot = getSlotForClient(
            state.runState,
            state.multiplayerP2pLockStep?.multiplayerController.getClientId(),
        );
        const builtTowers = [...state.entityStore.getEntities(TowerEntity)].map((tower) => {
            return {
                x: tower.params.x,
                y: tower.params.y,
                towerId: tower.params.towerId,
            };
        });

        // A selected tower may have been sold; also, picking a type or topping drops the selection.
        if (
            ui.selectedTowerType ||
            ui.selectedTopping ||
            !builtTowers.some((tower) => tower.towerId === ui.selectedTowerId)
        ) {
            ui.selectedTowerId = undefined;
        }

        for (const click of ui.clicks) {
            if (click.button === 'right') {
                ui.selectedTowerType = undefined;
                ui.selectedTowerId = undefined;
            } else if (!ui.selectedTowerType && !ui.selectedTopping) {
                ui.selectedTowerId = builtTowers.find((tower) => {
                    return Math.hypot(tower.x - click.x, tower.y - click.y) <= towerConfig.radius;
                })?.towerId;
            } else if (ui.selectedTowerType && !ui.selectedTopping) {
                const x = Math.round(click.x);
                const y = Math.round(click.y);

                if (
                    canAfford(state.runState.coins, ui.selectedTowerType) &&
                    canPlaceTower({
                        level: state.level,
                        towers: builtTowers,
                        slot,
                        point: {
                            x,
                            y,
                        },
                    }).valid
                ) {
                    sendGameCommand(state, {
                        type: GameCommandType.PlaceTower,
                        towerType: ui.selectedTowerType,
                        x,
                        y,
                        angleDeg: ui.placementAngleDeg,
                    });
                }
            }
        }

        if (!ui.selectedTowerType || !ui.pointerWorld) {
            return;
        }

        const {x, y} = ui.pointerWorld;
        const placement = canPlaceTower({
            level: state.level,
            towers: builtTowers,
            slot,
            point: {
                x,
                y,
            },
        });
        const affordable = canAfford(state.runState.coins, ui.selectedTowerType);
        const valid = placement.valid && affordable;

        if (!placement.valid || !affordable) {
            reasonLabel.text = placement.valid ? 'Not enough coins' : placement.reason;
            reasonLabel.position.set(x, y + towerConfig.radius + 8);
            reasonLabel.visible = true;
        }

        const {rangePx} = getTowerStats(ui.selectedTowerType, 1);

        if (towerTypes[ui.selectedTowerType].behavior === 'line') {
            // Line towers show their cut line instead of a range circle. The Knife's is automatic.
            const isLaser = ui.selectedTowerType === TowerType.Laser;
            const line = getKnifeLine({
                origin: {
                    x,
                    y,
                },
                angleDeg: isLaser
                    ? ui.placementAngleDeg
                    : getPerpendicularKnifeAngle(state.level, {
                          x,
                          y,
                      }),
                lengthPx: rangePx,
            });
            preview
                .moveTo(line.start.x, line.start.y)
                .lineTo(line.end.x, line.end.y)
                .stroke({
                    color: isLaser ? knifeConfig.laserColor : knifeConfig.lineColor,
                    alpha: 0.6,
                    width: knifeConfig.lineWidthPx,
                });
        } else {
            preview.circle(x, y, rangePx).stroke({
                color: '#ffffff',
                alpha: 0.5,
                width: 3,
            });
        }

        ghost.visible = true;
        ghost.position.set(x, y);
        drawTower(ghost, {
            towerType: ui.selectedTowerType,
            attack: -1,
            timeSec: state.runState.elapsedMs / 1000,
            aimX: 0,
            aimY: 0,
            rangePx,
            swiperAngle: 0,
        });
        preview.circle(x, y, towerConfig.radius).stroke({
            color: valid ? cozyPalette.meadow : cozyPalette.tomato,
            width: 5,
        });
    },
});
