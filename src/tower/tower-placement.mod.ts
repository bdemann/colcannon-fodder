import {defineAnthaMod} from '@antha/engine';
import {Graphics} from '@antha/graphics-2d';
import {towerConfig} from '../config/game-config.js';
import {GameCommandType, sendGameCommand} from '../game-state/game-command.js';
import {type FullGameState} from '../game-state/game-state.js';
import {RunStatus} from '../run/run-state.js';
import {canPlaceTower} from './tower-placement.js';
import {TowerType, towerTypes} from './tower-type.js';
import {TowerEntity} from './tower.entity.js';

/** The ghost tower. Owned by this mod, not an entity, because it is UI only. */
let preview: Graphics | undefined;

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

        preview.clear();

        if (state.runState.status !== RunStatus.Playing) {
            ui.selectedTowerType = undefined;
            preview.visible = false;
            return;
        }

        preview.visible = true;

        for (const key of ui.keys) {
            if (key === 'Escape') {
                ui.selectedTowerType = undefined;
                continue;
            }

            const pressed = Object.values(TowerType).find(
                (towerType) => towerTypes[towerType].hotkey === key,
            );

            if (pressed) {
                ui.selectedTowerType = ui.selectedTowerType === pressed ? undefined : pressed;
            }
        }

        const towers = [...state.entityStore.getEntities(TowerEntity)].map((tower) => {
            return {
                x: tower.params.x,
                y: tower.params.y,
            };
        });

        for (const click of ui.clicks) {
            if (click.button === 'right') {
                ui.selectedTowerType = undefined;
            } else if (ui.selectedTowerType) {
                const x = Math.round(click.x);
                const y = Math.round(click.y);

                if (
                    canPlaceTower({
                        level: state.level,
                        towers,
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
        const valid = canPlaceTower({
            level: state.level,
            towers,
            point: {
                x,
                y,
            },
        }).valid;

        preview
            .circle(x, y, definition.rangePx)
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
