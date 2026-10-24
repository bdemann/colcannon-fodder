import {css, defineElement, html, nothing} from 'element-vir';
import {RunStatus} from '../run/run-state.js';
import {type HudActions} from './hud-actions.js';
import {type HudSnapshot} from './hud-snapshot.js';
import {controlsText, rules} from './hud-title.element.js';

/** The pause button (top center) while playing, and the full-screen pause panel while paused. */
export const HudPause = defineElement<{
    snapshot: HudSnapshot;
    actions: HudActions;
}>()({
    tagName: 'hud-pause',
    styles: css`
        :host {
            display: block;
        }

        .pause-button {
            background: rgba(20, 20, 20, 0.85);
            border: none;
            border-radius: 12px;
            color: white;
            cursor: pointer;
            font-size: 36px;
            height: 64px;
            left: 928px;
            padding: 0;
            pointer-events: auto;
            position: absolute;
            top: 16px;
            width: 64px;
        }

        .layer {
            align-items: center;
            background: rgba(0, 0, 0, 0.55);
            display: flex;
            inset: 0;
            justify-content: center;
            pointer-events: auto;
            position: absolute;
        }

        .panel {
            background: rgba(30, 20, 10, 0.95);
            border: 6px solid #f5e6c8;
            border-radius: 24px;
            box-sizing: border-box;
            padding: 48px;
            text-align: center;
            width: 1500px;
        }

        .title {
            color: #ffd700;
            font-size: 72px;
            font-weight: bold;
            margin-bottom: 24px;
        }

        .rules {
            font-size: 28px;
            line-height: 1.5;
            margin-bottom: 32px;
        }

        .controls {
            font-size: 24px;
            margin-bottom: 40px;
            opacity: 0.8;
        }

        .volume {
            align-items: center;
            display: flex;
            font-size: 28px;
            gap: 24px;
            justify-content: center;
            margin-bottom: 16px;
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
            margin-top: 24px;
            display: flex;
            gap: 32px;
            justify-content: center;
        }

        .buttons button {
            background: #ffd700;
            border: none;
            border-radius: 12px;
            color: #1a1a1a;
            cursor: pointer;
            font-size: 36px;
            font-weight: bold;
            padding: 16px 48px;
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
                              <div class="title">Paused</div>
                              <div class="rules">
                                  ${rules.map((rule) => {
                                      return html`
                                          <div>${rule}</div>
                                      `;
                                  })}
                              </div>
                              <div class="controls">${controlsText}</div>
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
                                      @click=${() => {
                                          inputs.actions.restartRun();
                                      }}
                                  >
                                      Restart
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
        `;
    },
});
