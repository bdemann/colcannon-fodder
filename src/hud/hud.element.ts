import {css, defineElement, html} from 'element-vir';
import {type HudSnapshot} from './hud-snapshot.js';

/**
 * The HTML overlay drawn on top of the canvas. The host ignores pointer events so clicks reach the
 * canvas; any interactive child must set `pointer-events: auto`.
 */
export const GameHud = defineElement<{
    snapshot: HudSnapshot;
}>()({
    tagName: 'game-hud',
    styles: css`
        :host {
            color: white;
            display: block;
            font-family: sans-serif;
            inset: 0;
            pointer-events: none;
            position: absolute;
        }

        .title {
            font-size: 24px;
            font-weight: bold;
            left: 16px;
            position: absolute;
            text-shadow: 0 2px 4px black;
            top: 12px;
        }
    `,
    render({inputs}) {
        const pointer = inputs.snapshot.pointerWorld;

        return html`
            <div class="title">
                Colcannon Fodder
                ${pointer ? `(${Math.round(pointer.x)}, ${Math.round(pointer.y)})` : ''}
            </div>
        `;
    },
});
