import {setVolume, type VolumeKind} from '../audio/volume-settings.js';
import {speedConfig} from '../config/game-config.js';
import {GameCommandType, sendGameCommand} from '../game-state/game-command.js';
import {type FullGameState} from '../game-state/game-state.js';
import {saveLevelChoice} from '../level/level-choice.js';
import {defaultLevel} from '../level/levels.js';
import {type Topping} from '../order/topping.js';
import {getStarsFromPoints, isTowerUnlocked} from '../progression/progression.js';
import {type RunMode} from '../run/run-state.js';
import {getNextSpeed} from '../run/speed.js';
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
    /** Picks campaign or endless on the title screen (restarts the ready run). */
    selectMode(mode: RunMode): void;
    /** Leaves the title screen and starts the run. */
    beginRun(): void;
    /** Discards the run and returns to the title screen with the current level and mode. */
    goToMainMenu(): void;
    /** Pauses or resumes the run. */
    togglePause(): void;
    /** Cycles the fast-forward speed 1x, 1.5x, 2x, 3x, 1x. */
    cycleSpeed(): void;
    /** Speeds up to 2x if at 1x, and drops back to 1x at the next income. */
    speedUntilIncome(): void;
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
            if (
                towerType &&
                !isTowerUnlocked(towerType, getStarsFromPoints(state.runState?.prestigePoints ?? 0))
            ) {
                return;
            }
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
        cycleSpeed() {
            sendGameCommand(state, {
                type: GameCommandType.SetSpeed,
                speed: getNextSpeed(state.runState?.speed ?? 1),
            });
        },
        speedUntilIncome() {
            if ((state.runState?.speed ?? 1) === 1) {
                sendGameCommand(state, {
                    type: GameCommandType.SetSpeed,
                    speed: speedConfig.untilIncomeSpeed,
                });
            }
            sendGameCommand(state, {
                type: GameCommandType.ArmSpeedReset,
            });
        },
        setVolume,
        selectLevel(levelId) {
            saveLevelChoice(levelId);
            sendGameCommand(state, {
                type: GameCommandType.StartRun,
                ready: true,
                levelId,
                mode: state.runState?.mode,
            });
        },
        selectMode(mode) {
            sendGameCommand(state, {
                type: GameCommandType.StartRun,
                ready: true,
                levelId: state.runState?.levelId ?? defaultLevel.levelId,
                mode,
            });
        },
        goToMainMenu() {
            sendGameCommand(state, {
                type: GameCommandType.StartRun,
                ready: true,
                levelId: state.runState?.levelId ?? defaultLevel.levelId,
                mode: state.runState?.mode,
            });
        },
        restartRun() {
            sendGameCommand(state, {
                type: GameCommandType.StartRun,
                levelId: state.runState?.levelId ?? defaultLevel.levelId,
                mode: state.runState?.mode,
            });
        },
    };

    actionsByState.set(state, actions);

    return actions;
}
