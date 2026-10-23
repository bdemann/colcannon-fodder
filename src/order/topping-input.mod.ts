import {defineAnthaMod} from '@antha/engine';
import {Graphics} from '@antha/graphics-2d';
import {potatoSizeConfig, toppingConfig} from '../config/game-config.js';
import {GameCommandType, sendGameCommand} from '../game-state/game-command.js';
import {type FullGameState} from '../game-state/game-state.js';
import {PotatoEntity} from '../potato/potato.entity.js';
import {RunStatus} from '../run/run-state.js';
import {Topping, toppingDefinitions} from './topping.js';

/** The cursor ghost. Owned by this mod, not an entity, because it is UI only. */
let ghost: Graphics | undefined;

/** Radius of the cursor ghost circle. */
const ghostRadius = 14;

/**
 * UI side of hand-applied toppings: hotkeys, selection, the cursor ghost, and sending the
 * `ApplyTopping` command when a mashed potato is clicked. Never changes entities itself.
 */
export const toppingInputMod = defineAnthaMod<FullGameState>({
    modName: 'topping-input',
    execute({state}) {
        const stage = state.pixi?.pixiApplication?.stage;
        const {ui} = state;

        if (!stage || !ui || !state.entityStore || !state.runState) {
            return;
        }

        if (!ghost || ghost.destroyed) {
            ghost = new Graphics();
            ghost.zIndex = 1000;
            stage.sortableChildren = true;
            stage.addChild(ghost);
        }

        ghost.clear();

        if (state.runState.status !== RunStatus.Playing) {
            ui.selectedTopping = undefined;
            return;
        }

        for (const key of ui.keys) {
            if (key === 'Escape') {
                ui.selectedTopping = undefined;
                continue;
            }

            const pressed = Object.values(Topping).find(
                (topping) => toppingDefinitions[topping].hotkey === key.toLowerCase(),
            );

            if (pressed) {
                ui.selectedTopping = ui.selectedTopping === pressed ? undefined : pressed;
                if (ui.selectedTopping) {
                    ui.selectedTowerType = undefined;
                }
            }
        }

        for (const click of ui.clicks) {
            if (click.button === 'right') {
                ui.selectedTopping = undefined;
                continue;
            }
            if (!ui.selectedTopping) {
                continue;
            }

            let closest: PotatoEntity | undefined;
            let closestDistance = Infinity;

            for (const potato of state.entityStore.getEntities(PotatoEntity)) {
                const distance = Math.hypot(potato.params.x - click.x, potato.params.y - click.y);
                if (
                    distance <=
                        potatoSizeConfig[potato.params.size].radius + toppingConfig.clickSlopPx &&
                    distance < closestDistance
                ) {
                    closest = potato;
                    closestDistance = distance;
                }
            }

            if (closest && closest.params.mashHp <= 0 && !closest.params.served) {
                sendGameCommand(state, {
                    type: GameCommandType.ApplyTopping,
                    potatoId: closest.params.potatoId,
                    topping: ui.selectedTopping,
                });
            }
        }

        if (!ui.selectedTopping || !ui.pointerWorld) {
            return;
        }

        ghost
            .circle(ui.pointerWorld.x, ui.pointerWorld.y, ghostRadius)
            .fill({
                color: toppingDefinitions[ui.selectedTopping].color,
            })
            .stroke({
                color: '#ffffff',
                width: 3,
            });
    },
});
