import {GameCommandType, sendGameCommand} from '../game-state/game-command.js';
import {type FullGameState} from '../game-state/game-state.js';
import {type Topping} from '../order/topping.js';
import {type TowerType} from '../tower/tower-type.js';

/**
 * Things HUD elements can do. Created once per game state (see `getHudActions`) so passing them as
 * element inputs does not force a re-render every tick.
 */
export type HudActions = {
    /** Selects a tower type for placement, or clears the selection with `undefined`. */
    selectTowerType(towerType: TowerType | undefined): void;
    /** Selects a topping to apply by hand, or clears it with `undefined`. */
    selectTopping(topping: Topping | undefined): void;
    /** Starts a fresh run. */
    restartRun(): void;
    /** Leaves the title screen and starts the run. */
    beginRun(): void;
};

const actionsByState = new WeakMap<object, HudActions>();

export function getHudActions(state: Partial<FullGameState>): HudActions {
    const existing = actionsByState.get(state);

    if (existing) {
        return existing;
    }

    const actions: HudActions = {
        selectTowerType(towerType) {
            if (state.ui) {
                state.ui.selectedTowerType = towerType;
                state.ui.selectedTopping = undefined;
            }
        },
        selectTopping(topping) {
            if (state.ui) {
                state.ui.selectedTopping = topping;
                state.ui.selectedTowerType = undefined;
            }
        },
        beginRun() {
            sendGameCommand(state, {
                type: GameCommandType.BeginRun,
            });
        },
        restartRun() {
            sendGameCommand(state, {
                type: GameCommandType.StartRun,
            });
        },
    };

    actionsByState.set(state, actions);

    return actions;
}
