import {type AnthaAudioState} from '@antha/audio';
import {createAnthaEntity2dSuite} from '@antha/entity-2d';
import {type AnthaMultiplayerP2pLockStepState} from '@antha/multiplayer-p2p-lock-step';
import {type GameCommand} from './game-command.js';
import {type GameState} from './game-state.js';

type GameEntityState = GameState & AnthaAudioState & AnthaMultiplayerP2pLockStepState<GameCommand>;

/** Entity data updates run in `gameLockstepMod` so every peer simulates the same frames. */
export const {defineEntity, entityKeys, updateEntitiesMod, defineLogicEntity} =
    createAnthaEntity2dSuite<GameEntityState>({
        disableEntityUpdate: true,
    });
