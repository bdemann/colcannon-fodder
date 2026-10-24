import {css, defineElement, html, nothing} from 'element-vir';
import {qualityConfig} from '../config/quality-config.js';
import {formatStars} from '../quality/quality.js';
import {RunStatus, ServingResult} from '../run/run-state.js';
import {type HudActions} from './hud-actions.js';
import {type HudSnapshot} from './hud-snapshot.js';

/** Full-screen win/lose panel with the run summary and a restart button. */
export const HudRunOver = defineElement<{
    snapshot: HudSnapshot;
    actions: HudActions;
}>()({
    tagName: 'hud-run-over',
    styles: css`
        :host {
            display: block;
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
            width: 900px;
        }

        .trophy {
            font-size: 140px;
        }

        .title {
            font-size: 72px;
            font-weight: bold;
        }

        .subtitle {
            font-size: 30px;
            margin-bottom: 24px;
        }

        .stars {
            color: #ffd700;
            font-size: 40px;
            font-weight: bold;
            margin-bottom: 24px;
        }

        .summary {
            font-size: 30px;
            margin-bottom: 32px;
        }

        button {
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

        if (snapshot.status === RunStatus.Playing || snapshot.status === RunStatus.Ready) {
            return html`
                ${nothing}
            `;
        }

        const won = snapshot.status === RunStatus.Won;
        const champ = won && snapshot.prestigeStars >= qualityConfig.mashChampStars;
        const survived = won && !champ;

        return html`
            <div class="layer">
                <div class="panel">
                    ${champ
                        ? html`
                              <div class="trophy">🏆</div>
                          `
                        : nothing}
                    <div
                        class="title"
                        style="color: ${champ
                            ? '#ffd700'
                            : survived
                              ? '#ffc107'
                              : '#ff5252'}; ${survived ? 'font-size: 64px' : ''}"
                    >
                        ${champ ? 'MASH CHAMP!' : survived ? 'Survived!' : 'Restaurant Closed'}
                    </div>
                    <div class="subtitle">
                        ${champ
                            ? 'Every customer went home full.'
                            : survived
                              ? '...but the critics found it a little rubbery.'
                              : 'The customers have had enough of your potatoes.'}
                    </div>
                    <div class="stars">Prestige ${formatStars(snapshot.prestigeStars)}</div>
                    <div class="summary">
                        <div>Score ${snapshot.totalScore.toLocaleString('en-US')}</div>
                        <div>Perfect mashes ${snapshot.servingCounts[ServingResult.Perfect]}</div>
                        <div>
                            Not fully mashed ${snapshot.servingCounts[ServingResult.Incomplete]}
                        </div>
                        <div>Raw ${snapshot.servingCounts[ServingResult.Raw]}</div>
                        <div>Stolen by seagulls ${snapshot.potatoesStolen}</div>
                    </div>
                    <button
                        @click=${() => {
                            inputs.actions.restartRun();
                        }}
                    >
                        Play again (R)
                    </button>
                </div>
            </div>
        `;
    },
});
