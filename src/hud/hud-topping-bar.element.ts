import {css, defineElement, html, listen} from 'element-vir';
import {Topping, toppingDefinitions} from '../order/topping.js';
import {type HudActions} from './hud-actions.js';
import {type HudSnapshot} from './hud-snapshot.js';

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
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            text-shadow: 0 2px 4px black;
        }

        button {
            background: rgba(20, 20, 20, 0.85);
            border: 4px solid rgba(255, 255, 255, 0.25);
            border-radius: 16px;
            box-sizing: border-box;
            color: white;
            cursor: pointer;
            font-family: inherit;
            height: 90px;
            width: 200px;
        }

        button.selected {
            border: 6px solid #ffffff;
            transform: translateX(-8px);
        }

        .content {
            align-items: center;
            display: flex;
            gap: 14px;
            justify-content: center;
        }

        .swatch {
            border-radius: 50%;
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
            font-weight: bold;
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
