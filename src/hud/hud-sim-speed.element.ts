import {css, defineElement, html, nothing} from 'element-vir';
import {type HudSnapshot} from './hud-snapshot.js';
import {hudPanelStyles} from './hud-theme.js';

/**
 * Shows the co-op host the measured sim speed as a percent of real time. Below 100% a slow peer is
 * holding every frame back.
 */
export const HudSimSpeed = defineElement<{
    snapshot: HudSnapshot;
}>()({
    tagName: 'hud-sim-speed',
    styles: css`
        :host {
            display: block;
        }

        .badge {
            ${hudPanelStyles}
            border-radius: 14px;
            font-size: 30px;
            padding: 6px 14px;
            position: absolute;
            right: 344px;
            top: 90px;
        }
    `,
    render({inputs}) {
        if (inputs.snapshot.simSpeedPercent == undefined) {
            return html`
                ${nothing}
            `;
        }
        return html`
            <div class="badge">Sim speed ${inputs.snapshot.simSpeedPercent}%</div>
        `;
    },
});
