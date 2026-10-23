import {css, defineElement, html} from 'element-vir';
import {type HudSnapshot} from './hud-snapshot.js';

/** Top-left panel: score, restaurant satisfaction, run progress. */
export const HudStats = defineElement<{
    snapshot: HudSnapshot;
}>()({
    tagName: 'hud-stats',
    styles: css`
        :host {
            display: block;
            left: 72px;
            position: absolute;
            text-shadow: 0 2px 4px black;
            top: 12px;
        }

        .title {
            font-size: 24px;
            font-weight: bold;
        }
    `,
    render() {
        /** Stub. Implemented in the "HUD, game over, and restart" issue. */
        return html`
            <div class="title">Colcannon Fodder</div>
        `;
    },
});
