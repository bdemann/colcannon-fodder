import {ModExecutionTriggerType} from '@antha/engine';
import {EntityStore2d} from '@antha/entity-2d';
import {createMockPixi} from '@antha/graphics-2d';
import {createMockRoomHandlerServerApiClient, createNewRoom} from '@antha/multiplayer-core';
import {
    MultiplayerControllerFrameEvent,
    type P2pLockStepMultiplayerController,
} from '@antha/multiplayer-p2p-lock-step';
import {defaultLevel} from '../../level/levels.js';
import {type GameCommand} from '../game-command.js';
import {gameEntities} from '../game-entities.js';
import {createGameStateHash, gameLockstepMod} from '../game-lockstep.mod.js';
import {type FullGameState} from '../game-state.js';

// Blocked on the real server (#115): a CI smoke test against the real room server (local
// `start-mp-server` or production) with two headless browsers. Needs Sim's server details (#14).

/** One simulated browser: its own game state and its own lockstep controller. */
export type TestPeer = {
    /** Same shape as the real game state; mutate `state.runState` to force a desync. */
    state: FullGameState;
    controller: P2pLockStepMultiplayerController<GameCommand>;
    /** State hash after each applied frame, keyed by the controller's `frameCount`. */
    hashByFrame: Map<number, number | undefined>;
    /** Sends a command the way the UI does (`sendGameCommand`). */
    act(command: GameCommand): void;
};

export type TwoPeerHarness = {
    host: TestPeer;
    /** Added by `joinGuest`. */
    guest: TestPeer | undefined;
    joinGuest(): Promise<TestPeer>;
    /** Disconnects the guest from the room, as closing the tab would. */
    leaveGuest(): void;
    /** Resolves once `condition` is true; rejects after `timeoutMs` of real time. */
    waitFor(condition: () => boolean, timeoutMs?: number): Promise<void>;
    /** Resolves once the host has applied `count` more frames. */
    waitForFrames(count: number, timeoutMs?: number): Promise<void>;
    /**
     * Resolves once every peer has applied and hashed the frame the host is on right now. Frames
     * are produced faster than they are applied, so call this before comparing hashes.
     */
    waitForPeersCaughtUp(timeoutMs?: number): Promise<void>;
    /** Frames at which both peers have a hash and the hashes differ. */
    findHashMismatches(): number[];
    destroy(): void;
};

/**
 * Real frame timers wait `frameDuration` between frames, which would make a whole wave take about a
 * minute. While a harness exists, timers of this length or shorter fire as soon as possible.
 */
const maxCompressedTimerMs = 200;

const realSetTimeout = globalThis.setTimeout.bind(globalThis);

/** Real-time wait that is not compressed by the harness. */
function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => realSetTimeout(resolve, ms));
}

/** Schedules through a message channel, which Chromium does not clamp to 4 ms like `setTimeout`. */
function createImmediateScheduler() {
    const channel = new MessageChannel();
    const queue: Array<() => void> = [];
    channel.port1.onmessage = () => {
        queue.shift()?.();
    };

    return (callback: () => void) => {
        queue.push(callback);
        channel.port2.postMessage(undefined);
    };
}

async function createPeer({
    mockApiClient,
    room,
}: Readonly<{
    mockApiClient: ReturnType<typeof createMockRoomHandlerServerApiClient>;
    room: ReturnType<typeof createNewRoom>;
}>): Promise<TestPeer> {
    const state: Partial<FullGameState> = {
        level: defaultLevel,
    };
    state.entityStore = new EntityStore2d({
        pixi: createMockPixi() as any,
        state,
        assetLoader: {} as any,
        preregisteredEntities: gameEntities,
    });

    const hashByFrame = new Map<number, number | undefined>();
    /** Events are applied one at a time, like the engine does. */
    let queue: Promise<unknown> = Promise.resolve();
    const engine = {
        dispatch(event: Event) {
            queue = queue
                .then(async () => {
                    await runMod([event]);
                    if (event instanceof MultiplayerControllerFrameEvent) {
                        const frameCount =
                            state.multiplayerP2pLockStep?.multiplayerController.frameCount;
                        if (frameCount != undefined) {
                            hashByFrame.set(
                                frameCount,
                                createGameStateHash({
                                    state,
                                }),
                            );
                        }
                    }
                })
                .catch((error: unknown) => {
                    console.error('Two-peer harness failed to apply an event.', error);
                });
        },
    };

    async function runMod(events: Event[]) {
        await (gameLockstepMod as any).execute({
            engine,
            state,
            msSinceLastExecute: 0,
            ticksSinceLastExecute: 0,
            currentTick: 0,
            executionTrigger: events.length
                ? {
                      type: ModExecutionTriggerType.Event,
                      events,
                  }
                : {
                      type: ModExecutionTriggerType.Tick,
                  },
        });
    }

    /** The first run creates the controller. */
    await runMod([]);
    const controller = state.multiplayerP2pLockStep?.multiplayerController;
    if (!controller) {
        throw new Error('The lockstep mod did not create a controller.');
    }
    await controller.initMultiplayer({
        backendOrigin: mockApiClient.baseUrl,
        multiplayerApiClient: mockApiClient,
    } as any);
    await controller.joinOrCreateRoom(room);

    return {
        state: state as FullGameState,
        controller,
        hashByFrame,
        act(command) {
            controller.act(command);
        },
    };
}

/**
 * Runs two (or more, one at a time) copies of the real `gameLockstepMod` in this process, joined
 * through the engine's mock room server and a real in-page WebRTC loopback. The first peer is the
 * host. Frame timers are compressed (see `maxCompressedTimerMs`) so a full wave runs in seconds;
 * call `destroy` to restore them.
 */
export async function createTwoPeerHarness(roomName = 'two-peer-harness'): Promise<TwoPeerHarness> {
    const schedule = createImmediateScheduler();
    globalThis.setTimeout = ((callback: () => void, ms?: number, ...args: unknown[]) => {
        if (typeof callback === 'function' && ms != undefined && ms <= maxCompressedTimerMs) {
            schedule(() => (callback as (...rest: unknown[]) => void)(...args));
            return 0;
        }
        return realSetTimeout(callback, ms, ...args);
    }) as unknown as typeof globalThis.setTimeout;

    const mockApiClient = createMockRoomHandlerServerApiClient();
    /** Every peer uses this same room object, so later peers join instead of creating a room. */
    const room = createNewRoom({
        roomName,
    });
    const peers: TestPeer[] = [];

    const harness: TwoPeerHarness = {
        host: await createPeer({
            mockApiClient,
            room,
        }),
        guest: undefined,
        async joinGuest() {
            const guest = await createPeer({
                mockApiClient,
                room,
            });
            harness.guest = guest;
            peers.push(guest);
            return guest;
        },
        leaveGuest() {
            harness.guest?.controller.leaveRoom();
        },
        async waitFor(condition, timeoutMs = 30_000) {
            const start = performance.now();
            while (!condition()) {
                if (performance.now() - start > timeoutMs) {
                    throw new Error(`Timed out after ${timeoutMs} ms waiting for a condition.`);
                }
                await sleep(1);
            }
        },
        async waitForFrames(count, timeoutMs) {
            const target = harness.host.controller.frameCount + count;
            await harness.waitFor(() => harness.host.controller.frameCount >= target, timeoutMs);
        },
        async waitForPeersCaughtUp(timeoutMs = 120_000) {
            const target = harness.host.controller.frameCount;
            await harness.waitFor(() => {
                return [
                    harness.host,
                    harness.guest,
                ].every((peer) => {
                    return !peer || peer.hashByFrame.has(target);
                });
            }, timeoutMs);
        },
        findHashMismatches() {
            const {guest, host} = harness;
            if (!guest) {
                return [];
            }
            const mismatches: number[] = [];
            for (const [
                frame,
                guestHash,
            ] of guest.hashByFrame) {
                const hostHash = host.hashByFrame.get(frame);
                if (hostHash != undefined && guestHash != undefined && hostHash !== guestHash) {
                    mismatches.push(frame);
                }
            }
            return mismatches;
        },
        destroy() {
            globalThis.setTimeout = realSetTimeout as unknown as typeof globalThis.setTimeout;
            for (const peer of [
                ...peers,
                harness.host,
            ]) {
                peer.controller.destroy();
            }
        },
    };
    peers.push(harness.host);

    return harness;
}
