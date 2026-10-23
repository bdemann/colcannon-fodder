import {isMuted} from '../audio/sfx.js';
import {hudConfig, satisfactionConfig, waveConfig} from '../config/game-config.js';
import {type FullGameState} from '../game-state/game-state.js';
import {createInitialRunState, type RunStatus, type ServingResult} from '../run/run-state.js';
import {type TowerType} from '../tower/tower-type.js';

/**
 * Plain copies of everything the HUD shows. `hudMod` builds a fresh snapshot every tick; the HUD
 * element only re-renders when a value in it changes. Add a field here when the HUD needs to show
 * something new, rather than passing the whole game state in (the HUD would never re-render, since
 * the state object reference never changes).
 */
export type HudSnapshot = {
    status: RunStatus;
    satisfaction: number;
    maxSatisfaction: number;
    /** Sum of every slot's score. */
    totalScore: number;
    potatoesServed: number;
    potatoesPerRun: number;
    /** 1-based number of the current or upcoming wave. */
    waveNumber: number;
    waveCount: number;
    wavePhase: 'break' | 'spawning' | 'done';
    /** Whole seconds left in the break (0 outside a break), so the HUD updates once a second. */
    breakSecondsLeft: number;
    servingCounts: Record<ServingResult, number>;
    /** Set while the latest serving is recent enough to show; `id` changes for each serving. */
    servingPopup: {result: ServingResult; id: number} | undefined;
    selectedTowerType: TowerType | undefined;
    /** Whether sound effects are muted. */
    muted: boolean;
};

export function createHudSnapshot(state: Partial<FullGameState>): HudSnapshot {
    const runState = state.runState ?? createInitialRunState();
    const lastServing = runState.lastServing;

    return {
        status: runState.status,
        satisfaction: runState.satisfaction,
        maxSatisfaction: satisfactionConfig.max,
        totalScore: Object.values(runState.scoreBySlot).reduce((sum, score) => sum + score, 0),
        potatoesServed: runState.potatoesServed,
        potatoesPerRun: runState.potatoesPerRun,
        waveNumber: runState.waveIndex + 1,
        waveCount: waveConfig.waves.length,
        wavePhase: runState.wavePhase,
        breakSecondsLeft:
            runState.wavePhase === 'break' ? Math.ceil(runState.breakRemainingMs / 1000) : 0,
        servingCounts: {
            ...runState.servingCounts,
        },
        servingPopup:
            lastServing && runState.elapsedMs - lastServing.servedAtMs < hudConfig.servingPopupMs
                ? {
                      result: lastServing.result,
                      id: runState.potatoesServed,
                  }
                : undefined,
        selectedTowerType: state.ui?.selectedTowerType,
        muted: isMuted(),
    };
}
