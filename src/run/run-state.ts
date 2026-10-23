import {
    economyConfig,
    getPotatoesPerRun,
    satisfactionConfig,
    waveConfig,
} from '../config/game-config.js';

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
};

/**
 * Everything about the current run that is not an entity. It is plain JSON so it can be synced to
 * peers later. Only change it inside command handlers or entity `update` calls (both run in
 * lockstep frames), never from UI code.
 */
export type RunState = {
    status: RunStatus;
    satisfaction: number;
    /** Coins shared by the whole restaurant; spent on towers, earned by servings. */
    coins: number;
    /** Score earned per player slot. Singleplayer only uses slot 0. */
    scoreBySlot: Record<number, number>;
    potatoesSpawned: number;
    /** Potatoes that reached the restaurant. */
    potatoesServed: number;
    servingCounts: Record<ServingResult, number>;
    lastServing: LastServing | undefined;
    /** Simulation time since the run started. */
    elapsedMs: number;
    /** Total potatoes this run will spawn; reaching it in `potatoesServed` wins. Set by `StartRun`. */
    potatoesPerRun: number;
    /** 0-based index into waveConfig.waves of the current or upcoming wave. */
    waveIndex: number;
    /**
     * 'break' = waiting before waveIndex starts; 'spawning' = wave is spawning; 'done' = every wave
     * has spawned.
     */
    wavePhase: 'break' | 'spawning' | 'done';
    /** Time left in the current break. */
    breakRemainingMs: number;
    spawnedInWave: number;
};

export function createInitialRunState(): RunState {
    return {
        status: RunStatus.Playing,
        satisfaction: satisfactionConfig.starting,
        coins: economyConfig.startingCoins,
        scoreBySlot: {
            0: 0,
        },
        potatoesSpawned: 0,
        potatoesServed: 0,
        servingCounts: {
            [ServingResult.Perfect]: 0,
            [ServingResult.Incomplete]: 0,
            [ServingResult.Raw]: 0,
        },
        lastServing: undefined,
        elapsedMs: 0,
        // Assumes one path until `StartRun` sets the real value from the level.
        potatoesPerRun: getPotatoesPerRun(1),
        waveIndex: 0,
        wavePhase: 'break',
        breakRemainingMs: waveConfig.breakMs,
        spawnedInWave: 0,
    };
}
