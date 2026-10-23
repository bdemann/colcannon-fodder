import {type createAnthaAudioMod, type createAnthaBackgroundAudioMod} from '@antha/audio';
import {type AnthaModsState} from '@antha/engine';
import {type createAnthaMultiplayerP2pLockStepMod} from '@antha/multiplayer-p2p-lock-step';
import {type Coords, type SeededRandom} from '@augment-vir/common';
import {type LevelDefinition} from '../level/level.js';
import {type RunState} from '../run/run-state.js';
import {type TowerType} from '../tower/tower-type.js';
import {type GameCommand} from './game-command.js';
import {type updateEntitiesMod} from './game-entity.mod.js';

/**
 * Local, per-browser UI state. Never read this from simulation code (command handlers or entity
 * `update` methods): in co-op each peer has its own UI state, so reading it would desync the game.
 * UI code turns it into `GameCommand`s instead.
 */
export type UiState = {
    selectedTowerType: TowerType | undefined;
    /** Mouse position in game-world coordinates, or `undefined` when outside the canvas. */
    pointerWorld: Coords | undefined;
    /** Left clicks on the canvas, in game-world coordinates, not yet handled. Consumers clear it. */
    pendingClicks: Coords[];
    /** `KeyboardEvent.key` values pressed since the last tick, not yet handled. Consumers clear it. */
    pendingKeys: string[];
};

/** Holds the game-specific data shared by all engine mods. */
export type GameState = {
    level: LevelDefinition;
    runState: RunState;
    seededRandom: SeededRandom;
    ui: UiState;
};

/** Derives complete game state from the mods that create and consume its shared properties. */
export type FullGameState = AnthaModsState<
    [
        ReturnType<typeof createAnthaAudioMod>,
        ReturnType<typeof createAnthaBackgroundAudioMod>,
        typeof updateEntitiesMod,
        ReturnType<typeof createAnthaMultiplayerP2pLockStepMod<GameCommand>>,
    ]
>;
