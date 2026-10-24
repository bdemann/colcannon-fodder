import {css, defineElement, html, nothing} from 'element-vir';
import {type HudSnapshot} from './hud-snapshot.js';

/** Top-center banner (below the pause button) announcing the boss for a few seconds. */
export const HudBossBanner = defineElement<{
    snapshot: HudSnapshot;
}>()({
    tagName: 'hud-boss-banner',
    styles: css`
        :host {
            display: block;
        }

        .banner {
            -webkit-text-stroke: 3px black;
            color: #ffd700;
            font-size: 64px;
            font-weight: bold;
            left: 0;
            paint-order: stroke fill;
            position: absolute;
            right: 0;
            text-align: center;
            top: 100px;
        }
    `,
    render({inputs}) {
        if (!inputs.snapshot.bossBanner) {
            return html`
                ${nothing}
            `;
        }
        return html`
            <div class="banner">👑 The Russet King approaches!</div>
        `;
    },
});
