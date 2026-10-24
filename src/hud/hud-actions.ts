import {setVolume, type VolumeKind} from '../audio/volume-settings.js';
import {GameCommandType, sendGameCommand} from '../game-state/game-command.js';
import {type FullGameState} from '../game-state/game-state.js';
import {saveLevelChoice} from '../level/level-choice.js';
import {defaultLevel} from '../level/levels.js';
import {type Topping} from '../order/topping.js';
import {type TowerType} from '../tower/tower-type.js';

/**
 * Things HUD elements can do. Created once per game state (see `getHudActions`) so passing them as
 * element inputs does not force a re-render every tick.
 */
export type HudActions = {
    /** Selects a tower type for placement, or clears the selection with `undefined`. */
    selectTowerType(towerType: TowerType | undefined): void;
    /** Selects a built tower for upgrade or sale, or clears the selection with `undefined`. */
    selectTower(towerId: number | undefined): void;
    /** Upgrades a built tower one level. */
    upgradeTower(towerId: number): void;
    /** Services a worn tower for coins. */
    serviceTower(towerId: number): void;
    /** Sells a built tower. */
    sellTower(towerId: number): void;
    /** Selects a topping to apply by hand, or clears it with `undefined`. */
    selectTopping(topping: Topping | undefined): void;
    /** Starts a fresh run. */
    restartRun(): void;
    /** Picks a level on the title screen: restarts on the title with that level and remembers it. */
    selectLevel(levelId: string): void;
    /** Leaves the title screen and starts the run. */
    beginRun(): void;
    /** Pauses or resumes the run. */
    togglePause(): void;
    /** Sets the music or sound effects volume (0 to 1) and saves it. */
    setVolume(kind: VolumeKind, value: number): void;
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
                state.ui.selectedTowerId = undefined;
                state.ui.selectedTopping = undefined;
            }
        },
        selectTopping(topping) {
            if (state.ui) {
                state.ui.selectedTopping = topping;
                state.ui.selectedTowerType = undefined;
                state.ui.selectedTowerId = undefined;
            }
        },
        selectTower(towerId) {
            if (state.ui) {
                state.ui.selectedTowerId = towerId;
                state.ui.selectedTowerType = undefined;
                state.ui.selectedTopping = undefined;
            }
        },
        upgradeTower(towerId) {
            sendGameCommand(state, {
                type: GameCommandType.UpgradeTower,
                towerId,
            });
        },
        serviceTower(towerId) {
            sendGameCommand(state, {
                type: GameCommandType.ServiceTower,
                towerId,
            });
        },
        sellTower(towerId) {
            sendGameCommand(state, {
                type: GameCommandType.SellTower,
                towerId,
            });
            if (state.ui) {
                state.ui.selectedTowerId = undefined;
            }
        },
        beginRun() {
            sendGameCommand(state, {
                type: GameCommandType.BeginRun,
            });
        },
        togglePause() {
            sendGameCommand(state, {
                type: GameCommandType.TogglePause,
            });
        },
        setVolume,
        selectLevel(levelId) {
            saveLevelChoice(levelId);
            sendGameCommand(state, {
                type: GameCommandType.StartRun,
                ready: true,
                levelId,
            });
        },
        restartRun() {
            sendGameCommand(state, {
                type: GameCommandType.StartRun,
                levelId: state.runState?.levelId ?? defaultLevel.levelId,
            });
        },
    };

    actionsByState.set(state, actions);

    return actions;
}
