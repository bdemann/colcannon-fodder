import {defineAnthaMod} from '@antha/engine';
import {html} from 'element-vir';
import {isMuted, playSfx, setMuted, Sfx} from '../audio/sfx.js';
import {type FullGameState} from '../game-state/game-state.js';
import {RunStatus, ServingResult} from '../run/run-state.js';
import {TowerEntity} from '../tower/tower.entity.js';
import {getHudActions} from './hud-actions.js';
import {createHudSnapshot} from './hud-snapshot.js';
import {GameHud} from './hud.element.js';

const servingSfx: Record<ServingResult, Sfx> = {
    [ServingResult.Perfect]: Sfx.ServePerfect,
    [ServingResult.Incomplete]: Sfx.ServeBad,
    [ServingResult.Raw]: Sfx.ServeRaw,
};

/** Presentation-only trackers so each serving and each new tower plays one sound. */
let lastSeenServedAtMs: number | undefined;
let lastSeenTowerCount: number | undefined;

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
    lastSeenServedAtMs = lastServing?.servedAtMs;
    lastSeenTowerCount = towerCount;
}

/** Renders the HUD overlay every tick from the current game state. */
export const hudMod = defineAnthaMod<FullGameState>({
    modName: 'hud',
    execute({state}) {
        if (
            state.runState &&
            (state.runState.status === RunStatus.Won || state.runState.status === RunStatus.Lost) &&
            state.ui &&
            (state.ui.keys.includes('r') || state.ui.keys.includes('R'))
        ) {
            getHudActions(state).restartRun();
        }

        if (state.runState?.status === RunStatus.Ready && state.ui?.keys.includes(' ')) {
            getHudActions(state).beginRun();
        }

        if (state.ui?.keys.includes('m') || state.ui?.keys.includes('M')) {
            setMuted(!isMuted());
        }
        playHudSounds(state);

        return html`
            <${GameHud.assign({
                snapshot: createHudSnapshot(state),
                actions: getHudActions(state),
            })}></${GameHud}>
        `;
    },
});
