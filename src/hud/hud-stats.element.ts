import {css, defineElement, html, keyed, nothing, unsafeCSS} from 'element-vir';
import {cozyPalette} from '../art/cozy.js';
import {RunStatus, ServingResult} from '../run/run-state.js';
import {coinIcon, starRow} from './hud-icons.js';
import {hudLayout} from './hud-layout.js';
import {type HudSnapshot} from './hud-snapshot.js';
import {hudFloatingTextStyles, hudPanelStyles} from './hud-theme.js';
import {starLabel} from './hud-tower-toolbar.element.js';

/** Appends the prestige change to a popup, like ` ★ +2.4`. Empty when prestige did not move. */
export function prestigeText(delta: number): string {
    if (!delta) {
        return '';
    }

    return `  ★ ${delta > 0 ? '+' : ''}${Math.round(delta * 10) / 10}`;
}

const popupContent: Record<
    ServingResult,
    {getText: (popup: NonNullable<HudSnapshot['servingPopup']>) => string; color: string}
> = {
    [ServingResult.Perfect]: {
        getText(popup) {
            return `Perfect mash! +${popup.scoreDelta}${prestigeText(popup.prestigeDelta)}`;
        },
        color: '#c4e07a',
    },
    [ServingResult.Incomplete]: {
        getText(popup) {
            /** Name how close it was, so an almost-done potato doesn't read as half-done. */
            const label =
                popup.progress >= 0.75
                    ? 'Almost mashed'
                    : popup.progress >= 0.4
                      ? 'Half-mashed'
                      : 'Barely touched';

            return `${label}... ${popup.satisfactionDelta}${prestigeText(popup.prestigeDelta)}`;
        },
        color: '#f6cf6a',
    },
    [ServingResult.Raw]: {
        getText(popup) {
            return `RAW POTATO! ${popup.satisfactionDelta}${prestigeText(popup.prestigeDelta)}`;
        },
        color: '#ff8f73',
    },
};

function getBarColor(ratio: number): string {
    if (ratio > 0.6) {
        return cozyPalette.grass;
    } else if (ratio > 0.3) {
        return cozyPalette.butter;
    } else {
        return cozyPalette.tomato;
    }
}

const noticeCenterX = hudLayout.noticeStrip.x + hudLayout.noticeStrip.width / 2;
const noticeCenterY = hudLayout.noticeStrip.y + hudLayout.noticeStrip.height / 2;

/** Top-left panel: score, restaurant satisfaction, run progress, plus the serving popup. */
export const HudStats = defineElement<{
    snapshot: HudSnapshot;
}>()({
    tagName: 'hud-stats',
    styles: css`
        :host {
            display: block;
            left: ${unsafeCSS(hudLayout.stats.x)}px;
            position: absolute;
            top: ${unsafeCSS(hudLayout.stats.y)}px;
        }

        .panel {
            ${hudPanelStyles}
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 8px 18px 10px;
            width: ${unsafeCSS(hudLayout.stats.width)}px;
        }

        .row {
            align-items: baseline;
            display: flex;
            gap: 16px;
            justify-content: space-between;
        }

        .score {
            font-size: 36px;
            font-weight: 700;
        }

        .coins {
            color: var(--hud-caramel);
            font-size: 36px;
            font-weight: 700;
        }

        .prestige {
            color: var(--hud-caramel);
            font-size: 28px;
            font-weight: 700;
        }

        .points {
            font-size: 20px;
            opacity: 0.7;
        }

        .unlock-bar {
            background: var(--hud-sand);
            border-radius: 3px;
            height: 6px;
            overflow: hidden;
        }

        .unlock-fill {
            background: var(--hud-pumpkin);
            height: 100%;
        }

        /* One slim row of colored chips, one per cook. */
        .players {
            display: flex;
            flex-wrap: wrap;
            font-size: 20px;
            gap: 4px 10px;
        }

        .player {
            border-left: 8px solid var(--slot-color);
            display: flex;
            gap: 6px;
            padding-left: 6px;
        }

        .player .name {
            font-weight: 600;
        }

        .wave {
            font-size: 24px;
            font-weight: 700;
        }

        .served {
            font-size: 22px;
            font-weight: 400;
        }

        /* Centered in the notice strip under the pause buttons. */
        .banner {
            ${hudFloatingTextStyles}
            color: var(--hud-cream);
            font-size: 40px;
            left: ${unsafeCSS(noticeCenterX - hudLayout.stats.x)}px;
            position: absolute;
            top: ${unsafeCSS(noticeCenterY - hudLayout.stats.y)}px;
            transform: translate(-50%, -50%);
            white-space: nowrap;
        }

        .bar-row {
            align-items: center;
            display: flex;
            font-size: 22px;
            gap: 12px;
        }

        .bar {
            background: var(--hud-sand);
            border: 3px solid var(--hud-bark);
            border-radius: 10px;
            box-sizing: border-box;
            flex: 1;
            height: 24px;
            overflow: hidden;
        }

        .bar-fill {
            height: 100%;
        }

        /* Serving and steal popups share the notice strip, then fade out quickly. */
        .popup {
            ${hudFloatingTextStyles}
            animation: popup-rise 1s linear forwards;
            font-size: 34px;
            left: ${unsafeCSS(noticeCenterX - hudLayout.stats.x)}px;
            position: absolute;
            top: ${unsafeCSS(noticeCenterY - hudLayout.stats.y)}px;
            transform: translate(-50%, -50%);
            white-space: nowrap;
        }

        @keyframes popup-rise {
            from {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
            to {
                opacity: 0;
                transform: translate(-50%, calc(-50% - 16px));
            }
        }
    `,
    render({inputs}) {
        const snapshot = inputs.snapshot;
        const ratio = snapshot.satisfaction / snapshot.maxSatisfaction;
        const popup = snapshot.servingPopup;
        const popupInfo = popup && popupContent[popup.result];

        return html`
            <div class="panel">
                <div class="row">
                    <span class="score">Score ${snapshot.totalScore.toLocaleString('en-US')}</span>
                    <span class="coins">${coinIcon()} ${snapshot.coins}</span>
                </div>
                <div class="bar-row" title="Customer satisfaction">
                    <span>Customers</span>
                    <div class="bar">
                        <div
                            class="bar-fill"
                            style="width: ${Math.max(0, Math.min(1, ratio)) *
                            100}%; background: ${getBarColor(ratio)}"
                        ></div>
                    </div>
                    <span>${snapshot.satisfaction}/${snapshot.maxSatisfaction}</span>
                </div>
                <div class="row prestige">
                    <span>Prestige ${starRow(snapshot.prestigeStars)}</span>
                    <span class="points">${snapshot.prestigePoints}</span>
                </div>
                ${snapshot.unlockProgress
                    ? html`
                          <div
                              class="unlock-bar"
                              title="Progress to ${starLabel(snapshot.unlockProgress.nextStars)}"
                          >
                              <div
                                  class="unlock-fill"
                                  style="width: ${snapshot.unlockProgress.fraction * 100}%"
                              ></div>
                          </div>
                      `
                    : nothing}
                <div class="row wave">
                    <span>
                        Wave
                        ${snapshot.waveNumber}${snapshot.mode === 'endless'
                            ? ''
                            : ` / ${snapshot.waveCount}`}${snapshot.isBossWave ? ' 👑' : ''}
                    </span>
                    <span class="served">Served ${snapshot.potatoesServed}</span>
                </div>
                ${snapshot.playerCount > 1
                    ? html`
                          <div class="players">
                              ${snapshot.contributions.map((entry) => {
                                  return html`
                                      <div class="player" style="--slot-color: ${entry.color}">
                                          <span class="name">${entry.name}</span>
                                          <span>${entry.points.toLocaleString('en-US')}</span>
                                      </div>
                                  `;
                              })}
                          </div>
                      `
                    : nothing}
            </div>
            ${snapshot.wavePhase === 'break' && snapshot.status !== RunStatus.Ready
                ? html`
                      <div class="banner">
                          ${snapshot.waveNumber === 1
                              ? 'Get ready! Wave 1 in'
                              : `Wave ${snapshot.waveNumber} incoming in`}
                          ${snapshot.breakSecondsLeft}...
                      </div>
                  `
                : nothing}
            ${snapshot.stealPopup
                ? keyed(
                      snapshot.stealPopup.id,
                      html`
                          <div class="popup" style="color: #ff8f73">
                              A seagull stole a potato!
                              ${snapshot.stealPopup.satisfactionDelta}${prestigeText(
                                  snapshot.stealPopup.prestigeDelta,
                              )}
                          </div>
                      `,
                  )
                : nothing}
            ${popup && popupInfo
                ? keyed(
                      popup.id,
                      html`
                          <div class="popup" style="color: ${popupInfo.color}">
                              ${popupInfo.getText(popup)}
                          </div>
                      `,
                  )
                : nothing}
        `;
    },
});
