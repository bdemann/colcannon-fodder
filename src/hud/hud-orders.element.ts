import {css, defineElement, html, keyed, nothing} from 'element-vir';
import {cozyPalette} from '../art/cozy.js';
import {dishDefinitions} from '../order/dish.js';
import {toppingDefinitions} from '../order/topping.js';
import {type HudSnapshot} from './hud-snapshot.js';
import {hudFloatingTextStyles, hudPanelStyles} from './hud-theme.js';

/** Time bar color: green, turning red under this fraction of time left. */
const lowTimeFraction = 0.3;

/** Top-right order board: one ticket per open order, plus a popup for the latest outcome. */
export const HudOrders = defineElement<{
    snapshot: HudSnapshot;
}>()({
    tagName: 'hud-orders',
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
            gap: 10px;
            position: absolute;
            right: 24px;
            text-shadow: none;
            top: 24px;
            width: 300px;
        }

        .title {
            ${hudPanelStyles}
            border-radius: 14px;
            font-size: 28px;
            font-weight: 700;
            padding: 2px 0;
            text-align: center;
        }

        .ticket {
            background: var(--hud-cream);
            border: 3px solid var(--hud-bark);
            border-left: 10px solid var(--hud-tomato);
            border-radius: 6px 12px 12px 6px;
            box-shadow: 0 4px 0 rgba(43, 26, 18, 0.35);
            box-sizing: border-box;
            color: var(--hud-walnut);
            padding: 8px 14px 10px;
            width: 300px;
        }

        .dish {
            font-size: 30px;
            font-weight: 700;
            white-space: nowrap;
        }

        .recipe {
            display: flex;
            flex-wrap: wrap;
            gap: 4px 12px;
        }

        .ingredient {
            align-items: center;
            display: flex;
            font-size: 20px;
            gap: 6px;
        }

        .swatch {
            border: 2px solid var(--hud-bark);
            border-radius: 50%;
            box-sizing: border-box;
            height: 24px;
            width: 24px;
        }

        .time-bar {
            background: var(--hud-sand);
            border: 2px solid var(--hud-bark);
            border-radius: 6px;
            box-sizing: border-box;
            height: 14px;
            margin-top: 8px;
            overflow: hidden;
            width: 100%;
        }

        .time-fill {
            height: 100%;
        }

        .popup {
            align-self: flex-end;
            animation: order-popup-rise 1.2s linear forwards;
            ${hudFloatingTextStyles}
            font-size: 34px;
            text-align: right;
            white-space: nowrap;
        }

        @keyframes order-popup-rise {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-40px);
            }
        }
    `,
    render({inputs}) {
        const {orders, orderPopup} = inputs.snapshot;

        return html`
            <div class="title">ORDERS</div>
            ${orders.map((order) => {
                const dish = dishDefinitions[order.dish];

                return html`
                    <div class="ticket">
                        <div class="dish">${dish.label}</div>
                        <div class="recipe">
                            ${dish.toppings.map((topping) => {
                                const definition = toppingDefinitions[topping];

                                return html`
                                    <span class="ingredient">
                                        <span
                                            class="swatch"
                                            style="background: ${definition.color}"
                                        ></span>
                                        ${definition.label}
                                    </span>
                                `;
                            })}
                        </div>
                        <div class="time-bar">
                            <div
                                class="time-fill"
                                style="width: ${order.fractionLeft *
                                100}%; background: ${order.fractionLeft < lowTimeFraction
                                    ? cozyPalette.tomato
                                    : cozyPalette.grass}"
                            ></div>
                        </div>
                    </div>
                `;
            })}
            ${orderPopup
                ? keyed(
                      orderPopup.id,
                      html`
                          <div
                              class="popup"
                              style="color: ${orderPopup.kind === 'fulfilled'
                                  ? '#c4e07a'
                                  : '#ff8f73'}"
                          >
                              ${orderPopup.kind === 'fulfilled'
                                  ? `${dishDefinitions[orderPopup.dish].label} served! +${orderPopup.scoreDelta}`
                                  : `${dishDefinitions[orderPopup.dish].label} order expired! ${orderPopup.satisfactionDelta}`}
                          </div>
                      `,
                  )
                : nothing}
        `;
    },
});
