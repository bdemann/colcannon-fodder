import {type ModExecuteParams} from '@antha/engine';
import {type SerializedEntity2d} from '@antha/entity-2d';
import {createAnthaMultiplayerP2pLockStepMod} from '@antha/multiplayer-p2p-lock-step';
import {hashObject} from '@antha/util';
import {
    ensureErrorAndPrependMessage,
    log,
    SeededRandom,
    type SeededRandomState,
} from '@augment-vir/common';
import {RunStatus, type RunState} from '../run/run-state.js';
import {getEffectiveSpeed, stepsForFrame} from '../run/speed.js';
import {
    gameCommandHandlers,
    isSpectatorCommand,
    syncLevelWithRunState,
} from './game-command-handlers.js';
import {GameCommandType, type GameCommand} from './game-command.js';
import {gameEntities} from './game-entities.js';
import {type FullGameState} from './game-state.js';
import {handleHostLost} from './multiplayer-session.js';

/** Snapshot sent to a peer that joins mid-run (co-op, later). */
export type GameStateSync = {
    entities: SerializedEntity2d[];
    randomState: SeededRandomState;
    runState: RunState;
};

/** Hashes the state that must match across peers; `undefined` before the state is complete. */
export function createGameStateHash({state}: {state: Partial<FullGameState>}): number | undefined {
    if (!state.entityStore || !state.seededRandom || !state.runState) {
        return undefined;
    }

    return hashObject([
        state.entityStore.hashEntities(),
        state.seededRandom.exportState(),
        /** Round-tripped through JSON so keys holding `undefined` match a state-synced peer. */
        JSON.parse(JSON.stringify(state.runState)),
    ]);
}

/** Captures the host's state for a joining peer. */
export function createGameStateSync({state}: {state: Partial<FullGameState>}): GameStateSync {
    if (!state.entityStore || !state.seededRandom || !state.runState) {
        throw new Error('Cannot create state sync: game state is incomplete.');
    }

    return {
        entities: state.entityStore.createSnapshot(),
        randomState: state.seededRandom.exportState(),
        runState: state.runState,
    };
}

/** Replaces this peer's simulation state (including the level) with the host's. */
export async function loadGameStateSync({
    state,
    stateSync,
}: {
    state: Partial<FullGameState>;
    stateSync: GameStateSync;
}) {
    if (!state.entityStore) {
        throw new Error('Cannot load state sync: no entity store exists.');
    }

    state.seededRandom = SeededRandom.fromState(stateSync.randomState);
    state.runState = stateSync.runState;
    syncLevelWithRunState(state);
    state.entityStore.destroyAllEntities();
    state.entityStore.registerEntities({
        entities: gameEntities,
    });
    await state.entityStore.loadSnapshot(stateSync.entities);
}

/** Advances run time and every entity by one lockstep frame (after its commands were applied). */
export async function runGameFrameUpdate(
    frameUpdateParams: Readonly<ModExecuteParams<FullGameState>>,
) {
    const {state} = frameUpdateParams;

    /** The board freezes on game over so the player can see how it ended, and while paused. */
    if (state.runState?.status !== RunStatus.Playing || state.runState.paused) {
        return;
    }

    const {steps, accumulator} = stepsForFrame({
        accumulator: state.runState.speedAccumulator,
        speed: getEffectiveSpeed(state.runState),
    });
    state.runState.speedAccumulator = accumulator;

    /** Fast-forward runs extra fixed-size steps; time is never scaled. */
    for (let step = 0; step < steps; step++) {
        /** A step can end the run (win or loss), which stops the remaining steps. */
        if ((state.runState.status as RunStatus) !== RunStatus.Playing) {
            break;
        }
        state.runState.elapsedMs += frameUpdateParams.msSinceLastExecute;
        await state.entityStore?.updateAllEntities(frameUpdateParams);
    }
}

/**
 * Runs the simulation. Each lockstep frame first applies that frame's commands, then advances run
 * time and every entity's `update`. Singleplayer uses the same path with no network.
 */
export const gameLockstepMod = createAnthaMultiplayerP2pLockStepMod<
    GameCommand,
    FullGameState,
    GameStateSync
>({
    gameId: 'colcannon-fodder',
    desyncCheck: {
        interval: {
            seconds: 1,
        },
        createStateHash: createGameStateHash,
    },
    stateSync: {
        createStateSync: createGameStateSync,
        loadStateSync: loadGameStateSync,
        resyncOnDesync: true,
    },
    async handlePacket({packet, state}) {
        if (isSpectatorCommand(state, packet.sourceClientId, packet.packet.type)) {
            return;
        }
        try {
            await (
                gameCommandHandlers[packet.packet.type] as (params: {
                    detail: typeof packet;
                    state: typeof state;
                }) => unknown
            )({
                detail: packet,
                state,
            });
        } catch (error) {
            log.error(
                ensureErrorAndPrependMessage(
                    error,
                    `Failed to handle '${packet.packet.type}' command.`,
                ),
            );
        }
    },
    handleClientStatus({event, multiplayerController, state}) {
        /** Host loss ends the room for v1: there is no host migration. */
        if (event.detail.lostHost != undefined) {
            handleHostLost(state);
            return;
        }
        if (multiplayerController.isHost() && 'lostMember' in event.detail) {
            multiplayerController.act({
                type: GameCommandType.LeaveRun,
                clientId: event.detail.lostMember,
            });
        }
    },
    runFrameUpdate: runGameFrameUpdate,
});
