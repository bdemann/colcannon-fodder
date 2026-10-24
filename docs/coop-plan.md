# Co-op multiplayer plan

Design goal (issue #14): one shared restaurant, each player defends their own path, the team shares
one satisfaction meter, every player's contribution is tracked, and the top contributor is crowned
Mash Champ.

This plan comes from reading the engine packages (`@antha/multiplayer-core`,
`@antha/multiplayer-p2p-lock-step`, `@antha/multiplayer-server`, version 0.25.x), the original
template's multiplayer code (commit `00ebbb3`), and our current code (`origin/main` at `08e50a9`).
No game code was changed.

## 1. Architecture summary

### Transport

-   **Signaling and room discovery** go through `@antha/multiplayer-server` (a fastify server). The
    API is `GET /`, `GET /health`, `GET /rooms?gameId=...` (room list: `roomId`, `roomName`,
    `clientCount`, `hasRoomPassword`) and a WebSocket `/connect?gameId=...` that relays WebRTC offers,
    answers and host pings. The server never sees game data.
-   **Game data is peer to peer** over WebRTC data channels. The topology is a star: the room host
    holds a connection to every other client. Clients only talk to the host.
-   **NAT traversal** uses STUN only. The client passes `stunServerUrls` to `initMultiplayer`; the
    template used `stun.cloudflare.com:3478`. There is no TURN option in the API, so two players
    behind symmetric NATs (some mobile carriers, strict corporate networks) cannot connect.
-   Rooms are created implicitly: `joinOrCreateRoom({roomId, roomName, roomPassword})` joins a room
    if the server knows that `roomId`, otherwise the caller becomes host and the server starts listing
    the room (host pings once per second). `createNewRoom()` makes a random `roomId` (`r_...`).
    Clients get a random `ClientId` (`c_...`) per page load; it is not stable across reloads.

### Lockstep

-   The host runs a frame timer (`frameDuration`, default 10 ms, we do not override it). Every frame
    the host collects each client's queued `act(...)` packets, bundles them into one `Frame` message
    with each packet tagged by `sourceClientId`, broadcasts it, and every peer (host included) runs
    `handlePacket` for each packet, then `runFrameUpdate` with a fixed `msSinceLastExecute = frameMs`.
-   The host does not finish a frame until every connected client has responded
    (`clientsResponded`), so the slowest peer throttles everyone. This matters for #29 below.
-   Desync detection: every `desyncCheck.interval` the host reports its hash; clients compare and, with
    `resyncOnDesync: true`, request a state sync (`createStateSync` from the host, `loadStateSync` on
    the client). New members also get a state sync on join. `handleClientStatus` fires with
    `newMember` / `lostMember` client ids (see `p2p-lock-step-multiplayer-controller.js` line 339).
-   Host migration exists (`handleNewHost`), but the server picks the host (`OfferResult.hostClientId`).
    We should plan for host loss ending the room gracefully, then upgrade later.

### Our code today

-   All simulation input already flows through `GameCommand` (`src/game-state/game-command.ts`) into
    `gameCommandHandlers` (`src/game-state/game-command-handlers.ts`). `gameId` is
    `'colcannon-fodder'` (`src/game-state/game-lockstep.mod.ts:33`).
-   `startSingleplayer()` is called at boot from `src/game-state/game-update.mod.ts:~32`. Singleplayer
    uses the same path with `singleplayer = true`, so no client-ids exist there.
-   There is no room UI and no `initMultiplayer` call. The template had both
    (`git show 00ebbb3:src/game-state/multiplayer-session.ts`, `...:src/menu/game-multiplayer-rooms.element.ts`).
-   Template backend config: dev `http://<hostname>:9348` (the default port), prod
    `https://backend.mp.electrovir.com` (the Antha author's server; not ours to depend on).
-   The repo already ships `configs/multiplayer-server.config.ts` and `npm start` runs it alongside
    the frontend (`package.json` `start` script), so local two-tab testing needs no extra setup.

### Client id to slot mapping

`sourceClientId` is the only identity a command carries, and ids are random per page load. So the
slot assignment must live in synced state:

-   Add `runState.slotByClientId: Record<ClientId, number>` (and a `slotNames` record for the HUD).
    It is inside `runState`, so it is already in the desync hash and in state sync.
-   Assign slots **inside a deterministic command handler**, never from local controller state. Add a
    `JoinRun` command that each client sends once on entering a room; the handler gives the next free
    slot (0 for the first). The host's `StartRun` handler assigns slot 0 to its own `sourceClientId`.
    Order is the frame order, identical on all peers.
-   `handleClientStatus` for `lostMember` (host only, as in the template) sends a `LeaveRun` command
    so the slot is freed or marked disconnected. A reload gets a new client id, so reconnecting
    means taking a fresh slot (or reclaiming one marked `disconnected`; see work item 5).
-   `getCommandSlot()` becomes `getCommandSlot(state, detail.sourceClientId)`, defaulting to 0 when
    the map is empty so singleplayer is unchanged.

## 2. Server requirements and questions for Sim

### What we need

1. A reachable instance of `@antha/multiplayer-server` (or something that speaks the same API: the
   client is generated from `multiplayerApi` in `@antha/multiplayer-core`, so a different server is
   only an option if it implements `/rooms` and the `/connect` WebSocket protocol exactly).
2. It must be reachable over **HTTPS/WSS** if the game is served over HTTPS (GitHub Pages is), since
   browsers block mixed content. Local development can stay on `http://localhost:9348`.
3. The `colcannon-fodder` game id must be allowed for our production origin. The server rejects
   other origins with 401 (`games.byId['colcannon-fodder']`). Our local config uses `AnyOrigin`.
4. A public STUN server (the template used `stun.cloudflare.com:3478`, which is free and fine).
   TURN is not supported by the client API, so no TURN question to ask.

### Self-hosting `@antha/multiplayer-server`

-   Command: `npx start-mp-server <config-file>` (config may be `.ts`, `.js`, `.mjs`, JSON, YAML or
    TOML). In this repo: `npx start-mp-server configs/multiplayer-server.config.ts`.
-   Config keys: `games.byId.<gameId>` (an origin requirement: a URL string, `RegExp`, callback,
    or `AnyOrigin`), `games.default` (fallback), `host` (`0.0.0.0` to accept remote connections),
    `port` (default `9348`), `lockPort`, `backendOrigin` (the server's own public origin), `debug`,
    `logger`, `configReloadInterval` (the CLI re-reads the config file, so origins can change without
    a restart).
-   Single port (default 9348) serves both HTTP and the WebSocket. For production put it behind a
    TLS-terminating reverse proxy (Caddy or nginx) that forwards WebSocket upgrades on `/connect`.
-   Keep it alive with something like `ensure-service` (recommended by its README), systemd, or Docker.
-   Production config sketch:

    ```ts
    export default {
        backendOrigin: 'https://mp.example.com',
        games: {byId: {'colcannon-fodder': 'https://bdemann.github.io'}},
        host: '0.0.0.0',
        port: 9348,
    } satisfies MultiplayerServerCliConfig;
    ```

### Exact questions to ask Sim

1. Is it a stock `@antha/multiplayer-server` (which version; we use `^0.25.1`) or a custom server?
   If custom, can we get the API spec or source?
2. What is the public base URL, and is it HTTPS/WSS with a valid certificate?
3. Can you add the game id `colcannon-fodder` with our origin (the GitHub Pages origin, plus
   `http://localhost:*` for dev), or should we self-host?
4. Is there a room or connection limit, rate limiting, auth, or any other restriction? Is it shared
   with other games?
5. Which STUN (and TURN, if any) servers should we use? Is a TURN relay available, even though the
   client cannot use it yet?
6. How long will it stay up (jam only, or longer)? Who restarts it, and what is the contact if it is
   down?
7. Does it log room names or IPs? (We will show room names publicly in the lobby.)
8. Can we test against it now with a throwaway game id?

Fallback if Sim's server is not available: run the stock server ourselves on a small VPS or free
tier (it is tiny: no game state, only signaling).

## 3. Co-op safety problems found

Verified against `origin/main` at `08e50a9`. "Sim" means anything run inside a command handler,
entity `update`, or `runFrameUpdate`. Presentation (`render`, HUD) may be per-client as long as it
never writes sim state.

### Blockers (cause desync or wrong state)

| #   | Problem                                                                                                                                                                                                                                                                                             | Where                                                                                                                                                         |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| B1  | **Each client seeds its own RNG**: `SeededRandom.fromSeed(randomString())` at load. `StartRun` does not carry a seed, so two clients that both start a run diverge on the first random roll. State sync on join would overwrite the joiner's seed, but a simultaneous start or a restart would not. | `src/game-state/load-game.ts:69`, `src/game-state/game-command-handlers.ts:50-` (`StartRun`)                                                                  |
| B2  | **State sync does not restore `state.level`.** `loadStateSync` assigns `runState`, random state and entities but leaves `state.level` at the joiner's default level. Placement validation, spawner, chutes and level art all read `state.level`.                                                    | `src/game-state/game-lockstep.mod.ts:62-75`                                                                                                                   |
| B3  | **`getCommandSlot()` always returns 0**; `PlaceTower` ignores `detail.sourceClientId`. All towers get `ownerSlot: 0`.                                                                                                                                                                               | `src/game-state/game-command-handlers.ts:38-40`, `:136`                                                                                                       |
| B4  | **Level choice comes from per-browser `localStorage`** and goes into the initial `StartRun`. In a room, each client would start a different level. `selectLevel` saves it locally too. Only the host's choice may count, and it must travel inside the command.                                     | `src/game-state/game-update.mod.ts:~32-37`, `src/level/level-choice.ts:6-18`, `src/hud/hud-actions.ts:127-134`                                                |
| B5  | **Boot always calls `startSingleplayer()` and sends `StartRun`**, which throws if a connection exists and would reset a joined room. Needs a session mode (menu, then singleplayer or room).                                                                                                        | `src/game-state/game-update.mod.ts:~29-37`                                                                                                                    |
| B6  | **`scoreBySlot` starts as `{0: 0}`**, and the run-over/HUD total sums the map. Other slots work by `?? 0` in `serving.ts:80,204` but are invisible until created, and there is no per-slot name or color.                                                                                           | `src/run/run-state.ts:184-186`, `src/run/serving.ts:80-81,204-205`, `src/hud/hud-snapshot.ts:165`                                                             |
| B7  | **Pause, speed, restart and level are global commands anyone can send.** `TogglePause`, `SetSpeed`, `ArmSpeedReset`, `StartRun` have no authority or consensus rules. One player (or a stray `P`/`Esc`/`F`/`G`/`R` key) changes everyone's game.                                                    | `src/game-state/game-command-handlers.ts` (`TogglePause` ~:221, `SetSpeed` ~:225, `ArmSpeedReset`), `src/hud/hud.mod.ts:66-90`, `src/hud/hud-actions.ts:144-` |
| B8  | **No ownership checks** on `UpgradeTower`, `SellTower`, `ServiceTower`, or `PlaceTower` range. Anyone can sell or upgrade another player's tower, and nothing restricts building to your own path. (A policy decision: allow teamwork, or restrict.)                                                | `src/game-state/game-command-handlers.ts` (`PlaceTower`, `UpgradeTower`, `SellTower`, `ServiceTower`), `src/tower/tower-placement.ts:15`                      |
| B9  | **Speed/fast-forward changes the number of steps per frame** (`stepsForFrame`). It is deterministic (accumulator is in `runState`), but a 3x speed also multiplies the per-frame work, which worsens the slow-machine problem and the lockstep stall.                                               | `src/game-state/game-lockstep.mod.ts:101-122`, `src/run/speed.ts`                                                                                             |
| B10 | **Frame timing (#29).** The host schedules the next frame with `setTimeout(frameMs)` after the previous one completes, and waits for all clients. Sim rate is `<= 1/(frameMs + frame cost)`, so with N peers the whole room runs at the slowest peer's pace and not in real time.                   | engine: `p2p-lock-step-multiplayer-controller.js` `finishFrame` / `maybeFinishFrame` (~lines 560-590); ours: no `frameDuration` set in `game-lockstep.mod.ts` |

### Not a problem (checked)

-   `Math.random`, `Date.now`, `performance.now`, `setTimeout`, `requestAnimationFrame`: **none in
    sim code**. Only `Date.now()` in `src/records/records.ts:249` (UI-only record timestamp).
-   All sim randomness uses `state.seededRandom` (`potato-spawner.entity.ts:60,61,80,123,130,217,218,223`,
    `order-board.entity.ts:20`).
-   Handlers and entity `update` methods do not read `state.ui`. Only `render()` in
    `tower.entity.ts:454-460` reads `pointerWorld` / `selectedTower*`, which is presentation.
-   Sounds are in render paths and HUD (`tower.entity.ts:471`, `seagull.entity.ts:709`,
    `hud.mod.ts:33-58`), not in sim. They are driven by synced state (`lastProcessedAtMs`,
    `lastServing`, `lastSteal`, tower count), so every peer hears them. Note `hud.mod.ts` compares
    tower count and `servedAtMs` between ticks; a state sync after join could replay one sound.
-   Volume and mute settings (`src/audio/volume-settings.ts`) are `localStorage`, UI only. Good.
-   `runState.paused` / `speed` are in synced state, not local, so they cannot desync (but see B7).

### Minor

-   `saveFinishedRun` (`hud-snapshot.ts:167`) runs on each client and writes that client's local
    records. Fine for personal bests; co-op needs a separate "co-op" record bucket and a per-slot
    champ so a team run is not stored as a solo high score.
-   `hud-snapshot.ts` computes totals only; no per-slot contribution, no player names.
-   `window.gameState` global is exposed in dev (`game-update.mod.ts`); harmless, but useful for tests.
-   `StartRun` destroys all entities on every client at the same frame, which is fine, but joiners
    mid-run receive the whole state through state sync (entities snapshot + `runState`), so snapshot
    size should be checked on the largest late-game state (WebRTC data channel message limit).

## 4. Proposed work items

Ordered. Items marked **[server]** need Sim's answers (or a self-hosted instance) to be tested
against the real backend; everything else can be built and tested with the local server from
`npm start` and with in-process tests. Each is sized for one GitHub issue.

### 1. Make the simulation co-op-safe (seed, level sync, command authority)

-   **Payoff:** removes every desync bug in section 3 that does not need new UI. Singleplayer
    behavior is unchanged.
-   **Files:** `src/game-state/game-command.ts` (`StartRun` gets `seed: string`), `game-command-handlers.ts`
    (reseed in `StartRun`; `state.level` restore helper), `game-lockstep.mod.ts` (`loadStateSync` sets
    `state.level = getLevel(runState.levelId)`), `game-update.mod.ts` and `hud-actions.ts` (pass a
    seed generated by the sender at command-creation time; level choice from the sender, not the
    handler), tests.
-   **Depends on:** nothing.
-   **Acceptance:** two engine instances fed the same scripted command list (including `StartRun`
    with a seed) have equal state hashes every frame; a state-sync round trip restores `state.level`;
    `grep` finds no `Math.random` / `Date.now` / `ui` reads under sim paths (add a lint or test
    guard). Existing tests and singleplayer unchanged.

### 2. Player slots and ownership

-   **Payoff:** commands are attributed to the right player; towers, score and coins have an owner.
-   **Files:** `src/run/run-state.ts` (`slotByClientId`, `slotNames`, `connected` flags, default
    `scoreBySlot` for all slots in the level), `game-command.ts` (`JoinRun`, `LeaveRun`),
    `game-command-handlers.ts` (`getCommandSlot(state, sourceClientId)`; join/leave handlers;
    ownership checks per decided policy), `game-lockstep.mod.ts` (`handleClientStatus` host sends
    `LeaveRun`), `src/tower/tower-placement.ts` (`canPlaceTower` takes the slot; players build near
    their own path, N px), tests.
-   **Depends on:** item 1.
-   **Acceptance:** in a two-instance test, two `sourceClientId`s get slots 0 and 1 in frame order;
    towers carry the right `ownerSlot`; a slot-1 `SellTower` on a slot-0 tower is rejected (or
    allowed, if the team decides sharing is fine; record the decision in the issue); a `lostMember`
    frees or marks the slot; singleplayer still uses slot 0 with no `JoinRun`.

### 3. Shared-run rules: pause, speed, restart, level selection

-   **Payoff:** one player cannot wreck the game for everyone; removes the stall risk from fast-forward.
-   **Files:** `game-command-handlers.ts`, `game-command.ts`, `src/hud/hud.mod.ts` (key handling),
    `src/hud/hud-actions.ts`, `src/hud/hud-pause.element.ts`, `src/run/speed.ts`, `run-state.ts`.
-   **Depends on:** item 2.
-   **Acceptance (proposed policy, confirm in the issue):** in co-op only the host (slot 0) can
    restart or change level; pause is allowed for anyone but shows "Paused by <name>" and only the
    pauser or host can resume; fast-forward is disabled in co-op (speed forced to 1x) because the
    slowest peer sets the pace; singleplayer keeps all current behavior. Covered by handler tests
    with two `sourceClientId`s.

### 4. Session manager and rooms UI **[server]**

-   **Payoff:** players can actually find and join each other. This is the first user-visible co-op
    feature.
-   **Files:** new `src/game-state/multiplayer-session.ts` (port of the template's, backend origin per
    `DeployEnv`, 30 s connection timeout, `stun.cloudflare.com:3478`), new
    `src/menu/game-multiplayer-rooms.element.ts` (port of the template: `startRoomUpdates` list,
    create room with name and optional password, join, leave), main menu entry (Singleplayer / Co-op),
    `game-update.mod.ts` (do not auto-start singleplayer until the menu choice), a backend config
    constant in `deploy-env.ts` or a new `multiplayer-config.ts`.
-   **Depends on:** items 1 and 2 for correctness; the server details for production. Can be built
    and demoed with local `npm start` plus two browser tabs before Sim answers.
-   **Acceptance:** two tabs against the local server: tab A creates a room, tab B sees it in the list
    within about 2 s and joins; both load the same level and the same state; leaving returns to the
    menu; connection errors and timeouts show a message and do not hang. With a production backend URL
    set, the same works over HTTPS/WSS. **Blocked on Sim** only for the production URL, origin
    allow-list and STUN.

### 5. Lobby, start and drop-in/drop-out **[server]**

-   **Payoff:** a hosted game feels like a game: players see who is in, the host starts the run, a
    disconnect does not break the room.
-   **Files:** new lobby HUD element (player list with slot colors and names, ready indicator, host
    Start button, level picker visible to host only), `hud.mod.ts`, `run-state.ts` (`Ready` status
    reused for the lobby), `game-lockstep.mod.ts` (`handleClientStatus`: `newMember` / `lostMember`),
    join-in-progress policy (allow while `Ready`, spectate or take the next free slot while `Playing`),
    handling of host loss (show "host left", return to the menu).
-   **Depends on:** items 2, 3, 4.
-   **Acceptance:** host picks the level, everyone sees it, host presses Start and all peers enter
    `Playing` on the same frame; a client dropping mid-run frees or disables its slot and the run
    continues; a late joiner receives a state sync and lands in a valid slot or spectator mode; host
    loss ends the room cleanly with a message.

### 6. Co-op scoring, HUD and Mash Champ

-   **Payoff:** the headline feature from #14: per-player contribution and the crowned winner.
-   **Files:** `src/hud/hud-snapshot.ts` (`scoreBySlot` to a ranked list with names and colors),
    `hud-stats.element.ts` (compact per-player contribution), `hud-run-over.element.ts` (ranked
    contributors, top one gets the Mash Champ crown), `src/records/records.ts` and `records-config.ts`
    (co-op run bucket and a per-player-count entry so team runs do not overwrite solo bests), tower
    and potato colors per `ownerSlot`.
-   **Depends on:** item 2 (slots) and ideally 5.
-   **Acceptance:** with scripted serving events in slots 0 and 1, the run-over screen ranks both
    with correct points, the higher one is crowned, ties are handled (shared crown or tie-break by
    perfect servings; decide in the issue); solo runs are unchanged; a co-op result never replaces
    a solo best.

### 7. Multiplayer maps (see section 5)

-   **Payoff:** without a second path there is nothing to defend per player; this unblocks real
    playtesting of the co-op rules.
-   **Files:** `src/level/level.ts` (optional `minPlayers` / `maxPlayers` and `ownerSlot` colors),
    `src/level/levels.ts` (new `createCoopLevel` and 2 maps), `src/level/level.entity.ts` (draw all
    paths, spawn markers and the restaurant entrance for each), `potato-spawner.entity.ts` (already
    loops over `level.paths`; verify the per-path wave scaling), `src/config/game-config.ts` (co-op
    difficulty scaling by player count), `level.test.ts`.
-   **Depends on:** item 2 (slots); can be developed in parallel with 4 and 5.
-   **Acceptance:** the maps in section 5 load, all paths end at the restaurant, no tower placement
    zones overlap, the level picker shows only maps valid for the room size, and wave difficulty
    with 2 players is playable (playtest note in the PR).

### 8. Two-peer test harness, frame-rate and CI **[partly server]**

-   **Payoff:** keeps co-op from regressing silently, and addresses slow-machine pacing (#29).
-   **Files:** a test util that runs two `gameLockstepMod` instances connected by a fake in-memory
    transport and compares hashes (check `electrovir/antha` for an existing fake; the core package
    exports `mock-room-handler-server-api-client`), tests for join, leave, state sync and desync
    recovery; `game-lockstep.mod.ts` (`frameDuration` of about 1000/30 ms as in #29 fix option 1, and
    an on-screen "sim speed" indicator for the host); optional CI smoke test against the local
    `start-mp-server` with two headless browsers.
-   **Depends on:** items 1 and 2. The real-server smoke test is **blocked on server details**.
-   **Acceptance:** `npm test` runs a two-peer scripted game and asserts equal hashes for at least one
    full wave; a forced desync triggers a resync and ends equal; the sim-speed indicator reports the
    measured ratio. Real-network playtest with two machines is documented in the PR.

Suggested order: 1, 2, 3 (sim); then 4 and 7 in parallel (UI and map); then 5, 6; 8 runs alongside
from item 1 onward. Items 4 and 5 are the ones to re-check when Sim answers.

## 5. Multiplayer map needs

Constraints from the code:

-   A level has `paths: PathDefinition[]` (each with `pathId`, `ownerSlot`, `waypoints`, `widthPx`,
    optional `chutes`) and one `restaurant` (a 220 px square at the centre). World size is 1920x1080.
-   Every path must end at the restaurant. Today `createLevel` ends the one path at the restaurant's
    west edge; multi-path levels need one entrance point per path (west, east, north, south edges).
-   The spawner already spawns one potato per path per spawn, and multiplies pending clump potatoes by
    `level.paths.length` (`potato-spawner.entity.ts:45-106`), so total potato count scales with the
    number of paths automatically. Co-op balance should then scale tower income or wave difficulty
    per player count, not per path.
-   A map must declare how many players it supports. Singleplayer should only use maps with one path,
    or a multi-path map with the unused paths owned by slot 0 (decide in the issue). Recommendation:
    keep singleplayer maps separate and add `minPlayers` / `maxPlayers` to `LevelDefinition`.
-   `canPlaceTower` needs the owning slot so each player builds near their own path (suggested radius
    about 300 px). Maps need enough build space around each path so the players do not crowd each
    other, and shared space in the middle that stays neutral.
-   The restaurant needs a visible way to tell paths apart: per-slot color on the barn-door spawn
    marker and on the path edge (drawn by `level.entity.ts`).

Proposed starting maps:

1. **Two Roads** (2 players): `west` path (slot 0) enters from the left edge, `east` path (slot 1)
   enters from the right edge, mirrored winding shapes, both ending at the restaurant sides. This is
   issue #14's sketch and is the simplest.
2. **Crossroads** (3 to 4 players): one path per edge (west, east, north, south), each with a long
   curve before the entrance, one chute on a couple of paths to vary pacing. Supports 2 players by
   leaving north and south unassigned (potatoes still spawn on those paths unless the level
   declares them optional per player count; the issue must decide this).

Open question for the designer: for fewer players than paths, are unowned paths removed (easier) or
auto-defended by shared towers (harder)? Recommendation: define each map with the exact player
counts it supports.

## 6. Risks (short)

-   **Server availability** is the largest unknown (section 2). Mitigation: self-host fallback,
    it is a small stateless signaling server.
-   **NAT traversal**: STUN-only, no TURN. Some pairs will never connect; the UI must say so
    clearly after the timeout.
-   **Slowest-peer pacing** (#29 and B10): fast-forward disabled in co-op, larger fixed frame, and
    the eventual engine fix in `bdemann/antha`.
-   **Host leaves**: treat as room end for v1.
-   **Late-join state size** over a WebRTC data channel: measure the late-game snapshot.
