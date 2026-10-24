import {isMuted} from '../audio/sfx.js';
import {getVolumes} from '../audio/volume-settings.js';
import {bossConfig} from '../config/boss-config.js';
import {hudConfig, satisfactionConfig, waveConfig} from '../config/game-config.js';
import {progressionConfig} from '../config/progression-config.js';
import {upgradeConfig} from '../config/upgrade-config.js';
import {type FullGameState} from '../game-state/game-state.js';
import {createSessionUi, type SessionUi} from '../game-state/multiplayer-session.js';
import {levels} from '../level/levels.js';
import {type Dish} from '../order/dish.js';
import {type Topping} from '../order/topping.js';
import {
    getNextUnlockProgress,
    getStarsFromPoints,
    getUpgradeStars,
    isTowerUnlocked,
} from '../progression/progression.js';
import {getRecords, saveFinishedRun, type Records} from '../records/records.js';
import {getWaveSettings, getWavesReached} from '../run/endless.js';
import {
    createInitialRunState,
    getSlotForClient,
    isCoopRun,
    type RunMode,
    type RunStatus,
    type ServingResult,
} from '../run/run-state.js';
import {
    getPlayerCount,
    getSlotColor,
    rankSlots,
    type SlotContribution,
} from '../run/slot-ranking.js';
import {hasTowerIcons} from '../tower/tower-icons.js';
import {
    getSellValue,
    getTowerStats,
    getUpgradeCost,
    TowerType,
    towerTypes,
} from '../tower/tower-type.js';
import {TowerEntity} from '../tower/tower.entity.js';
import {getServiceCost} from '../tower/wear.js';

/**
 * Plain copies of everything the HUD shows. `hudMod` builds a fresh snapshot every tick; the HUD
 * element only re-renders when a value in it changes. Add a field here when the HUD needs to show
 * something new, rather than passing the whole game state in (the HUD would never re-render, since
 * the state object reference never changes).
 */
export type HudSnapshot = {
    status: RunStatus;
    /** The current level's `levelId`, to highlight its card on the title. */
    levelId: string;
    mode: RunMode;
    /** True while the current or upcoming wave has a boss. */
    isBossWave: boolean;
    /** Endless: waves the restaurant got through. */
    wavesReached: number;
    /** Saved bests and the Hall of Mash Champs; includes the finished run once it is saved. */
    records: Records;
    /** True when the finished run beat a record. */
    newBest: boolean;
    /** Whether the run is paused. */
    paused: boolean;
    /** Name of the slot that paused the run; `undefined` when not paused or in singleplayer. */
    pausedByName: string | undefined;
    /** True when more than one player is in the run; fast-forward is off then. */
    isCoop: boolean;
    /** True when this client owns slot 0, the only one that can restart or change level in co-op. */
    isHost: boolean;
    /** Everyone in the room by slot, for the co-op lobby. */
    lobbyPlayers: Array<{
        slot: number;
        name: string;
        color: string;
        connected: boolean;
        isYou: boolean;
    }>;
    /** True when this client joined a co-op run in progress with no free slot: it can only watch. */
    isSpectator: boolean;
    /** The main menu, room list and connection status. */
    session: SessionUi;
    /**
     * Measured sim speed as a whole percent of real time (100 is real time). Filled in by `hudMod`,
     * which owns the clock; `undefined` from `createHudSnapshot` and until measured.
     */
    simSpeedPercent: number | undefined;
    /** Fast-forward speed (1, 1.5, 2 or 3). */
    speed: number;
    /** True while the speed is armed to drop back to 1x at the next income. */
    resetSpeedOnIncome: boolean;
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
    /** Players in the run; 1 in singleplayer, where the per-player column is hidden. */
    playerCount: number;
    /** Every player ranked by points, highest first. Tied top scorers are all crowned. */
    contributions: SlotContribution[];
    potatoesServed: number;
    /** 1-based number of the current or upcoming wave. */
    waveNumber: number;
    /** Campaign wave total; 0 in endless (no total). */
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
              prestigeDelta: number;
              /** Mash progress when served, 0 to 1. */
              progress: number;
          }
        | undefined;
    /** Set while the latest seagull steal is recent enough to show; `id` changes for each one. */
    stealPopup: {satisfactionDelta: number; prestigeDelta: number; id: number} | undefined;
    /** Potatoes seagulls got away with this run. */
    potatoesStolen: number;
    /** True once the toolbar's tower icon images exist, so the toolbar re-renders with them. */
    towerIconsReady: boolean;
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
              /** Stars needed for the next level when the rating is too low, else `undefined`. */
              upgradeNeedsStars: number | undefined;
              sellValue: number;
              /** Wear 0 to 100, rounded so the HUD re-renders only on whole steps. */
              wear: number;
              serviceCost: number;
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
              prestigeDelta: number;
              id: number;
          }
        | undefined;
    /** True while the boss banner shows; `id` is when the boss spawned, so each boss restarts it. */
    bossBanner: {id: number} | undefined;
    /** Restaurant prestige, 0 to 5 in half steps. */
    prestigeStars: number;
    /** Prestige points to one decimal, shown as the live value. */
    prestigePoints: number;
    /** Progress to the next unlock (tower or upgrade level), `undefined` when none is left. */
    unlockProgress: {nextStars: number; fraction: number} | undefined;
    /** Tower types the current stars let the player build. */
    unlockedTowers: TowerType[];
    /** The unlock or lock banner while it is recent. `id` restarts it. */
    prestigeBanner: {id: number; text: string} | undefined;
    /** Toolbar buttons glowing because they just unlocked. */
    glowTowers: TowerType[];
    /** The one-time wave-1 hint on the first map. */
    tutorialHint: string | undefined;
    /** Whether sound effects are muted. */
    muted: boolean;
    /** Music and sound effect volumes, 0 to 1. */
    volumes: {music: number; effects: number};
};

/** Describes the selected built tower for the tower panel, if one is selected and still exists. */
function getSelectedTower(
    state: Partial<FullGameState>,
    stars: number,
): HudSnapshot['selectedTower'] {
    const selectedId = state.ui?.selectedTowerId;
    if (selectedId == undefined || !state.entityStore) {
        return undefined;
    }

    for (const tower of state.entityStore.getEntities(TowerEntity)) {
        const {towerId, towerType, level, wear} = tower.params;
        if (towerId === selectedId) {
            return {
                towerId,
                towerType,
                level,
                upgradeNeedsStars:
                    level < upgradeConfig.maxLevel && stars < getUpgradeStars(level + 1)
                        ? getUpgradeStars(level + 1)
                        : undefined,
                upgradeCost:
                    level < upgradeConfig.maxLevel
                        ? getUpgradeCost(towerType, (level + 1) as 2 | 3)
                        : undefined,
                sellValue: getSellValue(towerType, level),
                wear: Math.round(wear),
                serviceCost: getServiceCost(towerType),
                stats: getTowerStats(towerType, level, wear),
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
    const session =
        state.ui?.session ??
        createSessionUi({
            enabled: false,
            search: '',
        });
    const clientId = state.multiplayerP2pLockStep?.multiplayerController.getClientId();
    const totalScore = Object.values(runState.scoreBySlot).reduce((sum, score) => sum + score, 0);
    const prestigeStars = getStarsFromPoints(runState.prestigePoints);
    const notice = runState.prestigeNotice;
    const noticeRecent =
        notice && runState.elapsedMs - notice.atMs < progressionConfig.noticeMs
            ? notice
            : undefined;
    const playerCount = getPlayerCount(runState);
    // Saves the finished run exactly once (UI side), before `records` is read below.
    const newBest = saveFinishedRun(runState, {
        score: totalScore,
        stars: prestigeStars,
        wavesReached: getWavesReached(runState),
        playerCount,
    });

    return {
        status: runState.status,
        levelId: runState.levelId,
        mode: runState.mode,
        isBossWave: (getWaveSettings(runState, runState.waveIndex)?.bossCount ?? 0) > 0,
        wavesReached: getWavesReached(runState),
        records: getRecords(),
        newBest: newBest ?? false,
        paused: runState.paused,
        pausedByName:
            runState.paused && runState.pausedBySlot != undefined && isCoopRun(runState)
                ? (runState.slotNames[runState.pausedBySlot] ??
                  `Player ${runState.pausedBySlot + 1}`)
                : undefined,
        isCoop: isCoopRun(runState),
        lobbyPlayers: Object.keys(runState.slotNames)
            .map(Number)
            .sort((first, second) => first - second)
            .map((slot) => {
                return {
                    slot,
                    name: runState.slotNames[slot] ?? `Player ${slot + 1}`,
                    color: getSlotColor(slot),
                    connected: runState.connected[slot] !== false,
                    isYou: !!clientId && runState.slotByClientId[clientId] === slot,
                };
            }),
        isSpectator:
            !!state.ui?.session.roomName &&
            Object.keys(runState.slotByClientId).length > 0 &&
            !!clientId &&
            !(clientId in runState.slotByClientId),
        session: {
            ...session,
            rooms: session.rooms?.map((room) => {
                return {
                    ...room,
                };
            }),
        },
        isHost: getSlotForClient(runState, clientId) === 0,
        simSpeedPercent: undefined,
        speed: runState.speed,
        resetSpeedOnIncome: runState.resetSpeedOnIncome,
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
        totalScore,
        playerCount,
        contributions: rankSlots(runState),
        potatoesServed: runState.potatoesServed,
        waveNumber: runState.waveIndex + 1,
        waveCount: runState.mode === 'endless' ? 0 : waveConfig.waves.length,
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
                      prestigeDelta: lastServing.prestigeDelta,
                      progress: lastServing.progress,
                  }
                : undefined,
        stealPopup:
            lastSteal && runState.elapsedMs - lastSteal.atMs < hudConfig.servingPopupMs
                ? {
                      satisfactionDelta: lastSteal.satisfactionDelta,
                      prestigeDelta: lastSteal.prestigeDelta,
                      id: lastSteal.atMs,
                  }
                : undefined,
        potatoesStolen: runState.potatoesStolen,
        towerIconsReady: hasTowerIcons(),
        selectedTowerType: state.ui?.selectedTowerType,
        selectedTopping: state.ui?.selectedTopping,
        selectedTower: getSelectedTower(state, prestigeStars),
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
                      prestigeDelta: lastOrderEvent.prestigeDelta,
                      id: lastOrderEvent.atMs,
                  }
                : undefined,
        bossBanner:
            runState.lastBossSpawnAtMs >= 0 &&
            runState.elapsedMs - runState.lastBossSpawnAtMs < bossConfig.bannerMs
                ? {
                      id: runState.lastBossSpawnAtMs,
                  }
                : undefined,
        prestigeStars,
        prestigePoints: Math.round(runState.prestigePoints * 10) / 10,
        unlockProgress: getNextUnlockProgress(runState.prestigePoints),
        unlockedTowers: Object.values(TowerType).filter((towerType) => {
            return isTowerUnlocked(towerType, prestigeStars);
        }),
        prestigeBanner: noticeRecent
            ? {
                  id: noticeRecent.id,
                  text:
                      noticeRecent.kind === 'unlocked'
                          ? `🔓 ${noticeRecent.towerTypes.map((type) => towerTypes[type].label).join(', ')} unlocked!`
                          : `🔒 ${noticeRecent.towerTypes.map((type) => towerTypes[type].label).join(', ')} locked: prestige too low`,
              }
            : undefined,
        glowTowers: noticeRecent?.kind === 'unlocked' ? noticeRecent.towerTypes : [],
        tutorialHint:
            runState.status === 'playing' &&
            runState.waveIndex === 0 &&
            prestigeStars === 0 &&
            runState.elapsedMs < progressionConfig.tutorialHintMs &&
            runState.levelId === levels[0]?.levelId
                ? progressionConfig.tutorialHint
                : undefined,
        muted: isMuted(),
        volumes: {
            ...getVolumes(),
        },
    };
}
