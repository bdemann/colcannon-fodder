import {css, defineElement, html, nothing} from 'element-vir';
import {qualityConfig} from '../config/quality-config.js';
import {RunStatus, ServingResult} from '../run/run-state.js';
import {type HudActions} from './hud-actions.js';
import {starRow} from './hud-icons.js';
import {type HudSnapshot} from './hud-snapshot.js';
import {hudPanelStyles, hudPrimaryButtonStyles, hudScrimStyles} from './hud-theme.js';

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
            ${hudScrimStyles}
            display: flex;
            inset: 0;
            justify-content: center;
            pointer-events: auto;
            position: absolute;
        }

        .panel {
            ${hudPanelStyles}
            border-radius: 28px;
            border-width: 6px;
            padding: 48px;
            text-align: center;
            width: 900px;
        }

        .trophy {
            font-size: 140px;
        }

        .title {
            font-size: 72px;
            font-weight: 700;
        }

        .subtitle {
            font-size: 30px;
            margin-bottom: 24px;
        }

        .stars {
            color: var(--hud-caramel);
            font-size: 40px;
            font-weight: 700;
            margin-bottom: 24px;
        }

        .summary {
            font-size: 30px;
            margin-bottom: 32px;
        }

        button {
            ${hudPrimaryButtonStyles}
        }
    `,
    render({inputs}) {
        const snapshot = inputs.snapshot;

        if (snapshot.status === RunStatus.Playing || snapshot.status === RunStatus.Ready) {
            return html`
                ${nothing}
            `;
        }

        const endless = snapshot.mode === 'endless';
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
                            ? 'var(--hud-caramel)'
                            : survived
                              ? 'var(--hud-pumpkin)'
                              : 'var(--hud-tomato)'}; ${survived ? 'font-size: 64px' : ''}"
                    >
                        ${champ ? 'MASH CHAMP!' : survived ? 'Survived!' : 'Restaurant Closed'}
                    </div>
                    <div class="subtitle">
                        ${endless
                            ? `The restaurant closed after ${snapshot.wavesReached} waves`
                            : champ
                              ? 'Every customer went home full.'
                              : survived
                                ? '...but the critics found it a little rubbery.'
                                : 'The customers have had enough of your potatoes.'}
                    </div>
                    ${endless
                        ? html`
                              <div class="subtitle">Best: ${snapshot.endlessBest} waves</div>
                          `
                        : nothing}
                    <div class="stars">Prestige ${starRow(snapshot.prestigeStars)}</div>
                    <div class="summary">
                        <div>Score ${snapshot.totalScore.toLocaleString('en-US')}</div>
                        <div>Coins earned ${snapshot.coinsEarned}</div>
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
