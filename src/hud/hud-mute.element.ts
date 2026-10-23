import {css, defineElement, html, nothing} from 'element-vir';
import {type HudSnapshot} from './hud-snapshot.js';

/** Small top-right icon shown while sound effects are muted (toggle with the `m` key). */
export const HudMute = defineElement<{
    snapshot: HudSnapshot;
}>()({
    tagName: 'hud-mute',
    styles: css`
        :host {
            display: block;
        }

        .icon {
            font-size: 48px;
            position: absolute;
            right: 24px;
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
