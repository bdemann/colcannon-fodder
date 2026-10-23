import {type FullGameState} from '../game-state/game-state.js';
import {createInitialRunState, type RunState} from '../run/run-state.js';
import {type TowerType} from '../tower/tower-type.js';

/**
 * Plain copies of everything the HUD shows. `hudMod` builds a fresh snapshot every tick; the HUD
 * element only re-renders when a value in it changes. Add a field here when the HUD needs to show
 * something new, rather than passing the whole game state in (the HUD would never re-render, since
 * the state object reference never changes).
 */
export type HudSnapshot = {
    runState: RunState;
    selectedTowerType: TowerType | undefined;
};

export function createHudSnapshot(state: Partial<FullGameState>): HudSnapshot {
    return {
        runState: structuredClone(state.runState ?? createInitialRunState()),
        selectedTowerType: state.ui?.selectedTowerType,
    };
}
