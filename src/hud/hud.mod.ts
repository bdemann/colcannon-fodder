import {defineAnthaMod} from '@antha/engine';
import {html} from 'element-vir';
import {GameAudioChannel} from '../audio/game-audio.js';
import {isMuted, playSfx, setMuted, Sfx} from '../audio/sfx.js';
import {getVolumes} from '../audio/volume-settings.js';
import {type FullGameState} from '../game-state/game-state.js';
import {SessionScreen} from '../game-state/multiplayer-session.js';
import {isCoopRun, RunStatus, ServingResult} from '../run/run-state.js';
import {ensureTowerIcons} from '../tower/tower-icons.js';
import {TowerEntity} from '../tower/tower.entity.js';
import {getHudActions} from './hud-actions.js';
import {createHudSnapshot} from './hud-snapshot.js';
import {GameHud} from './hud.element.js';
import {createSimSpeedTracker} from './sim-speed.js';

const servingSfx: Record<ServingResult, Sfx> = {
    [ServingResult.Perfect]: Sfx.ServePerfect,
    [ServingResult.Incomplete]: Sfx.ServeBad,
    [ServingResult.Raw]: Sfx.ServeRaw,
};

/** Presentation-only trackers so each serving and each new tower plays one sound. */
let lastSeenServedAtMs: number | undefined;
let lastSeenTowerCount: number | undefined;
/**
 * Whether a tower, built tower or topping was selected at the end of the previous tick. The
 * placement and topping mods run before the HUD and already clear selections on Escape, so this is
 * how Escape knows whether it should pause instead.
 */
let hadSelectionLastTick = false;
let lastSeenStealAtMs: number | undefined;
let lastSeenBossSpawnAtMs = -1;
const simSpeedTracker = createSimSpeedTracker();

/** Plays serving and build sounds. Presentation only, so it lives here and not in the simulation. */
function playHudSounds(state: Partial<FullGameState>) {
    const runState = state.runState;
    if (!runState) {
        return;
    }
    const lastServing = runState.lastServing;
    const towerCount = state.entityStore ? state.entityStore.getEntities(TowerEntity).size : 0;
    const playing = runState.status === RunStatus.Playing;

    if (playing && lastServing && lastServing.servedAtMs !== lastSeenServedAtMs) {
        playSfx(servingSfx[lastServing.result]);
    }
    if (playing && lastSeenTowerCount != undefined && towerCount > lastSeenTowerCount) {
        playSfx(Sfx.Build);
    }
    if (playing && runState.lastSteal && runState.lastSteal.atMs !== lastSeenStealAtMs) {
        playSfx(Sfx.ServeRaw);
    }
    if (
        playing &&
        runState.lastBossSpawnAtMs >= 0 &&
        runState.lastBossSpawnAtMs !== lastSeenBossSpawnAtMs
    ) {
        playSfx(Sfx.BossArrives);
    }
    lastSeenBossSpawnAtMs = runState.lastBossSpawnAtMs;
    lastSeenStealAtMs = runState.lastSteal?.atMs;
    lastSeenServedAtMs = lastServing?.servedAtMs;
    lastSeenTowerCount = towerCount;
}

/** Renders the HUD overlay every tick from the current game state. */
export const hudMod = defineAnthaMod<FullGameState>({
    modName: 'hud',
    execute({state}) {
        /** The menus use the keyboard for text, so game hotkeys only work in the game itself. */
        const inGame = state.ui?.session.screen === SessionScreen.Playing;

        if (
            inGame &&
            state.runState &&
            (state.runState.status === RunStatus.Won || state.runState.status === RunStatus.Lost) &&
            state.ui &&
            (state.ui.keys.includes('r') || state.ui.keys.includes('R')) &&
            createHudSnapshot(state).isHost
        ) {
            getHudActions(state).restartRun();
        }

        if (inGame && state.runState?.status === RunStatus.Playing && state.ui) {
            const pausePressed = state.ui.keys.some((key) => key === 'p' || key === 'P');
            const escapePressed = state.ui.keys.includes('Escape') && !hadSelectionLastTick;

            if (pausePressed || escapePressed) {
                getHudActions(state).togglePause();
            }
            if (
                !isCoopRun(state.runState) &&
                state.ui.keys.some((key) => key === 'f' || key === 'F')
            ) {
                getHudActions(state).cycleSpeed();
            }
            if (
                !isCoopRun(state.runState) &&
                state.ui.keys.some((key) => key === 'g' || key === 'G')
            ) {
                getHudActions(state).speedUntilIncome();
            }
        }
        hadSelectionLastTick = !!(
            state.ui?.selectedTowerType ||
            state.ui?.selectedTopping ||
            state.ui?.selectedTowerId != undefined
        );

        if (inGame && state.runState?.status === RunStatus.Ready && state.ui?.keys.includes(' ')) {
            getHudActions(state).beginRun();
        }

        if (state.ui?.keys.includes('m') || state.ui?.keys.includes('M')) {
            setMuted(!isMuted());
        }
        playHudSounds(state);

        const renderer = state.pixi?.pixiApplication?.renderer;
        if (renderer) {
            ensureTowerIcons(renderer);
        }

        const volumes = getVolumes();
        if (state.audioChannelVolume?.channels?.[GameAudioChannel.Music] !== volumes.music) {
            state.audioChannelVolume = {
                channels: {
                    [GameAudioChannel.Music]: volumes.music,
                    [GameAudioChannel.Effects]: volumes.effects,
                },
                master: 1,
            };
        }

        const snapshot = createHudSnapshot(state);
        const simSpeed = simSpeedTracker.sample({
            elapsedMs: state.runState?.elapsedMs ?? 0,
            nowMs: performance.now(),
            running: state.runState?.status === RunStatus.Playing && !state.runState.paused,
        });
        /** Only a co-op host sees it. */
        if (simSpeed != undefined && snapshot.isCoop && snapshot.isHost) {
            snapshot.simSpeedPercent = Math.round(simSpeed * 20) * 5;
        }

        return html`
            <${GameHud.assign({
                snapshot,
                actions: getHudActions(state),
            })}></${GameHud}>
        `;
    },
});
