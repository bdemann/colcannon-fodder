import {css, defineElement, html, keyed} from 'element-vir';
import {hudConfig} from '../config/game-config.js';
import {coinIcon} from './hud-icons.js';
import {type HudSnapshot} from './hud-snapshot.js';

/** Floating "+coins" text with the reason, shown where each coin event happened. */
export const HudCoinPopups = defineElement<{
    snapshot: HudSnapshot;
}>()({
    tagName: 'hud-coin-popups',
    styles: css`
        :host {
            display: block;
        }

        .popup {
            animation: float-up ${hudConfig.coinPopupMs}ms ease-out forwards;
            -webkit-text-stroke: 6px var(--hud-bark);
            font-weight: 700;
            paint-order: stroke fill;
            position: absolute;
            text-align: center;
            transform: translate(-50%, -100%);
            line-height: 1.1;
            white-space: nowrap;
        }

        .amount {
            color: var(--hud-butter);
            font-size: 34px;
        }

        .amount.spent {
            color: #ff8f73;
        }

        .amount.zero {
            color: var(--hud-stone);
        }

        .reason {
            color: var(--hud-cream);
            font-size: 22px;
        }

        @keyframes float-up {
            0% {
                margin-top: 0;
                opacity: 1;
            }
            60% {
                opacity: 1;
            }
            100% {
                margin-top: -${hudConfig.coinPopupRisePx}px;
                opacity: 0;
            }
        }
    `,
    render({inputs}) {
        return html`
            ${inputs.snapshot.coinPopups.map((popup) => {
                return keyed(
                    popup.id,
                    html`
                        <div
                            class="popup"
                            style="left: ${popup.x}px; top: ${popup.y -
                            hudConfig.coinPopupOffsetPx -
                            popup.staggerPx}px"
                        >
                            <div
                                class="amount ${popup.amount > 0
                                    ? ''
                                    : popup.amount < 0
                                      ? 'spent'
                                      : 'zero'}"
                            >
                                ${popup.amount > 0 ? '+' : ''}${coinIcon()} ${popup.amount}
                            </div>
                            <div class="reason">${popup.reason}</div>
                        </div>
                    `,
                );
            })}
        `;
    },
});
