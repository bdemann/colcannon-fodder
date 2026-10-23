import {defineElement, html, nothing} from 'element-vir';
import {type HudActions} from './hud-actions.js';
import {type HudSnapshot} from './hud-snapshot.js';

/** Full-screen win/lose panel with the run summary and a restart button. */
export const HudRunOver = defineElement<{
    snapshot: HudSnapshot;
    actions: HudActions;
}>()({
    tagName: 'hud-run-over',
    render() {
        /** Stub. Implemented in the "HUD, game over, and restart" issue. */
        return html`
            ${nothing}
        `;
    },
});
