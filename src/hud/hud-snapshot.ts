import {isMuted} from '../audio/sfx.js';
import {hudConfig, satisfactionConfig, waveConfig} from '../config/game-config.js';
import {type FullGameState} from '../game-state/game-state.js';
import {type Dish} from '../order/dish.js';
import {type Topping} from '../order/topping.js';
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
    /** Whether the run is paused. */
    paused: boolean;
    satisfaction: number;
    maxSatisfaction: number;
    coins: number;
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
    servingPopup:
        | {
              result: ServingResult;
              id: number;
              scoreDelta: number;
              satisfactionDelta: number;
              /** Mash progress when served, 0 to 1. */
              progress: number;
          }
        | undefined;
    /** Set while the latest seagull steal is recent enough to show; `id` changes for each one. */
    stealPopup: {satisfactionDelta: number; id: number} | undefined;
    /** Potatoes seagulls got away with this run. */
    potatoesStolen: number;
    selectedTowerType: TowerType | undefined;
    selectedTopping: Topping | undefined;
    /** Open orders, oldest first. Times are coarse so the HUD re-renders only a few times a second. */
    orders: Array<{orderId: number; dish: Dish; secondsLeft: number; fractionLeft: number}>;
    /** Set while the latest order outcome is recent enough to show; `id` changes for each one. */
    orderPopup:
        | {
              kind: 'fulfilled' | 'expired';
              dish: Dish;
              scoreDelta: number;
              satisfactionDelta: number;
              id: number;
          }
        | undefined;
    /** Whether sound effects are muted. */
    muted: boolean;
};

export function createHudSnapshot(state: Partial<FullGameState>): HudSnapshot {
    const runState = state.runState ?? createInitialRunState();
    const lastServing = runState.lastServing;
    const lastOrderEvent = runState.lastOrderEvent;
    const lastSteal = runState.lastSteal;

    return {
        status: runState.status,
        paused: runState.paused,
        satisfaction: runState.satisfaction,
        maxSatisfaction: satisfactionConfig.max,
        coins: runState.coins,
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
                      scoreDelta: lastServing.scoreDelta,
                      satisfactionDelta: lastServing.satisfactionDelta,
                      progress: lastServing.progress,
                  }
                : undefined,
        stealPopup:
            lastSteal && runState.elapsedMs - lastSteal.atMs < hudConfig.servingPopupMs
                ? {
                      satisfactionDelta: lastSteal.satisfactionDelta,
                      id: lastSteal.atMs,
                  }
                : undefined,
        potatoesStolen: runState.potatoesStolen,
        selectedTowerType: state.ui?.selectedTowerType,
        selectedTopping: state.ui?.selectedTopping,
        orders: runState.orders.map((order) => {
            const totalMs = Math.max(1, order.expiresAtMs - order.createdAtMs);
            const leftMs = Math.max(0, order.expiresAtMs - runState.elapsedMs);

            return {
                orderId: order.orderId,
                dish: order.dish,
                secondsLeft: Math.ceil(leftMs / 1000),
                fractionLeft: Math.min(1, Math.round((leftMs / totalMs) * 20) / 20),
            };
        }),
        orderPopup:
            lastOrderEvent && runState.elapsedMs - lastOrderEvent.atMs < hudConfig.servingPopupMs
                ? {
                      kind: lastOrderEvent.kind,
                      dish: lastOrderEvent.dish,
                      scoreDelta: lastOrderEvent.scoreDelta,
                      satisfactionDelta: lastOrderEvent.satisfactionDelta,
                      id: lastOrderEvent.atMs,
                  }
                : undefined,
        muted: isMuted(),
    };
}
