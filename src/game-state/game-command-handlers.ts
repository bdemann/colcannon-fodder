import {type MultiplayerFramePacket} from '@antha/multiplayer-p2p-lock-step';
import {type MaybePromise} from '@augment-vir/common';
import {LevelEntity} from '../level/level.entity.js';
import {PotatoSpawnerEntity} from '../potato/potato-spawner.entity.js';
import {createInitialRunState} from '../run/run-state.js';
import {GameCommandType, type GameCommand} from './game-command.js';
import {type FullGameState} from './game-state.js';

/** Parameters every command handler receives. `detail.sourceClientId` is who sent it. */
export type GameCommandHandlerParams<Type extends GameCommandType> = Readonly<{
    detail: Readonly<MultiplayerFramePacket<Extract<GameCommand, {type: Type}>>>;
    state: Partial<FullGameState>;
}>;

/**
 * The player slot that sent a command. Singleplayer is always slot 0. Co-op will take the command's
 * `detail.sourceClientId` and map it to that client's slot.
 */
export function getCommandSlot(): number {
    return 0;
}

/**
 * Applies commands to the simulation. Handlers run inside lockstep frames, so they may change
 * entities and `state.runState`, must only use `state.seededRandom` for randomness, and must never
 * read `state.ui`.
 */
export const gameCommandHandlers: {
    [Type in GameCommandType]: (params: GameCommandHandlerParams<Type>) => MaybePromise<void>;
} = {
    async [GameCommandType.StartRun]({state}) {
        if (!state.entityStore) {
            throw new Error('Cannot start run: no entity store exists.');
        }

        state.entityStore.destroyAllEntities();
        state.runState = createInitialRunState();
        await state.entityStore.addEntity(LevelEntity);
        await state.entityStore.addEntity(PotatoSpawnerEntity, {
            msUntilNextSpawn: 0,
        });
    },
    [GameCommandType.PlaceTower]({detail}) {
        /** Implemented in issue "Place towers beside the path". */
        console.info('PlaceTower command received', detail.packet);
    },
};
