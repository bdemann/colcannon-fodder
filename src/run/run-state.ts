import {satisfactionConfig} from '../config/game-config.js';

export enum RunStatus {
    Playing = 'playing',
    Won = 'won',
    Lost = 'lost',
}

/** What the customers thought of one potato. See `docs/spec.md` section 4. */
export enum ServingResult {
    /** Cut, cooked, and mashed. */
    Perfect = 'perfect',
    /** Some processing, but not all three. */
    Incomplete = 'incomplete',
    /** No processing at all. */
    Raw = 'raw',
}

/** The processing flags every potato carries. All start `false`. */
export type PotatoProcessing = {
    cut: boolean;
    cooked: boolean;
    mashed: boolean;
};

/** The most recent serving, kept so the HUD can show a short result popup. */
export type LastServing = {
    result: ServingResult;
    /** `runState.elapsedMs` when it was served. */
    servedAtMs: number;
};

/**
 * Everything about the current run that is not an entity. It is plain JSON so it can be synced to
 * peers later. Only change it inside command handlers or entity `update` calls (both run in
 * lockstep frames), never from UI code.
 */
export type RunState = {
    status: RunStatus;
    satisfaction: number;
    /** Score earned per player slot. Singleplayer only uses slot 0. */
    scoreBySlot: Record<number, number>;
    potatoesSpawned: number;
    /** Potatoes that reached the restaurant. */
    potatoesServed: number;
    servingCounts: Record<ServingResult, number>;
    lastServing: LastServing | undefined;
    /** Simulation time since the run started. */
    elapsedMs: number;
};

export function createInitialRunState(): RunState {
    return {
        status: RunStatus.Playing,
        satisfaction: satisfactionConfig.starting,
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
    };
}
