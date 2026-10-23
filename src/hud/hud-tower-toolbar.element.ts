import {defineElement, html, nothing} from 'element-vir';
import {type HudActions} from './hud-actions.js';
import {type HudSnapshot} from './hud-snapshot.js';

/** Bottom toolbar with one button per tower type. */
export const HudTowerToolbar = defineElement<{
    snapshot: HudSnapshot;
    actions: HudActions;
}>()({
    tagName: 'hud-tower-toolbar',
    render() {
        /** Stub. Implemented in the "Place towers beside the path" issue. */
        return html`
            ${nothing}
        `;
    },
});
