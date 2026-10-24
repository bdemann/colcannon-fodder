import {css, defineElement, html, nothing} from 'element-vir';
import {type HudSnapshot} from './hud-snapshot.js';
import {hudPanelStyles} from './hud-theme.js';

/** Small icon left of the order board shown while sound effects are muted (toggle with the `m` key). */
export const HudMute = defineElement<{
    snapshot: HudSnapshot;
}>()({
    tagName: 'hud-mute',
    styles: css`
        :host {
            display: block;
        }

        .icon {
            ${hudPanelStyles}
            border-radius: 14px;
            font-size: 40px;
            line-height: 1;
            padding: 6px 10px;
            position: absolute;
            right: 344px;
            top: 16px;
        }
    `,
    render({inputs}) {
        if (!inputs.snapshot.muted) {
            return html`
                ${nothing}
            `;
        }
        return html`
            <div class="icon">🔇</div>
        `;
    },
});
