import {css, defineElement, html, nothing, unsafeCSS} from 'element-vir';
import {hudLayout} from './hud-layout.js';
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
            font-size: 40px;
            left: ${unsafeCSS(hudLayout.noticeStrip.x)}px;
            position: absolute;
            text-align: center;
            top: ${unsafeCSS(hudLayout.noticeStrip.y)}px;
            width: ${unsafeCSS(hudLayout.noticeStrip.width)}px;
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
