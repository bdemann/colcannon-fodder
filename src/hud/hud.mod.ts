import {defineAnthaMod} from '@antha/engine';
import {html} from 'element-vir';
import {type FullGameState} from '../game-state/game-state.js';
import {RunStatus} from '../run/run-state.js';
import {getHudActions} from './hud-actions.js';
import {createHudSnapshot} from './hud-snapshot.js';
import {GameHud} from './hud.element.js';

/** Renders the HUD overlay every tick from the current game state. */
export const hudMod = defineAnthaMod<FullGameState>({
    modName: 'hud',
    execute({state}) {
        if (
            state.runState &&
            state.runState.status !== RunStatus.Playing &&
            state.ui &&
            (state.ui.keys.includes('r') || state.ui.keys.includes('R'))
        ) {
            getHudActions(state).restartRun();
        }

        return html`
            <${GameHud.assign({
                snapshot: createHudSnapshot(state),
                actions: getHudActions(state),
            })}></${GameHud}>
        `;
    },
});
