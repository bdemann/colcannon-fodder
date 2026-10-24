import {css, defineElement, html, listen} from 'element-vir';
import {Topping, toppingDefinitions} from '../order/topping.js';
import {type HudActions} from './hud-actions.js';
import {type HudSnapshot} from './hud-snapshot.js';
import {hudButtonStyles, hudPanelStyles, hudSelectedStyles} from './hud-theme.js';

/** Right-edge column with one button per topping (Q/W/E/R). */
export const HudToppingBar = defineElement<{
    snapshot: HudSnapshot;
    actions: HudActions;
}>()({
    tagName: 'hud-topping-bar',
    styles: css`
        :host {
            align-items: stretch;
            display: flex;
            flex-direction: column;
            gap: 12px;
            pointer-events: auto;
            position: absolute;
            right: 24px;
            top: 62%;
            transform: translateY(-50%);
        }

        .title {
            ${hudPanelStyles}
            border-radius: 14px;
            font-size: 24px;
            font-weight: 700;
            padding: 2px 0;
            text-align: center;
        }

        button {
            ${hudButtonStyles}
            border-radius: 16px;
            height: 90px;
            width: 200px;
        }

        button.selected {
            ${hudSelectedStyles}
            transform: translateX(-8px);
        }

        .content {
            align-items: center;
            display: flex;
            gap: 14px;
            justify-content: center;
        }

        .swatch {
            border: 3px solid var(--hud-bark);
            border-radius: 50%;
            box-sizing: border-box;
            flex-shrink: 0;
            height: 40px;
            width: 40px;
        }

        .text {
            align-items: flex-start;
            display: flex;
            flex-direction: column;
        }

        .label {
            font-size: 28px;
            font-weight: 700;
            white-space: nowrap;
        }

        .hotkey {
            font-size: 22px;
            opacity: 0.7;
        }
    `,
    render({inputs}) {
        const selected = inputs.snapshot.selectedTopping;

        return html`
            <div class="title">TOPPINGS</div>
            ${Object.values(Topping).map((topping) => {
                const definition = toppingDefinitions[topping];

                return html`
                    <button
                        class=${topping === selected ? 'selected' : ''}
                        ${listen('click', () => {
                            inputs.actions.selectTopping(
                                topping === selected ? undefined : topping,
                            );
                        })}
                    >
                        <div class="content">
                            <div class="swatch" style="background: ${definition.color}"></div>
                            <div class="text">
                                <span class="label">${definition.label}</span>
                                <span class="hotkey">[${definition.hotkey.toUpperCase()}]</span>
                            </div>
                        </div>
                    </button>
                `;
            })}
        `;
    },
});
