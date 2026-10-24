import {css, defineElement, html, nothing} from 'element-vir';
import {RunStatus} from '../run/run-state.js';
import {formatSpeed} from '../run/speed.js';
import {type HudActions} from './hud-actions.js';
import {coinIcon} from './hud-icons.js';
import {type HudSnapshot} from './hud-snapshot.js';
import {
    hudButtonStyles,
    hudPanelStyles,
    hudPrimaryButtonStyles,
    hudScrimStyles,
    hudSelectedStyles,
} from './hud-theme.js';

/** The pause button (top center) while playing, and the full-screen pause panel while paused. */
export const HudPause = defineElement<{
    snapshot: HudSnapshot;
    actions: HudActions;
}>()({
    tagName: 'hud-pause',
    styles: css`
        [hidden] {
            display: none !important;
        }

        :host {
            display: block;
        }

        .pause-button {
            ${hudButtonStyles}
            border-radius: 14px;
            font-size: 32px;
            height: 64px;
            left: 928px;
            padding: 0;
            pointer-events: auto;
            position: absolute;
            top: 16px;
            width: 64px;
        }

        .speed-button {
            ${hudButtonStyles}
            border-radius: 14px;
            font-size: 28px;
            height: 64px;
            padding: 0 16px;
            pointer-events: auto;
            position: absolute;
            top: 16px;
            white-space: nowrap;
        }

        .speed-button.armed {
            ${hudSelectedStyles}
        }

        .layer {
            align-items: center;
            ${hudScrimStyles}
            display: flex;
            inset: 0;
            justify-content: center;
            pointer-events: auto;
            position: absolute;
            z-index: 1;
        }

        .panel {
            ${hudPanelStyles}
            border-radius: 28px;
            border-width: 6px;
            padding: 24px 48px 28px;
            text-align: center;
            width: 1100px;
        }

        .title {
            color: var(--hud-oak);
            font-size: 60px;
            font-weight: 700;
            margin-bottom: 16px;
        }

        .volume {
            align-items: center;
            display: flex;
            font-size: 26px;
            gap: 24px;
            justify-content: center;
            margin-bottom: 4px;
        }

        .volume label {
            text-align: right;
            width: 260px;
        }

        .volume input {
            height: 40px;
            width: 700px;
        }

        .volume .percent {
            text-align: left;
            width: 100px;
        }

        .buttons {
            margin-top: 20px;
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
        }

        .buttons button {
            ${hudPrimaryButtonStyles}
            font-size: 32px;
            padding: 8px 28px;
        }

        .buttons button.secondary {
            background: var(--hud-wheat);
        }

        .volume input {
            accent-color: var(--hud-pumpkin);
        }
    `,
    render({inputs}) {
        const snapshot = inputs.snapshot;

        if (snapshot.status !== RunStatus.Playing) {
            return html`
                ${nothing}
            `;
        }

        return html`
            ${snapshot.paused
                ? html`
                      <div class="layer">
                          <div class="panel">
                              <div class="title">
                                  Paused${snapshot.pausedByName
                                      ? ` by ${snapshot.pausedByName}`
                                      : ''}
                              </div>
                              ${(
                                  [
                                      [
                                          'music',
                                          'Music',
                                      ],
                                      [
                                          'effects',
                                          'Sound effects',
                                      ],
                                  ] as const
                              ).map(
                                  ([
                                      kind,
                                      label,
                                  ]) => {
                                      const percent = Math.round(snapshot.volumes[kind] * 100);
                                      return html`
                                          <div class="volume">
                                              <label>${label}</label>
                                              <input
                                                  type="range"
                                                  min="0"
                                                  max="100"
                                                  .value=${String(percent)}
                                                  @input=${(event: Event) => {
                                                      if (
                                                          event.target instanceof HTMLInputElement
                                                      ) {
                                                          inputs.actions.setVolume(
                                                              kind,
                                                              Number(event.target.value) / 100,
                                                          );
                                                      }
                                                  }}
                                              />
                                              <span class="percent">${percent}%</span>
                                          </div>
                                      `;
                                  },
                              )}
                              <div class="buttons">
                                  <button
                                      @click=${() => {
                                          inputs.actions.togglePause();
                                      }}
                                  >
                                      Resume (P)
                                  </button>
                                  <button
                                      class="secondary"
                                      @click=${() => {
                                          inputs.actions.openHelp();
                                      }}
                                  >
                                      Help (H)
                                  </button>
                                  <button
                                      class="secondary"
                                      ?hidden=${!snapshot.isHost}
                                      @click=${() => {
                                          inputs.actions.restartRun();
                                      }}
                                  >
                                      Restart
                                  </button>
                                  <button
                                      class="secondary"
                                      @click=${() => {
                                          inputs.actions.goToMainMenu();
                                      }}
                                  >
                                      Main menu
                                  </button>
                              </div>
                          </div>
                      </div>
                  `
                : nothing}
            <button
                class="pause-button"
                @click=${() => {
                    inputs.actions.togglePause();
                }}
            >
                ⏸
            </button>
            <button
                class="speed-button"
                ?hidden=${snapshot.isCoop}
                style="left: 1004px; width: 150px;"
                title="Fast-forward (F)"
                @click=${() => {
                    inputs.actions.cycleSpeed();
                }}
            >
                ⏩ ${formatSpeed(snapshot.speed)}
            </button>
            <button
                ?hidden=${snapshot.isCoop}
                class=${'speed-button' + (snapshot.resetSpeedOnIncome ? ' armed' : '')}
                style="left: 1170px; width: 190px;"
                title="Fast-forward until the next income (G)"
                @click=${() => {
                    inputs.actions.speedUntilIncome();
                }}
            >
                ⏩ until ${coinIcon()}
            </button>
        `;
    },
});
