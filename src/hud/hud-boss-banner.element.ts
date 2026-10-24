import {css, defineElement, html, nothing} from 'element-vir';
import {type HudSnapshot} from './hud-snapshot.js';
import {hudFloatingTextStyles} from './hud-theme.js';

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
            ${hudFloatingTextStyles}
            color: var(--hud-butter);
            font-size: 64px;
            left: 0;
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
