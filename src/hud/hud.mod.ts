import {defineAnthaMod} from '@antha/engine';
import {html} from 'element-vir';
import {type FullGameState} from '../game-state/game-state.js';
import {createHudSnapshot} from './hud-snapshot.js';
import {GameHud} from './hud.element.js';

/** Renders the HUD overlay every tick from the current game state. */
export const hudMod = defineAnthaMod<FullGameState>({
    modName: 'hud',
    execute({state}) {
        return html`
            <${GameHud.assign({
                snapshot: createHudSnapshot(state),
            })}></${GameHud}>
        `;
    },
});
