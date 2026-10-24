import {isMuted} from '../audio/sfx.js';
import {getVolumes} from '../audio/volume-settings.js';
import {hudConfig, satisfactionConfig, waveConfig} from '../config/game-config.js';
import {upgradeConfig} from '../config/upgrade-config.js';
import {type FullGameState} from '../game-state/game-state.js';
import {type Dish} from '../order/dish.js';
import {type Topping} from '../order/topping.js';
import {getPrestigeStars} from '../quality/quality.js';
import {createInitialRunState, type RunStatus, type ServingResult} from '../run/run-state.js';
import {getSellValue, getTowerStats, getUpgradeCost, type TowerType} from '../tower/tower-type.js';
import {TowerEntity} from '../tower/tower.entity.js';

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
    /** Total coins earned this run. */
    coinsEarned: number;
    /** Recent coin events to float over the field; `id` is unique per event. */
    coinPopups: Array<{
        id: number;
        amount: number;
        reason: string;
        x: number;
        y: number;
        /** Extra upward shift so popups at the same spot do not overlap. */
        staggerPx: number;
    }>;
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
              sentBack: boolean;
          }
        | undefined;
    /** Set while the latest seagull steal is recent enough to show; `id` changes for each one. */
    stealPopup: {satisfactionDelta: number; id: number} | undefined;
    /** Potatoes seagulls got away with this run. */
    potatoesStolen: number;
    selectedTowerType: TowerType | undefined;
    selectedTopping: Topping | undefined;
    /** The built tower selected for upgrade or sale, for the tower panel. */
    selectedTower:
        | {
              towerId: number;
              towerType: TowerType;
              level: number;
              /** `undefined` at the max level. */
              upgradeCost: number | undefined;
              sellValue: number;
              stats: {damage: number; rangePx: number; cooldownMs: number};
          }
        | undefined;
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
    /** Restaurant prestige, 0 to 5 in half steps. */
    prestigeStars: number;
    /** Whether sound effects are muted. */
    muted: boolean;
    /** Music and sound effect volumes, 0 to 1. */
    volumes: {music: number; effects: number};
};

/** Describes the selected built tower for the tower panel, if one is selected and still exists. */
function getSelectedTower(state: Partial<FullGameState>): HudSnapshot['selectedTower'] {
    const selectedId = state.ui?.selectedTowerId;
    if (selectedId == undefined || !state.entityStore) {
        return undefined;
    }

    for (const tower of state.entityStore.getEntities(TowerEntity)) {
        const {towerId, towerType, level} = tower.params;
        if (towerId === selectedId) {
            return {
                towerId,
                towerType,
                level,
                upgradeCost:
                    level < upgradeConfig.maxLevel
                        ? getUpgradeCost(towerType, (level + 1) as 2 | 3)
                        : undefined,
                sellValue: getSellValue(towerType, level),
                stats: getTowerStats(towerType, level),
            };
        }
    }

    return undefined;
}

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
        coinsEarned: runState.coinsEarned,
        coinPopups: runState.coinEvents
            .filter((event) => runState.elapsedMs - event.atMs < hudConfig.coinPopupMs)
            .map((event) => {
                return {
                    id: event.id,
                    amount: event.amount,
                    reason: event.reason,
                    x: event.x,
                    y: event.y,
                    staggerPx:
                        (event.id % hudConfig.coinPopupStaggerSlots) * hudConfig.coinPopupStaggerPx,
                };
            }),
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
                      id: lastServing.sentBack
                          ? -lastServing.servedAtMs - 1
                          : runState.potatoesServed,
                      scoreDelta: lastServing.scoreDelta,
                      satisfactionDelta: lastServing.satisfactionDelta,
                      progress: lastServing.progress,
                      sentBack: lastServing.sentBack,
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
        selectedTower: getSelectedTower(state),
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
        prestigeStars: getPrestigeStars(runState.recentQualities),
        muted: isMuted(),
        volumes: {
            ...getVolumes(),
        },
    };
}
