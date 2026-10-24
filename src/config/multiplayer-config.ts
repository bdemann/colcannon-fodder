/** Tunables for co-op multiplayer rooms (see `src/game-state/multiplayer-session.ts`). */
export const multiplayerConfig = {
    /** The production multiplayer backend (electrovir's server). */
    prodBackendOrigin: 'https://backend.mp.electrovir.com',
    /** The game id registered on the backend. The server only allows it from `prodOrigin`. */
    gameId: 'colcannon-fodder',
    /** The only deployed origin that gets multiplayer (GitHub Pages). */
    prodOrigin: 'https://bdemann.github.io',
    /** The development backend (`npm start` runs it) listens on this port of the page's host. */
    devBackendPort: 9348,
    /** STUN servers for WebRTC. There is no TURN, so some strict networks cannot connect. */
    stunServerUrls: [
        'stun.cloudflare.com:3478',
    ],
    /** Joining a room gives up (with a message) after this long. */
    connectionTimeoutSeconds: 30,
    /** The room list shows an error if the backend has not answered after this long. */
    roomListTimeoutSeconds: 8,
    /** How often the room list refreshes while the rooms panel is open. */
    roomUpdateIntervalSeconds: 1,
    /** Room and player names are cut to this many characters. */
    maxNameLength: 24,
} as const;
