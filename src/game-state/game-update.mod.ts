import {defineAnthaMod} from '@antha/engine';
import {deployEnv, DeployEnv} from './deploy-env.js';
import {type FullGameState} from './game-state.js';
import {SessionScreen, startSingleplayer} from './multiplayer-session.js';

/**
 * Starts singleplayer and the first run once the engine is ready, unless co-op is available and the
 * player has to pick Singleplayer or Co-op from the main menu first.
 */
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

        if (state.ui?.session.screen === SessionScreen.Playing) {
            startSingleplayer(state);
        }
    },
});
