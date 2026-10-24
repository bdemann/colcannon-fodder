import {css, defineElement, html, keyed, nothing, unsafeCSS} from 'element-vir';
import {cozyPalette} from '../art/cozy.js';
import {hudConfig} from '../config/game-config.js';
import {dishDefinitions} from '../order/dish.js';
import {toppingDefinitions} from '../order/topping.js';
import {hudLayout} from './hud-layout.js';
import {type HudSnapshot} from './hud-snapshot.js';
import {prestigeText} from './hud-stats.element.js';
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
            gap: 6px;
            left: ${unsafeCSS(hudLayout.orders.x)}px;
            position: absolute;
            text-shadow: none;
            top: ${unsafeCSS(hudLayout.orders.y)}px;
            width: ${unsafeCSS(hudLayout.orders.width)}px;
        }

        .title {
            ${hudPanelStyles}
            border-radius: 12px;
            font-size: 24px;
            font-weight: 700;
            padding: 0;
            text-align: center;
        }

        .ticket {
            background: var(--hud-cream);
            border: 3px solid var(--hud-bark);
            border-left: 10px solid var(--hud-tomato);
            border-radius: 6px 12px 12px 6px;
            box-shadow: 0 3px 0 rgba(43, 26, 18, 0.35);
            box-sizing: border-box;
            color: var(--hud-walnut);
            padding: 4px 12px 6px;
            width: 100%;
        }

        .dish {
            font-size: 26px;
            font-weight: 700;
            line-height: 1.15;
            white-space: nowrap;
        }

        .recipe {
            display: flex;
            flex-wrap: wrap;
            gap: 0 10px;
        }

        .ingredient {
            align-items: center;
            display: flex;
            font-size: 18px;
            gap: 4px;
        }

        .swatch {
            border: 2px solid var(--hud-bark);
            border-radius: 50%;
            box-sizing: border-box;
            height: 18px;
            width: 18px;
        }

        .time-bar {
            background: var(--hud-sand);
            border: 2px solid var(--hud-bark);
            border-radius: 5px;
            box-sizing: border-box;
            height: 10px;
            margin-top: 4px;
            overflow: hidden;
            width: 100%;
        }

        .time-fill {
            height: 100%;
        }

        .more {
            ${hudPanelStyles}
            border-radius: 12px;
            font-size: 22px;
            font-weight: 700;
            padding: 0;
            text-align: center;
        }

        /* Floats left of the board so it never pushes the tickets around. */
        .popup {
            animation: order-popup-rise 1.2s linear forwards;
            ${hudFloatingTextStyles}
            font-size: 26px;
            left: ${unsafeCSS(hudLayout.orderPopup.x - hudLayout.orders.x)}px;
            position: absolute;
            text-align: right;
            top: ${unsafeCSS(hudLayout.orderPopup.y - hudLayout.orders.y)}px;
            width: ${unsafeCSS(hudLayout.orderPopup.width)}px;
        }

        @keyframes order-popup-rise {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-16px);
            }
        }
    `,
    render({inputs}) {
        const {orders, orderPopup} = inputs.snapshot;

        return html`
            <div class="title">ORDERS</div>
            ${orders.slice(0, hudConfig.maxVisibleOrders).map((order) => {
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
            ${orders.length > hudConfig.maxVisibleOrders
                ? html`
                      <div class="more">+${orders.length - hudConfig.maxVisibleOrders} more</div>
                  `
                : nothing}
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
                                  ? `${dishDefinitions[orderPopup.dish].label} served! +${orderPopup.scoreDelta}${prestigeText(orderPopup.prestigeDelta)}`
                                  : `${dishDefinitions[orderPopup.dish].label} order expired! ${orderPopup.satisfactionDelta}${prestigeText(orderPopup.prestigeDelta)}`}
                          </div>
                      `,
                  )
                : nothing}
        `;
    },
});
