import {type AssetLoader, type AssetLoadSession} from '@antha/asset';
import {AudioPlayer, createAnthaAudioMod, createAnthaBackgroundAudioMod} from '@antha/audio';
import {type AnthaEngine} from '@antha/engine';
import {loadAnthaAssets} from '@antha/entity-2d';
import {createAnthaFpsMod} from '@antha/fps';
import {
    createAnthaGraphics2dMod,
    createAnthaVirtualViewportMod,
    createVirtualViewportPixiOptions,
} from '@antha/graphics-2d';
import {randomString, SeededRandom} from '@augment-vir/common';
import {css} from 'element-vir';
import {gameAudio, gameAudioFilesToLoad, GameAudioKey} from '../audio/game-audio.js';
import {hudMod} from '../hud/hud.mod.js';
import {inputMod} from '../input/input.mod.js';
import {defaultLevel} from '../level/levels.js';
import {toppingInputMod} from '../order/topping-input.mod.js';
import {projectileLayerMod} from '../projectile/projectile-layer.js';
import {createInitialRunState} from '../run/run-state.js';
import {towerPlacementMod} from '../tower/tower-placement.mod.js';
import {deployEnv, DeployEnv} from './deploy-env.js';
import {gameEntities} from './game-entities.js';
import {updateEntitiesMod} from './game-entity.mod.js';
import {gameLockstepMod} from './game-lockstep.mod.js';
import {type FullGameState} from './game-state.js';
import {gameUpdateMod} from './game-update.mod.js';
import {gameWorldSize} from './game-world.js';

/** Loads assets and installs the game mods so a new engine starts a playable session. */
export async function bootstrapGame({
    assetLoader,
    engine,
    loadSession,
    state,
}: Readonly<{
    assetLoader: AssetLoader;
    engine: AnthaEngine;
    loadSession: AssetLoadSession;
    state: Partial<FullGameState>;
}>) {
    engine.currentMods.push(
        createAnthaVirtualViewportMod({
            virtualHeight: gameWorldSize.height,
            virtualWidth: gameWorldSize.width,
        }),
    );
    const audioPlayer = new AudioPlayer();
    state.audioPlayer = audioPlayer;

    await loadAnthaAssets(
        {
            assetLoader,
            audio: {
                assetName: 'Game audio',
                audioPlayer,
                files: gameAudioFilesToLoad,
                serial: true,
            },
            entities: gameEntities,
        },
        {
            doNotUnload: true,
            loadSession,
        },
    );

    state.currentBackgroundAudio = gameAudio[GameAudioKey.GameMusic];
    state.level = defaultLevel;
    state.runState = createInitialRunState();
    state.seededRandom = SeededRandom.fromSeed(randomString());
    state.ui = {
        selectedTowerType: undefined,
        selectedTopping: undefined,
        selectedTowerId: undefined,
        pointerWorld: undefined,
        clicks: [],
        keys: [],
        wheelSteps: 0,
        placementAngleDeg: 0,
    };

    return {
        mods: [
            createAnthaGraphics2dMod({
                extraCanvasWrapperStyles: css`
                    z-index: 0;
                `,
                pixiOptions: {
                    background: 'black',
                    ...createVirtualViewportPixiOptions(),
                },
            }),
            ...(deployEnv === DeployEnv.Dev
                ? [
                      createAnthaFpsMod({
                          debugFps: true,
                      }),
                  ]
                : []),
            createAnthaAudioMod(),
            inputMod,
            updateEntitiesMod,
            gameLockstepMod,
            gameUpdateMod,
            towerPlacementMod,
            projectileLayerMod,
            toppingInputMod,
            hudMod,
            createAnthaBackgroundAudioMod(),
        ],
    };
}
