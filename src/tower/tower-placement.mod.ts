import {defineAnthaMod} from '@antha/engine';
import {Graphics} from '@antha/graphics-2d';
import {Text} from 'pixi.js';
import {towerConfig} from '../config/game-config.js';
import {GameCommandType, sendGameCommand} from '../game-state/game-command.js';
import {type FullGameState} from '../game-state/game-state.js';
import {RunStatus} from '../run/run-state.js';
import {canAfford, canPlaceTower} from './tower-placement.js';
import {getTowerStats, TowerType, towerTypes} from './tower-type.js';
import {TowerEntity} from './tower.entity.js';

/** The ghost tower. Owned by this mod, not an entity, because it is UI only. */
let preview: Graphics | undefined;
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

        if (state.runState.status !== RunStatus.Playing || state.runState.paused) {
            ui.selectedTowerType = undefined;
            ui.selectedTowerId = undefined;
            preview.visible = false;
            return;
        }

        preview.visible = true;

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
            } else if (ui.selectedTowerId != undefined && (key === 'x' || key === 'X')) {
                sendGameCommand(state, {
                    type: GameCommandType.SellTower,
                    towerId: ui.selectedTowerId,
                });
                ui.selectedTowerId = undefined;
                continue;
            }

            const pressed = Object.values(TowerType).find(
                (towerType) => towerTypes[towerType].hotkey === key,
            );

            if (pressed) {
                ui.selectedTowerType = ui.selectedTowerType === pressed ? undefined : pressed;
                if (ui.selectedTowerType) {
                    ui.selectedTopping = undefined;
                }
            }
        }

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
                    });
                }
            }
        }

        if (!ui.selectedTowerType || !ui.pointerWorld) {
            return;
        }

        const definition = towerTypes[ui.selectedTowerType];
        const {x, y} = ui.pointerWorld;
        const placement = canPlaceTower({
            level: state.level,
            towers: builtTowers,
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

        preview
            .circle(x, y, getTowerStats(ui.selectedTowerType, 1).rangePx)
            .stroke({
                color: '#ffffff',
                alpha: 0.5,
                width: 3,
            })
            .circle(x, y, towerConfig.radius)
            .fill({
                color: definition.color,
                alpha: 0.5,
            })
            .stroke({
                color: valid ? '#3cff6e' : '#ff3c3c',
                width: 5,
            });
    },
});
