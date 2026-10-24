import {css, defineElement, html, keyed, nothing} from 'element-vir';
import {formatStars} from '../quality/quality.js';
import {RunStatus, ServingResult} from '../run/run-state.js';
import {type HudSnapshot} from './hud-snapshot.js';

const popupContent: Record<
    ServingResult,
    {getText: (popup: NonNullable<HudSnapshot['servingPopup']>) => string; color: string}
> = {
    [ServingResult.Perfect]: {
        getText(popup) {
            return `Perfect mash! +${popup.scoreDelta}`;
        },
        color: '#7CFC00',
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

            return `${popup.sentBack ? 'Sent back! ' : ''}${label}... ${popup.satisfactionDelta}`;
        },
        color: '#ffc107',
    },
    [ServingResult.Raw]: {
        getText(popup) {
            if (popup.sentBack) {
                return `Sent back! Barely touched... ${popup.satisfactionDelta}`;
            }
            return `RAW POTATO! ${popup.satisfactionDelta}`;
        },
        color: '#ff5252',
    },
};

function getBarColor(ratio: number): string {
    if (ratio > 0.6) {
        return '#4caf50';
    } else if (ratio > 0.3) {
        return '#ffc107';
    } else {
        return '#f44336';
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
            text-shadow: 0 3px 6px black;
            top: 16px;
        }

        .title {
            font-size: 32px;
            font-weight: bold;
        }

        .score {
            font-size: 40px;
            font-weight: bold;
        }

        .coins {
            color: #ffd700;
            font-size: 36px;
            font-weight: bold;
        }

        .prestige {
            color: #ffd700;
            font-size: 30px;
            font-weight: bold;
        }

        .wave {
            font-size: 30px;
            font-weight: bold;
        }

        /* The host is at (72, 16), so these offsets put the banner's center at world (960, 200). */
        .banner {
            color: #ffffff;
            font-size: 56px;
            font-weight: bold;
            left: 888px;
            position: absolute;
            text-shadow: 0 3px 6px black;
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
            background: rgba(0, 0, 0, 0.5);
            border: 3px solid white;
            border-radius: 8px;
            box-sizing: border-box;
            height: 30px;
            overflow: hidden;
            width: 420px;
        }

        .bar-fill {
            height: 100%;
        }

        /* The host is at (72, 16), so these offsets put the popup's center at world (960, 380). */
        .popup {
            animation: popup-rise 1.2s linear forwards;
            font-size: 44px;
            font-weight: bold;
            left: 888px;
            position: absolute;
            text-shadow: 0 3px 6px black;
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
            <div class="title">Colcannon Fodder</div>
            <div class="score">Score ${snapshot.totalScore.toLocaleString('en-US')}</div>
            <div class="coins">🪙 ${snapshot.coins}</div>
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
            <div class="prestige">Prestige ${formatStars(snapshot.prestigeStars)}</div>
            <div class="wave">Wave ${snapshot.waveNumber} / ${snapshot.waveCount}</div>
            <div class="label">Potatoes served ${snapshot.potatoesServed}</div>
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
                          <div class="popup" style="color: #ff5252">
                              A seagull stole a potato! ${snapshot.stealPopup.satisfactionDelta}
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
