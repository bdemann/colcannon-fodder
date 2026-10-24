import {createNewRoom, type RoomId, type RoomInput} from '@antha/multiplayer-core';
import {randomString} from '@augment-vir/common';
import {multiplayerConfig} from '../config/multiplayer-config.js';
import {loadLevelChoice} from '../level/level-choice.js';
import {createInitialRunState} from '../run/run-state.js';
import {DeployEnv, deployEnv} from './deploy-env.js';
import {GameCommandType, sendGameCommand} from './game-command.js';
import {type FullGameState} from './game-state.js';

/** Which full-screen panel the player is on before (or instead of) the game. */
export enum SessionScreen {
    /** The main menu: Singleplayer or Co-op. */
    Menu = 'menu',
    /** The room list, with create and join. */
    Rooms = 'rooms',
    /** The game itself, singleplayer or inside a room. */
    Playing = 'playing',
}

/** The parts of a room the room list shows. */
export type RoomSummary = {
    roomId: RoomId;
    roomName: string;
    clientCount: number;
    hasRoomPassword: boolean;
};

/** UI-only session state (lives in `state.ui.session`). Never read it from the simulation. */
export type SessionUi = {
    screen: SessionScreen;
    /** The room list; `undefined` until the backend has answered. */
    rooms: RoomSummary[] | undefined;
    /** A message while connecting or joining; the panels show it and disable their buttons. */
    busy: string | undefined;
    /** A connection or join failure to show, if any. */
    error: string | undefined;
    /** The name of the room this client is in; `undefined` in singleplayer or the menus. */
    roomName: string | undefined;
};

/** The backend origin for a deploy environment. Empty means multiplayer is turned off. */
export function getMultiplayerBackendOrigin(env: DeployEnv, hostname: string): string {
    return env === DeployEnv.Dev
        ? `http://${hostname}:${multiplayerConfig.devBackendPort}`
        : multiplayerConfig.prodBackendOrigin;
}

/** Whether this build has a multiplayer backend to talk to. */
export function isMultiplayerEnabled(): boolean {
    return !!getMultiplayerBackendOrigin(deployEnv, globalThis.location.hostname);
}

/**
 * The first screen. Without a backend (production until it is configured) the game boots straight
 * into singleplayer, and `?solo` does the same for tools like `scripts/screenshot.js`.
 */
export function createSessionUi(
    params: Readonly<{enabled: boolean; search: string}> = {
        enabled: isMultiplayerEnabled(),
        search: globalThis.location.search,
    },
): SessionUi {
    const skipMenu = !params.enabled || new URLSearchParams(params.search).has('solo');

    return {
        screen: skipMenu ? SessionScreen.Playing : SessionScreen.Menu,
        rooms: undefined,
        busy: undefined,
        error: undefined,
        roomName: undefined,
    };
}

function getController(state: Partial<FullGameState>) {
    if (!state.multiplayerP2pLockStep) {
        throw new Error('Cannot manage multiplayer: the lockstep mod is missing.');
    }

    return state.multiplayerP2pLockStep.multiplayerController;
}

function getSession(state: Partial<FullGameState>): SessionUi {
    if (!state.ui) {
        throw new Error('Cannot manage multiplayer: UI state is missing.');
    }

    return state.ui.session;
}

/** Turns any failure into a message that tells the player what to try. */
export function describeMultiplayerError(prefix: string, error: unknown): string {
    const detail = error instanceof Error ? error.message : String(error);

    return `${prefix} (${detail}). Check your connection and try again. Some networks, such as strict firewalls or mobile data, block direct connections between players.`;
}

/** A function so TypeScript does not narrow `screen` across the awaits that change it. */
function isOnRooms(session: Readonly<SessionUi>) {
    return session.screen === SessionScreen.Rooms;
}

let stopRoomListUpdates: (() => void) | undefined;
let roomListTimer: ReturnType<typeof setTimeout> | undefined;
let roomListTimedOut = false;

function stopRoomList(state: Partial<FullGameState>) {
    stopRoomListUpdates?.();
    stopRoomListUpdates = undefined;
    clearTimeout(roomListTimer);
    roomListTimer = undefined;
    state.multiplayerP2pLockStep?.multiplayerController.stopRoomUpdates();
}

/** Connects to the backend (once). Throws if it cannot be reached in time. */
async function connectToBackend(state: Partial<FullGameState>) {
    const controller = getController(state);

    if (!controller.multiplayerApiClient) {
        await controller.initMultiplayer({
            backendOrigin: getMultiplayerBackendOrigin(deployEnv, globalThis.location.hostname),
            portScanOptions: false,
            stunServerUrls: multiplayerConfig.stunServerUrls,
            roomUpdateInterval: {
                seconds: multiplayerConfig.roomUpdateIntervalSeconds,
            },
            timeout: {
                seconds: multiplayerConfig.connectionTimeoutSeconds,
            },
        });
    }

    return controller;
}

/** Leaves any room and starts a fresh local run, the same one the game always booted into. */
export function startSingleplayer(state: Partial<FullGameState>) {
    const controller = getController(state);
    const session = getSession(state);

    stopRoomList(state);
    if (controller.isConnected()) {
        controller.leaveRoom();
    }
    controller.startSingleplayer();
    session.screen = SessionScreen.Playing;
    session.error = undefined;
    session.busy = undefined;
    session.roomName = undefined;
    sendGameCommand(state, {
        type: GameCommandType.StartRun,
        ready: true,
        levelId: loadLevelChoice(),
        seed: randomString(),
    });
}

/** Opens the room list and keeps it fresh until `closeRooms` or a room is entered. */
export async function openRooms(state: Partial<FullGameState>) {
    const session = getSession(state);

    roomListTimedOut = false;
    session.screen = SessionScreen.Rooms;
    session.rooms = undefined;
    session.error = undefined;
    session.busy = undefined;

    try {
        const controller = await connectToBackend(state);

        if (!isOnRooms(session)) {
            return;
        }

        stopRoomList(state);
        stopRoomListUpdates = controller.startRoomUpdates((rooms) => {
            /** An answer clears a "server did not answer" error; join errors stay. */
            if (roomListTimedOut) {
                roomListTimedOut = false;
                session.error = undefined;
            }
            session.rooms = Object.values(rooms)
                .filter((room) => !!room)
                .map(({roomId, roomName, clientCount, hasRoomPassword}) => {
                    return {
                        roomId,
                        roomName,
                        clientCount,
                        hasRoomPassword,
                    };
                })
                .sort((first, second) => first.roomName.localeCompare(second.roomName));
        });
        roomListTimer = setTimeout(() => {
            if (session.screen === SessionScreen.Rooms && !session.rooms) {
                roomListTimedOut = true;
                session.error = describeMultiplayerError(
                    'The multiplayer server did not answer',
                    'timed out',
                );
            }
        }, multiplayerConfig.roomListTimeoutSeconds * 1000);
    } catch (error) {
        if (isOnRooms(session)) {
            session.error = describeMultiplayerError(
                'Could not reach the multiplayer server',
                error,
            );
        }
    }
}

/** Closes the room list and returns to the main menu. */
export function closeRooms(state: Partial<FullGameState>) {
    const session = getSession(state);

    stopRoomList(state);
    session.screen = SessionScreen.Menu;
    session.error = undefined;
    session.busy = undefined;
}

/** Everything about the game a player in a room sees must come from the room, so clear local state. */
function resetLocalGame(state: Partial<FullGameState>) {
    state.entityStore?.destroyAllEntities();
    state.runState = createInitialRunState();
    if (state.ui) {
        state.ui.selectedTowerType = undefined;
        state.ui.selectedTopping = undefined;
        state.ui.selectedTowerId = undefined;
    }
}

async function enterRoom(state: Partial<FullGameState>, room: Readonly<RoomInput>) {
    const session = getSession(state);

    session.busy = `Joining ${room.roomName}...`;
    session.error = undefined;

    try {
        const controller = await connectToBackend(state);

        stopRoomList(state);
        await controller.joinOrCreateRoom(room, {
            timeout: {
                seconds: multiplayerConfig.connectionTimeoutSeconds,
            },
        });
    } catch (error) {
        const controller = state.multiplayerP2pLockStep?.multiplayerController;

        if (controller?.isConnected()) {
            controller.leaveRoom();
        }
        session.busy = undefined;
        session.error = describeMultiplayerError('Could not join the room', error);
        await openRooms(state);
        /** `openRooms` clears the error; show the join failure instead. */
        session.error = describeMultiplayerError('Could not join the room', error);

        return;
    }

    const controller = getController(state);

    session.busy = undefined;
    session.rooms = undefined;
    session.roomName = room.roomName;
    session.screen = SessionScreen.Playing;

    if (controller.isHost()) {
        /** The creator hosts: it starts the shared run, and joiners get it as a state sync. */
        resetLocalGame(state);
        sendGameCommand(state, {
            type: GameCommandType.StartRun,
            ready: true,
            levelId: loadLevelChoice(),
            seed: randomString(),
        });
    } else {
        sendGameCommand(state, {
            type: GameCommandType.JoinRun,
        });
    }
}

/** Creates a room (this client becomes its host) and enters it. */
export async function createRoom(
    state: Partial<FullGameState>,
    {name, password}: Readonly<{name: string; password: string}>,
) {
    const trimmedName = name.trim().slice(0, multiplayerConfig.maxNameLength);
    const room = createNewRoom({
        roomName: trimmedName || 'Mash Kitchen',
        roomPassword: password,
    });

    await enterRoom(state, room);
}

/** Joins an existing room from the list. */
export async function joinRoom(
    state: Partial<FullGameState>,
    room: Readonly<Pick<RoomSummary, 'roomId' | 'roomName'>>,
    password: string,
) {
    await enterRoom(state, {
        ...room,
        roomPassword: password,
    });
}

/** Leaves the current room and returns to the main menu. */
export function leaveRoom(state: Partial<FullGameState>) {
    const controller = getController(state);
    const session = getSession(state);

    stopRoomList(state);
    if (controller.isConnected()) {
        controller.leaveRoom();
    }
    resetLocalGame(state);
    session.roomName = undefined;
    session.busy = undefined;
    session.error = undefined;
    session.screen = SessionScreen.Menu;
}

/** The host disconnected: the room is over, so go back to the menu and say why. */
export function handleHostLost(state: Partial<FullGameState>) {
    if (
        !state.ui ||
        state.ui.session.screen !== SessionScreen.Playing ||
        !state.ui.session.roomName
    ) {
        return;
    }

    leaveRoom(state);
    state.ui.session.error = 'The host left, so the room has closed.';
}
