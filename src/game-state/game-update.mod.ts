import {defineAnthaMod} from '@antha/engine';
import {deployEnv, DeployEnv} from './deploy-env.js';
import {GameCommandType, sendGameCommand} from './game-command.js';
import {type FullGameState} from './game-state.js';

/** Starts singleplayer and the first run once the engine is ready. */
export const gameUpdateMod = defineAnthaMod<
    FullGameState & {
        hasStartedInitialGame: boolean;
    }
>({
    modName: 'game-update',
    execute({state}) {
        if (
            state.hasStartedInitialGame ||
            !state.multiplayerP2pLockStep ||
            !state.entityStore ||
            !state.pixi?.pixiApplication?.screen
        ) {
            return;
        }

        state.hasStartedInitialGame = true;

        if (deployEnv === DeployEnv.Dev) {
            /** Lets you inspect live state from the browser console as `gameState`. */
            (globalThis as Record<string, unknown>).gameState = state;
        }

        state.multiplayerP2pLockStep.multiplayerController.startSingleplayer();
        sendGameCommand(state, {
            type: GameCommandType.StartRun,
        });
    },
});
