import {css, defineElement, html, listen, unsafeCSS} from 'element-vir';
import {Topping, toppingDefinitions} from '../order/topping.js';
import {type HudActions} from './hud-actions.js';
import {hudLayout} from './hud-layout.js';
import {type HudSnapshot} from './hud-snapshot.js';
import {hudButtonStyles, hudSelectedStyles} from './hud-theme.js';

/** Right-edge row of small buttons, one per topping (Q/W/E/R). The label shows on hover. */
export const HudToppingBar = defineElement<{
    snapshot: HudSnapshot;
    actions: HudActions;
}>()({
    tagName: 'hud-topping-bar',
    styles: css`
        :host {
            display: flex;
            gap: 6px;
            left: ${unsafeCSS(hudLayout.toppings.x)}px;
            pointer-events: auto;
            position: absolute;
            top: ${unsafeCSS(hudLayout.toppings.y)}px;
        }

        button {
            ${hudButtonStyles}
            align-items: center;
            border-radius: 14px;
            display: flex;
            flex-direction: column;
            gap: 2px;
            height: 64px;
            justify-content: center;
            padding: 0;
            width: 64px;
        }

        button.selected {
            ${hudSelectedStyles}
            transform: translateY(-4px);
        }

        .swatch {
            border: 3px solid var(--hud-bark);
            border-radius: 50%;
            box-sizing: border-box;
            flex-shrink: 0;
            height: 28px;
            width: 28px;
        }

        .hotkey {
            font-size: 20px;
            line-height: 1;
        }
    `,
    render({inputs}) {
        const selected = inputs.snapshot.selectedTopping;

        return html`
            ${Object.values(Topping).map((topping) => {
                const definition = toppingDefinitions[topping];

                return html`
                    <button
                        title="${definition.label} [${definition.hotkey.toUpperCase()}]"
                        class=${topping === selected ? 'selected' : ''}
                        ${listen('click', () => {
                            inputs.actions.selectTopping(
                                topping === selected ? undefined : topping,
                            );
                        })}
                    >
                        <div class="swatch" style="background: ${definition.color}"></div>
                        <span class="hotkey">${definition.hotkey.toUpperCase()}</span>
                    </button>
                `;
            })}
        `;
    },
});
