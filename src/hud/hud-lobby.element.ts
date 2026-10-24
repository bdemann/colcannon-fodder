import {css, defineElement, html, nothing} from 'element-vir';
import {levelSupportsPlayerCount} from '../level/level.js';
import {getLevel, getLevelsForPlayerCount} from '../level/levels.js';
import {RunStatus} from '../run/run-state.js';
import {type HudActions} from './hud-actions.js';
import {type HudSnapshot} from './hud-snapshot.js';
import {
    hudButtonStyles,
    hudPanelStyles,
    hudPrimaryButtonStyles,
    hudScrimStyles,
    hudSelectedStyles,
} from './hud-theme.js';
import {renderLevelPreview, renderRecord} from './hud-title.element.js';

/**
 * The co-op lobby: shown to everyone in a room while the run is `Ready`. Lists the players, lets
 * the host pick a map that fits them, and has the host-only Start button.
 */
export const HudLobby = defineElement<{
    snapshot: HudSnapshot;
    actions: HudActions;
}>()({
    tagName: 'hud-lobby',
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
            padding: 20px 48px 28px;
            text-align: center;
            width: 1500px;
        }

        .title {
            color: var(--hud-oak);
            font-size: 56px;
            font-weight: 700;
        }

        .section {
            color: var(--hud-oak);
            font-size: 30px;
            font-weight: 700;
            margin: 12px 0 8px;
        }

        .players {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
        }

        .player {
            align-items: center;
            border: 4px solid var(--hud-bark);
            border-radius: 14px;
            display: flex;
            font-size: 30px;
            gap: 14px;
            padding: 6px 20px;
        }

        .swatch {
            border: 3px solid var(--hud-bark);
            border-radius: 50%;
            box-sizing: border-box;
            height: 34px;
            width: 34px;
        }

        .status {
            font-size: 22px;
            opacity: 0.8;
        }

        .modes,
        .levels {
            display: flex;
            gap: 20px;
            justify-content: center;
            margin-bottom: 12px;
        }

        .mode {
            ${hudButtonStyles}
            font-size: 28px;
            padding: 6px 28px;
        }

        .mode.selected,
        .level-card.selected {
            ${hudSelectedStyles}
        }

        .level-card {
            ${hudButtonStyles}
            border-radius: 18px;
            display: flex;
            flex-direction: column;
            font-weight: 400;
            gap: 8px;
            padding: 12px;
            width: 340px;
        }

        .level-name {
            color: var(--hud-oak);
            font-size: 30px;
            font-weight: 700;
        }

        .level-description {
            font-size: 20px;
            min-height: 52px;
            opacity: 0.85;
        }

        .preview {
            align-self: center;
            border-radius: 6px;
            margin-top: auto;
        }

        .record {
            color: var(--hud-bark);
            font-size: 22px;
            font-weight: 700;
        }

        .hint {
            font-size: 26px;
            margin: 8px 0 12px;
        }

        button:disabled {
            cursor: default;
            opacity: 0.5;
        }

        .start {
            ${hudPrimaryButtonStyles}
        }
    `,
    render({inputs}) {
        const {snapshot, actions} = inputs;

        if (snapshot.status !== RunStatus.Ready || !snapshot.session.roomName) {
            return html`
                ${nothing}
            `;
        }

        const level = getLevel(snapshot.levelId);
        const fits = levelSupportsPlayerCount(level, snapshot.playerCount);
        const choices = getLevelsForPlayerCount(snapshot.playerCount);
        const playerWord = snapshot.playerCount === 1 ? 'player' : 'players';
        let hint: string;

        if (!snapshot.isHost) {
            hint = fits
                ? 'Waiting for the host to start...'
                : 'Waiting for the host to pick a map...';
        } else if (!choices.length) {
            hint = `No map supports ${snapshot.playerCount} ${playerWord}.`;
        } else if (fits) {
            hint = 'Everyone here will cook together.';
        } else {
            hint = `Pick a map for ${snapshot.playerCount} ${playerWord} to start.`;
        }

        return html`
            <div class="layer">
                <div class="panel">
                    <div class="title">${snapshot.session.roomName}</div>
                    <div class="section">Cooks in the kitchen</div>
                    <div class="players">
                        ${snapshot.lobbyPlayers.map((player) => {
                            return html`
                                <div class="player">
                                    <span class="swatch" style="background: ${player.color}"></span>
                                    <span>${player.name}${player.isYou ? ' (you)' : ''}</span>
                                    <span class="status">
                                        ${player.slot === 0 ? 'Host' : 'Ready'}
                                    </span>
                                </div>
                            `;
                        })}
                    </div>
                    <div class="section">
                        ${snapshot.isHost ? 'Pick a map' : 'Map chosen by the host'}
                    </div>
                    <div class="modes">
                        ${(
                            [
                                'campaign',
                                'endless',
                            ] as const
                        ).map((mode) => {
                            return html`
                                <button
                                    ?disabled=${!snapshot.isHost}
                                    class="mode ${mode === snapshot.mode ? 'selected' : ''}"
                                    @click=${() => {
                                        actions.selectMode(mode);
                                    }}
                                >
                                    ${mode === 'campaign' ? 'Campaign' : 'Endless'}
                                </button>
                            `;
                        })}
                    </div>
                    <div class="levels">
                        ${choices.map((choice) => {
                            return html`
                                <button
                                    ?disabled=${!snapshot.isHost}
                                    class="level-card ${choice.levelId === snapshot.levelId
                                        ? 'selected'
                                        : ''}"
                                    @click=${() => {
                                        actions.selectLevel(choice.levelId);
                                    }}
                                >
                                    <span class="level-name">${choice.name}</span>
                                    <span class="level-description">${choice.description}</span>
                                    ${renderRecord(snapshot, choice.levelId)}
                                    ${renderLevelPreview(choice)}
                                </button>
                            `;
                        })}
                    </div>
                    <div class="hint">${hint}</div>
                    <button
                        class="start"
                        ?disabled=${!snapshot.isHost || !fits}
                        @click=${() => {
                            actions.beginRun();
                        }}
                    >
                        Start cooking
                    </button>
                </div>
            </div>
        `;
    },
});
