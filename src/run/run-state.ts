import {assertWrap} from '@augment-vir/assert';
import {
    coopConfig,
    economyConfig,
    orderConfig,
    satisfactionConfig,
    waveConfig,
} from '../config/game-config.js';
import {defaultLevel, getLevel} from '../level/levels.js';
import {type Dish} from '../order/dish.js';
import {type TowerType} from '../tower/tower-type.js';

/** Campaign has a fixed list of waves; endless generates waves forever. */
export type RunMode = 'campaign' | 'endless';

export enum RunStatus {
    /** Title screen: the run is set up but frozen until `BeginRun`. */
    Ready = 'ready',
    Playing = 'playing',
    Won = 'won',
    Lost = 'lost',
}

/** What the customers thought of one potato. See `docs/spec.md` section 4. */
export enum ServingResult {
    /** Fully mashed. */
    Perfect = 'perfect',
    /** Touched, but not fully mashed. */
    Incomplete = 'incomplete',
    /** Untouched. */
    Raw = 'raw',
}

/** A potato's processing: two status effects plus the mash meter. */
export type PotatoProcessing = {
    cut: boolean;
    cooked: boolean;
    /** Mash left to do. 0 = fully mashed. */
    mashHp: number;
    maxMashHp: number;
};

/** The most recent serving, kept so the HUD can show a short result popup. */
export type LastServing = {
    result: ServingResult;
    /** `runState.elapsedMs` when it was served. */
    servedAtMs: number;
    /** What this serving actually changed. */
    scoreDelta: number;
    satisfactionDelta: number;
    /** Mash progress when served, 0 to 1. Lets the popup say how close it was. */
    progress: number;
    /** Prestige points this serving changed. */
    prestigeDelta: number;
};

/** The most recent steal by a seagull, kept so the HUD can show a short popup. */
export type LastSteal = {
    /** `runState.elapsedMs` when the gull escaped. */
    atMs: number;
    satisfactionDelta: number;
    prestigeDelta: number;
};

/** One open customer order. */
export type Order = {
    orderId: number;
    dish: Dish;
    /** `runState.elapsedMs` when it was placed and when it expires. */
    createdAtMs: number;
    expiresAtMs: number;
};

/** The most recent order outcome, kept so the HUD can show a short popup. */
export type LastOrderEvent = {
    kind: 'fulfilled' | 'expired';
    dish: Dish;
    atMs: number;
    scoreDelta: number;
    satisfactionDelta: number;
    prestigeDelta: number;
};

/** Towers that just unlocked or locked because prestige moved, for the HUD banner. */
export type PrestigeNotice = {
    /** Counts up so each notice restarts the banner. */
    id: number;
    atMs: number;
    kind: 'unlocked' | 'locked';
    towerTypes: TowerType[];
};

/** One change to the coins, kept so the HUD can float a popup with the reason. */
export type CoinEvent = {
    id: number;
    /** `runState.elapsedMs` when it happened. */
    atMs: number;
    /** 0 for a "no pay" event. */
    amount: number;
    reason: string;
    /** World position of the popup. */
    x: number;
    y: number;
};

/**
 * Everything about the current run that is not an entity. It is plain JSON so it can be synced to
 * peers later. Only change it inside command handlers or entity `update` calls (both run in
 * lockstep frames), never from UI code.
 */
export type RunState = {
    /** Which level this run is on (`LevelDefinition.levelId`). Set by `StartRun`. */
    levelId: string;
    /** Set by `StartRun`. */
    mode: RunMode;
    status: RunStatus;
    /** Freezes the whole simulation while `Playing`. Toggled by `TogglePause`. */
    paused: boolean;
    /** The slot that paused the run, so only it (or slot 0) can resume. `undefined` when not paused. */
    pausedBySlot: number | undefined;
    /** Fast-forward: simulation steps per frame (1, 1.5, 2 or 3). Set by `SetSpeed`. */
    speed: number;
    /** When true, the next income sets `speed` back to 1 (see `addCoins`). */
    resetSpeedOnIncome: boolean;
    /** Fractional steps carried between frames so 1.5x alternates 1 and 2 steps. */
    speedAccumulator: number;
    satisfaction: number;
    /** Coins shared by the whole restaurant; spent on towers, earned by servings. */
    coins: number;
    /** Total coins earned this run (positive income only, not spending). */
    coinsEarned: number;
    /** The latest coin events, oldest first. */
    coinEvents: CoinEvent[];
    nextCoinEventId: number;
    /** Score earned per player slot. Has an entry for every slot the level defines. */
    scoreBySlot: Record<number, number>;
    /** Perfect servings per player slot, for the co-op contribution ranking. */
    perfectBySlot: Record<number, number>;
    /**
     * Which player slot each client id owns. Lives in synced state because client ids are random
     * per page load. Empty in singleplayer, where every command resolves to slot 0.
     */
    slotByClientId: Record<string, number>;
    /** Display name per slot. */
    slotNames: Record<number, string>;
    /** Whether each slot's player is currently in the room. Disconnected slots can be reclaimed. */
    connected: Record<number, boolean>;
    potatoesSpawned: number;
    /** Potatoes that reached the restaurant. */
    potatoesServed: number;
    servingCounts: Record<ServingResult, number>;
    lastServing: LastServing | undefined;
    /** Simulation time since the run started. */
    elapsedMs: number;
    /**
     * Clump potatoes queued but not yet released. The run can't be won while any are pending, since
     * they are not in `potatoesSpawned` yet.
     */
    potatoesPending: number;
    /** 0-based index into waveConfig.waves of the current or upcoming wave. */
    waveIndex: number;
    /**
     * 'break' = waiting before waveIndex starts; 'spawning' = wave is spawning; 'done' = every wave
     * has spawned (never in endless).
     */
    wavePhase: 'break' | 'spawning' | 'done';
    /** Time left in the current break. */
    breakRemainingMs: number;
    spawnedInWave: number;
    /** Speed of the one conveyor belt every potato rides. Set from the wave when it starts spawning. */
    beltSpeedPxPerMs: number;
    /** Open orders, oldest first. */
    orders: Order[];
    nextOrderId: number;
    /** Countdown to the next order while a wave is spawning. */
    msUntilNextOrder: number;
    lastOrderEvent: LastOrderEvent | undefined;
    /** Next `potatoId` the spawner hands out, so commands can name a potato. */
    nextPotatoId: number;
    /** Next `towerId` handed out by `PlaceTower`, so commands can name a tower (upgrades). */
    nextTowerId: number;
    /** Potatoes seagulls escaped with. They count as dealt with for ending the run. */
    potatoesStolen: number;
    seagullsSpawnedInWave: number;
    /** Countdown to the next seagull while a wave is spawning. */
    msUntilNextSeagull: number;
    lastSteal: LastSteal | undefined;
    /** Prestige points, 0 to 100. Stars = points / 20. Unlocks towers and upgrades. */
    prestigePoints: number;
    prestigeNotice: PrestigeNotice | undefined;
    /**
     * For each wave that finished spawning, how many potatoes had spawned or were queued by then.
     * The wave is cleared once that many are served or stolen.
     */
    waveSpawnTotals: number[];
    /** Waves whose end bonus was paid. */
    wavesPaid: number;
    /** `runState.elapsedMs` when a boss last spawned, or -1. Drives the HUD banner. */
    lastBossSpawnAtMs: number;
};

/** One zero score for every slot that owns a path in the level (at least slot 0). */
function createInitialScoreBySlot(levelId: string): Record<number, number> {
    const scoreBySlot: Record<number, number> = {
        0: 0,
    };

    for (const path of getLevel(levelId).paths) {
        scoreBySlot[path.ownerSlot] = 0;
    }

    return scoreBySlot;
}

/** The slot a client owns. Unknown clients (and singleplayer) are slot 0. */
export function getSlotForClient(
    runState: Readonly<Pick<RunState, 'slotByClientId'>> | undefined,
    clientId: string | undefined,
): number {
    if (!runState || clientId == undefined) {
        return 0;
    }

    return runState.slotByClientId[clientId] ?? 0;
}

/**
 * Whether the run is co-op: more than one client holds a slot. `StartRun` always registers the
 * host, so a lone player (singleplayer or a host nobody has joined yet) is not co-op.
 */
export function isCoopRun(
    runState: Readonly<Pick<RunState, 'slotByClientId'>> | undefined,
): boolean {
    return !!runState && Object.keys(runState.slotByClientId).length > 1;
}

const firstWave = assertWrap.isDefined(waveConfig.waves[0]);

export function createInitialRunState(
    levelId = defaultLevel.levelId,
    mode: RunMode = 'campaign',
): RunState {
    return {
        levelId,
        mode,
        status: RunStatus.Playing,
        paused: false,
        pausedBySlot: undefined,
        speed: 1,
        resetSpeedOnIncome: false,
        speedAccumulator: 0,
        satisfaction: satisfactionConfig.starting,
        coins:
            economyConfig.startingCoins +
            (getLevel(levelId).minPlayers - 1) * coopConfig.extraStartingCoinsPerPlayer,
        coinsEarned: 0,
        coinEvents: [],
        nextCoinEventId: 1,
        scoreBySlot: createInitialScoreBySlot(levelId),
        perfectBySlot: {},
        slotByClientId: {},
        slotNames: {},
        connected: {},
        potatoesSpawned: 0,
        potatoesServed: 0,
        servingCounts: {
            [ServingResult.Perfect]: 0,
            [ServingResult.Incomplete]: 0,
            [ServingResult.Raw]: 0,
        },
        lastServing: undefined,
        elapsedMs: 0,
        potatoesPending: 0,
        waveIndex: 0,
        wavePhase: 'break',
        breakRemainingMs: waveConfig.breakMs,
        spawnedInWave: 0,
        beltSpeedPxPerMs: firstWave.speedPxPerMs,
        orders: [],
        nextOrderId: 1,
        msUntilNextOrder: orderConfig.firstOrderDelayMs,
        lastOrderEvent: undefined,
        nextPotatoId: 1,
        nextTowerId: 1,
        potatoesStolen: 0,
        seagullsSpawnedInWave: 0,
        msUntilNextSeagull: 0,
        lastSteal: undefined,
        prestigePoints: 0,
        prestigeNotice: undefined,
        waveSpawnTotals: [],
        wavesPaid: 0,
        lastBossSpawnAtMs: -1,
    };
}
