import {css, defineElement, html, nothing, unsafeCSS} from 'element-vir';
import {multiplayerConfig} from '../config/multiplayer-config.js';
import {SessionScreen} from '../game-state/multiplayer-session.js';
import {type HudActions} from './hud-actions.js';
import {hudLayout} from './hud-layout.js';
import {type HudSnapshot} from './hud-snapshot.js';
import {
    hudButtonStyles,
    hudPanelStyles,
    hudPrimaryButtonStyles,
    hudScrimStyles,
} from './hud-theme.js';

/**
 * The main menu (Singleplayer or Co-op), the co-op room list with create and join, and the small
 * "Leave room" button shown while in a room. Singleplayer never shows any of it.
 */
export const HudSession = defineElement<{
    snapshot: HudSnapshot;
    actions: HudActions;
}>()({
    tagName: 'hud-session',
    state() {
        return {
            roomName: '',
            password: '',
        };
    },
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
            z-index: 2;
        }

        .panel {
            ${hudPanelStyles}
            border-radius: 28px;
            border-width: 6px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 32px 48px 40px;
            text-align: center;
            width: 1100px;
        }

        .title {
            color: var(--hud-oak);
            font-size: 64px;
            font-weight: 700;
        }

        .tagline {
            font-size: 30px;
            opacity: 0.8;
        }

        .menu-buttons {
            display: flex;
            gap: 32px;
            justify-content: center;
        }

        button {
            ${hudButtonStyles}
            font-size: 32px;
            padding: 8px 32px;
        }

        button.primary {
            ${hudPrimaryButtonStyles}
        }

        button:disabled {
            cursor: default;
            opacity: 0.5;
        }

        .error {
            background: var(--hud-butter);
            border: 4px solid var(--hud-pumpkin);
            border-radius: 14px;
            font-size: 24px;
            line-height: 1.3;
            padding: 8px 16px;
        }

        .busy,
        .empty {
            font-size: 28px;
            opacity: 0.8;
        }

        .create {
            align-items: center;
            display: flex;
            gap: 16px;
            justify-content: center;
        }

        input {
            background: white;
            border: 4px solid var(--hud-bark);
            border-radius: 12px;
            box-sizing: border-box;
            color: var(--hud-walnut);
            font-family: inherit;
            font-size: 28px;
            padding: 8px 14px;
            width: 300px;
        }

        .rooms {
            display: flex;
            flex-direction: column;
            gap: 12px;
            max-height: 400px;
            overflow-y: auto;
        }

        .room {
            align-items: center;
            border: 4px solid var(--hud-bark);
            border-radius: 14px;
            display: flex;
            font-size: 30px;
            gap: 16px;
            padding: 8px 16px;
        }

        .room-name {
            flex-grow: 1;
            text-align: left;
        }

        /* One slim row under the stats panel. */
        .leave {
            align-items: center;
            display: flex;
            gap: 10px;
            left: ${unsafeCSS(hudLayout.leaveRoom.x)}px;
            pointer-events: auto;
            position: absolute;
            top: ${unsafeCSS(hudLayout.leaveRoom.y)}px;
        }

        .leave button {
            font-size: 22px;
            padding: 4px 16px;
        }

        .leave-room-name {
            ${hudPanelStyles}
            font-size: 20px;
            max-width: 250px;
            overflow: hidden;
            padding: 6px 12px;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    `,
    render({inputs, state, updateState}) {
        const {session} = inputs.snapshot;
        const busy = !!session.busy;

        if (session.screen === SessionScreen.Playing) {
            if (!session.roomName) {
                return nothing;
            }

            return html`
                <div class="leave">
                    <div class="leave-room-name">
                        ${session.roomName}${inputs.snapshot.isSpectator ? ' (spectating)' : ''}
                    </div>
                    <button
                        @click=${() => {
                            inputs.actions.leaveRoom();
                        }}
                    >
                        Leave room
                    </button>
                </div>
            `;
        }

        const errorTemplate = session.error
            ? html`
                  <div class="error">${session.error}</div>
              `
            : nothing;

        if (session.screen === SessionScreen.Menu) {
            return html`
                <div class="layer">
                    <div class="panel">
                        <div class="title">Colcannon Fodder</div>
                        <div class="tagline">A mashed potato tower defense</div>
                        ${errorTemplate}
                        <div class="menu-buttons">
                            <button
                                class="primary"
                                @click=${() => {
                                    inputs.actions.startSingleplayer();
                                }}
                            >
                                Singleplayer
                            </button>
                            <button
                                class="primary"
                                @click=${() => {
                                    inputs.actions.openRooms();
                                }}
                            >
                                Co-op
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        const roomsTemplate = session.rooms?.length
            ? html`
                  <div class="rooms">
                      ${session.rooms.map((room) => {
                          return html`
                              <div class="room">
                                  <span class="room-name">
                                      ${room.roomName} (${room.clientCount}
                                      ${room.clientCount === 1 ? 'player' : 'players'})
                                  </span>
                                  ${room.hasRoomPassword
                                      ? html`
                                            <span title="Needs the password below">🔒</span>
                                        `
                                      : nothing}
                                  <button
                                      ?disabled=${busy}
                                      @click=${() => {
                                          inputs.actions.joinRoom(room, state.password);
                                      }}
                                  >
                                      Join
                                  </button>
                              </div>
                          `;
                      })}
                  </div>
              `
            : html`
                  <div class="empty">
                      ${session.rooms ? 'No rooms yet. Create one!' : 'Loading rooms...'}
                  </div>
              `;

        return html`
            <div class="layer">
                <div class="panel">
                    <div class="title">Co-op rooms</div>
                    ${errorTemplate}
                    ${session.busy
                        ? html`
                              <div class="busy">${session.busy}</div>
                          `
                        : nothing}
                    <div class="create">
                        <input
                            type="text"
                            placeholder="Room name"
                            maxlength=${multiplayerConfig.maxNameLength}
                            .value=${state.roomName}
                            @input=${(event: Event) => {
                                updateState({
                                    roomName: (event.target as HTMLInputElement).value,
                                });
                            }}
                        />
                        <input
                            type="password"
                            placeholder="Password (optional)"
                            .value=${state.password}
                            @input=${(event: Event) => {
                                updateState({
                                    password: (event.target as HTMLInputElement).value,
                                });
                            }}
                        />
                        <button
                            class="primary create-button"
                            ?disabled=${busy}
                            @click=${() => {
                                inputs.actions.createRoom(state.roomName, state.password);
                            }}
                        >
                            Create room
                        </button>
                    </div>
                    ${roomsTemplate}
                    <div class="menu-buttons">
                        <button
                            class="back-button"
                            ?disabled=${busy}
                            @click=${() => {
                                inputs.actions.closeRooms();
                            }}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        `;
    },
});
