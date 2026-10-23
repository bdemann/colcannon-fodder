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
import {gameCommandHandlers} from './game-command-handlers.js';
import {type GameCommand} from './game-command.js';
import {gameEntities} from './game-entities.js';
import {type FullGameState} from './game-state.js';

/** Snapshot sent to a peer that joins mid-run (co-op, later). */
type GameStateSync = {
    entities: SerializedEntity2d[];
    randomState: SeededRandomState;
    runState: RunState;
};

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
        createStateHash({state}) {
            if (!state.entityStore || !state.seededRandom || !state.runState) {
                return undefined;
            }

            return hashObject([
                state.entityStore.hashEntities(),
                state.seededRandom.exportState(),
                state.runState,
            ]);
        },
    },
    stateSync: {
        createStateSync({state}) {
            if (!state.entityStore || !state.seededRandom || !state.runState) {
                throw new Error('Cannot create state sync: game state is incomplete.');
            }

            return {
                entities: state.entityStore.createSnapshot(),
                randomState: state.seededRandom.exportState(),
                runState: state.runState,
            };
        },
        async loadStateSync({state, stateSync}) {
            if (!state.entityStore) {
                throw new Error('Cannot load state sync: no entity store exists.');
            }

            state.seededRandom = SeededRandom.fromState(stateSync.randomState);
            state.runState = stateSync.runState;
            state.entityStore.destroyAllEntities();
            state.entityStore.registerEntities({
                entities: gameEntities,
            });
            await state.entityStore.loadSnapshot(stateSync.entities);
        },
        resyncOnDesync: true,
    },
    async handlePacket({packet, state}) {
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
    handleClientStatus() {},
    async runFrameUpdate(frameUpdateParams) {
        const {state} = frameUpdateParams;

        if (state.runState?.status !== RunStatus.Playing) {
            /** The board freezes on game over so the player can see how it ended. */
            return;
        }

        state.runState.elapsedMs += frameUpdateParams.msSinceLastExecute;
        await state.entityStore?.updateAllEntities(frameUpdateParams);
    },
});
