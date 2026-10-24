import {randomString} from '@augment-vir/common';
import {setVolume, type VolumeKind} from '../audio/volume-settings.js';
import {speedConfig} from '../config/game-config.js';
import {GameCommandType, sendGameCommand} from '../game-state/game-command.js';
import {type FullGameState} from '../game-state/game-state.js';
import {
    closeRooms,
    createRoom,
    joinRoom,
    leaveRoom,
    openRooms,
    startSingleplayer,
    type RoomSummary,
} from '../game-state/multiplayer-session.js';
import {saveLevelChoice} from '../level/level-choice.js';
import {levelSupportsPlayerCount} from '../level/level.js';
import {defaultLevel, getLevel} from '../level/levels.js';
import {type Topping} from '../order/topping.js';
import {getStarsFromPoints, isTowerUnlocked} from '../progression/progression.js';
import {getSlotForClient, isCoopRun, RunStatus, type RunMode} from '../run/run-state.js';
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
    /** Opens the Help panel. During a singleplayer run it also pauses, and closing resumes. */
    openHelp(): void;
    /** Closes the Help panel (and resumes the run if opening it paused). */
    closeHelp(): void;
    /** Cycles the fast-forward speed 1x, 1.5x, 2x, 3x, 1x. */
    cycleSpeed(): void;
    /** Speeds up to 2x if at 1x, and drops back to 1x at the next income. */
    speedUntilIncome(): void;
    /** Sets the music or sound effects volume (0 to 1) and saves it. */
    setVolume(kind: VolumeKind, value: number): void;
    /** Main menu: starts a local run. */
    startSingleplayer(): void;
    /** Main menu: opens the co-op room list. */
    openRooms(): void;
    /** Room list: back to the main menu. */
    closeRooms(): void;
    /** Room list: creates a room (an empty password means open) and enters it as host. */
    createRoom(name: string, password: string): void;
    /** Room list: joins a room from the list. */
    joinRoom(room: Pick<RoomSummary, 'roomId' | 'roomName'>, password: string): void;
    /** Leaves the current room and returns to the main menu. */
    leaveRoom(): void;
};

/** In co-op only the host (slot 0) may restart or change level; the handler enforces it too. */
function canControlRun(state: Partial<FullGameState>): boolean {
    return (
        !isCoopRun(state.runState) ||
        getSlotForClient(
            state.runState,
            state.multiplayerP2pLockStep?.multiplayerController.getClientId(),
        ) === 0
    );
}

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
        openHelp() {
            const ui = state.ui;
            if (!ui || ui.helpOpen) {
                return;
            }
            ui.helpOpen = true;
            if (
                state.runState?.status === RunStatus.Playing &&
                !state.runState.paused &&
                !isCoopRun(state.runState)
            ) {
                ui.helpPausedRun = true;
                sendGameCommand(state, {
                    type: GameCommandType.TogglePause,
                });
            }
        },
        closeHelp() {
            const ui = state.ui;
            if (!ui?.helpOpen) {
                return;
            }
            ui.helpOpen = false;
            if (ui.helpPausedRun) {
                ui.helpPausedRun = false;
                if (state.runState?.paused) {
                    sendGameCommand(state, {
                        type: GameCommandType.TogglePause,
                    });
                }
            }
        },
        cycleSpeed() {
            if (isCoopRun(state.runState)) {
                return;
            }
            sendGameCommand(state, {
                type: GameCommandType.SetSpeed,
                speed: getNextSpeed(state.runState?.speed ?? 1),
            });
        },
        speedUntilIncome() {
            if (isCoopRun(state.runState)) {
                return;
            }
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
        startSingleplayer() {
            startSingleplayer(state);
        },
        openRooms() {
            void openRooms(state);
        },
        closeRooms() {
            closeRooms(state);
        },
        createRoom(name, password) {
            void createRoom(state, {
                name,
                password,
            });
        },
        joinRoom(room, password) {
            void joinRoom(state, room, password);
        },
        leaveRoom() {
            leaveRoom(state);
        },
        selectLevel(levelId) {
            if (!canControlRun(state)) {
                return;
            }
            /** Co-op maps are not remembered: singleplayer boots into the saved map. */
            if (levelSupportsPlayerCount(getLevel(levelId), 1)) {
                saveLevelChoice(levelId);
            }
            sendGameCommand(state, {
                type: GameCommandType.StartRun,
                seed: randomString(),
                ready: true,
                levelId,
                mode: state.runState?.mode,
            });
        },
        selectMode(mode) {
            if (!canControlRun(state)) {
                return;
            }
            sendGameCommand(state, {
                type: GameCommandType.StartRun,
                seed: randomString(),
                ready: true,
                levelId: state.runState?.levelId ?? defaultLevel.levelId,
                mode,
            });
        },
        goToMainMenu() {
            sendGameCommand(state, {
                type: GameCommandType.StartRun,
                seed: randomString(),
                ready: true,
                levelId: state.runState?.levelId ?? defaultLevel.levelId,
                mode: state.runState?.mode,
            });
        },
        restartRun() {
            if (!canControlRun(state)) {
                return;
            }
            sendGameCommand(state, {
                type: GameCommandType.StartRun,
                seed: randomString(),
                levelId: state.runState?.levelId ?? defaultLevel.levelId,
                mode: state.runState?.mode,
            });
        },
    };

    actionsByState.set(state, actions);

    return actions;
}
