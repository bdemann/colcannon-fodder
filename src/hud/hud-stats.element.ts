import {css, defineElement, html, keyed, nothing} from 'element-vir';
import {cozyPalette} from '../art/cozy.js';
import {RunStatus, ServingResult} from '../run/run-state.js';
import {coinIcon, starRow} from './hud-icons.js';
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

/** Top-left panel: score, restaurant satisfaction, run progress, plus the serving popup. */
export const HudStats = defineElement<{
    snapshot: HudSnapshot;
}>()({
    tagName: 'hud-stats',
    styles: css`
        :host {
            display: block;
            left: 72px;
            position: absolute;
            top: 16px;
        }

        .panel {
            ${hudPanelStyles}
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 12px 22px 14px;
            width: 520px;
        }

        .title {
            color: var(--hud-oak);
            font-size: 30px;
            font-weight: 700;
        }

        .score {
            font-size: 40px;
            font-weight: 700;
        }

        .coins {
            color: var(--hud-caramel);
            font-size: 36px;
            font-weight: 700;
        }

        .prestige {
            color: var(--hud-caramel);
            font-size: 30px;
            font-weight: 700;
        }

        .points {
            font-size: 22px;
            opacity: 0.7;
        }

        .unlock-bar {
            background: var(--hud-sand);
            border-radius: 4px;
            height: 8px;
            overflow: hidden;
            width: 330px;
        }

        .unlock-fill {
            background: var(--hud-pumpkin);
            height: 100%;
        }

        .hint {
            ${hudFloatingTextStyles}
            color: var(--hud-cream);
            font-size: 36px;
            left: 888px;
            position: absolute;
            top: 800px;
            transform: translateX(-50%);
            white-space: nowrap;
        }

        .players {
            border-top: 3px solid var(--hud-sand);
            display: flex;
            flex-direction: column;
            font-size: 26px;
            gap: 2px;
            margin-top: 4px;
            padding-top: 6px;
        }

        .player {
            align-items: center;
            border-left: 10px solid var(--slot-color);
            display: flex;
            gap: 12px;
            padding-left: 10px;
        }

        .player .name {
            flex: 1;
            font-weight: 600;
        }

        .wave {
            font-size: 30px;
            font-weight: 700;
        }

        /* The host is at (72, 16), so these offsets put the banner's center at world (960, 200). */
        .banner {
            ${hudFloatingTextStyles}
            color: var(--hud-cream);
            font-size: 56px;
            left: 888px;
            position: absolute;
            top: 184px;
            transform: translate(-50%, -50%);
            white-space: nowrap;
        }

        .label {
            font-size: 26px;
        }

        .bar-row {
            align-items: center;
            display: flex;
            font-size: 26px;
            gap: 16px;
        }

        .bar {
            background: var(--hud-sand);
            border: 3px solid var(--hud-bark);
            border-radius: 10px;
            box-sizing: border-box;
            height: 30px;
            overflow: hidden;
            width: 330px;
        }

        .bar-fill {
            height: 100%;
        }

        /* The host is at (72, 16), so these offsets put the popup's center at world (960, 380). */
        .popup {
            ${hudFloatingTextStyles}
            animation: popup-rise 1.2s linear forwards;
            font-size: 44px;
            left: 888px;
            position: absolute;
            top: 364px;
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
                transform: translate(-50%, calc(-50% - 60px));
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
                <div class="title">Colcannon Fodder</div>
                <div class="score">Score ${snapshot.totalScore.toLocaleString('en-US')}</div>
                <div class="coins">${coinIcon()} ${snapshot.coins}</div>
                <div class="label">Customer satisfaction</div>
                <div class="bar-row">
                    <div class="bar">
                        <div
                            class="bar-fill"
                            style="width: ${Math.max(0, Math.min(1, ratio)) *
                            100}%; background: ${getBarColor(ratio)}"
                        ></div>
                    </div>
                    <span>${snapshot.satisfaction} / ${snapshot.maxSatisfaction}</span>
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
                <div class="prestige">
                    Prestige ${starRow(snapshot.prestigeStars)}
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
                <div class="wave">
                    Wave
                    ${snapshot.waveNumber}${snapshot.mode === 'endless'
                        ? ''
                        : ` / ${snapshot.waveCount}`}${snapshot.isBossWave ? ' 👑' : ''}
                </div>
                <div class="label">Potatoes served ${snapshot.potatoesServed}</div>
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
            ${snapshot.tutorialHint
                ? html`
                      <div class="hint">${snapshot.tutorialHint}</div>
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
