import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {multiplayerConfig} from '../config/multiplayer-config.js';
import {DeployEnv} from './deploy-env.js';
import {type FullGameState} from './game-state.js';
import {
    closeRooms,
    createSessionUi,
    describeMultiplayerError,
    getMultiplayerBackendOrigin,
    leaveRoom,
    SessionScreen,
    type SessionUi,
} from './multiplayer-session.js';

function createFakeState(session: SessionUi) {
    const calls: string[] = [];
    const state = {
        ui: {
            session,
            selectedTowerType: undefined,
            selectedTopping: undefined,
            selectedTowerId: undefined,
        },
        multiplayerP2pLockStep: {
            multiplayerController: {
                isConnected() {
                    return true;
                },
                leaveRoom() {
                    calls.push('leaveRoom');
                },
                stopRoomUpdates() {
                    calls.push('stopRoomUpdates');
                },
            },
        },
    } as unknown as Partial<FullGameState>;

    return {
        state,
        calls,
        session,
    };
}

describe(getMultiplayerBackendOrigin.name, () => {
    it('uses the local server on the page host in dev', () => {
        assert.strictEquals(
            getMultiplayerBackendOrigin(DeployEnv.Dev, 'localhost'),
            `http://localhost:${multiplayerConfig.devBackendPort}`,
        );
    });

    it('is empty in prod until a backend URL is configured', () => {
        assert.strictEquals(
            getMultiplayerBackendOrigin(DeployEnv.Prod, 'bdemann.github.io'),
            multiplayerConfig.prodBackendOrigin,
        );
        assert.strictEquals(multiplayerConfig.prodBackendOrigin, '');
    });
});

describe(createSessionUi.name, () => {
    it('shows the menu when multiplayer is enabled', () => {
        assert.strictEquals(
            createSessionUi({
                enabled: true,
                search: '',
            }).screen,
            SessionScreen.Menu,
        );
    });

    it('boots straight into the game when multiplayer is disabled', () => {
        assert.strictEquals(
            createSessionUi({
                enabled: false,
                search: '',
            }).screen,
            SessionScreen.Playing,
        );
    });

    it('skips the menu with ?solo', () => {
        assert.strictEquals(
            createSessionUi({
                enabled: true,
                search: '?solo=1',
            }).screen,
            SessionScreen.Playing,
        );
    });
});

describe(describeMultiplayerError.name, () => {
    it('includes the cause and a network hint', () => {
        const message = describeMultiplayerError('Could not join the room', new Error('timed out'));

        assert.isTrue(message.includes('timed out'));
        assert.isTrue(message.includes('firewalls'));
    });
});

describe(leaveRoom.name, () => {
    it('leaves the room and returns to the menu', () => {
        const {state, calls, session} = createFakeState({
            ...createSessionUi({
                enabled: true,
                search: '?solo',
            }),
            roomName: 'Test Kitchen',
        });

        leaveRoom(state);

        assert.strictEquals(session.screen, SessionScreen.Menu);
        assert.strictEquals(session.roomName, undefined);
        assert.isTrue(calls.includes('leaveRoom'));
    });
});

describe(closeRooms.name, () => {
    it('stops room updates and returns to the menu', () => {
        const {state, calls, session} = createFakeState({
            ...createSessionUi({
                enabled: true,
                search: '',
            }),
            screen: SessionScreen.Rooms,
            error: 'oops',
        });

        closeRooms(state);

        assert.strictEquals(session.screen, SessionScreen.Menu);
        assert.strictEquals(session.error, undefined);
        assert.isTrue(calls.includes('stopRoomUpdates'));
    });
});
