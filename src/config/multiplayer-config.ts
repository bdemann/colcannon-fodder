/** Tunables for co-op multiplayer rooms (see `src/game-state/multiplayer-session.ts`). */
export const multiplayerConfig = {
    /**
     * The production multiplayer backend origin, for example `https://backend.example.com`. Empty
     * until the server owner provides one: an empty value hides the co-op UI in production builds
     * and boots straight into singleplayer, exactly as before multiplayer existed.
     */
    prodBackendOrigin: '',
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
