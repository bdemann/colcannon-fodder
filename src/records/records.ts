import {endlessBestStorageKey} from '../config/endless-config.js';
import {qualityConfig} from '../config/quality-config.js';
import {recordsConfig} from '../config/records-config.js';
import {levels} from '../level/levels.js';
import {RunStatus, type RunMode, type RunState} from '../run/run-state.js';

/** The bests for one level in one mode. */
export type ModeRecord = {
    bestScore: number;
    bestStars: number;
    /** Runs that were won. */
    wins: number;
    /** Wins that reached Mash Champ prestige. */
    champs: number;
    /** Most waves survived (used by endless). */
    bestWaves: number;
};

/** One finished run on the Hall of Mash Champs. */
export type HallEntry = {
    levelId: string;
    mode: RunMode;
    score: number;
    stars: number;
    /** `Date.now()` when the run ended. */
    dateMs: number;
};

export type Records = {
    levels: Record<string, Record<RunMode, ModeRecord>>;
    /**
     * Co-op bests, kept apart from `levels` so a team run never replaces a solo best. Keyed by
     * `getCoopKey` (level, mode and player count). Co-op runs are not added to the hall.
     */
    coop: Record<string, ModeRecord>;
    hall: HallEntry[];
};

/** The results of one finished run. */
export type RunResult = {
    levelId: string;
    mode: RunMode;
    won: boolean;
    score: number;
    stars: number;
    wavesReached: number;
    dateMs: number;
    /** Players in the run. Above 1 the result goes in the co-op bucket. Defaults to 1. */
    playerCount?: number;
};

/** The key of a co-op record: one entry per level, mode and player count. */
export function getCoopKey(levelId: string, mode: RunMode, playerCount: number): string {
    return `${levelId}|${mode}|${playerCount}`;
}

export function createEmptyModeRecord(): ModeRecord {
    return {
        bestScore: 0,
        bestStars: 0,
        wins: 0,
        champs: 0,
        bestWaves: 0,
    };
}

export function createEmptyRecords(): Records {
    return {
        levels: {},
        coop: {},
        hall: [],
    };
}

/** The record for a level and mode; all zeros when never played. */
export function getModeRecord(
    records: Readonly<Records>,
    levelId: string,
    mode: RunMode,
): ModeRecord {
    return records.levels[levelId]?.[mode] ?? createEmptyModeRecord();
}

/** The record a run competes against: its co-op bucket for 2+ players, otherwise the solo best. */
export function getRunRecord(
    records: Readonly<Records>,
    run: Readonly<Pick<RunResult, 'levelId' | 'mode' | 'playerCount'>>,
): ModeRecord {
    const playerCount = run.playerCount ?? 1;
    if (playerCount > 1) {
        return (
            records.coop[getCoopKey(run.levelId, run.mode, playerCount)] ?? createEmptyModeRecord()
        );
    }

    return getModeRecord(records, run.levelId, run.mode);
}

function toCount(value: unknown): number {
    return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : 0;
}

function toObject(value: unknown): Record<string, unknown> {
    return typeof value === 'object' && value ? (value as Record<string, unknown>) : {};
}

function parseModeRecord(raw: unknown): ModeRecord {
    const data = toObject(raw);

    return {
        bestScore: toCount(data['bestScore']),
        bestStars: toCount(data['bestStars']),
        wins: toCount(data['wins']),
        champs: toCount(data['champs']),
        bestWaves: toCount(data['bestWaves']),
    };
}

function parseHallEntry(raw: unknown): HallEntry | undefined {
    const data = toObject(raw);
    const mode = data['mode'];
    if (typeof data['levelId'] !== 'string' || (mode !== 'campaign' && mode !== 'endless')) {
        return undefined;
    }

    return {
        levelId: data['levelId'],
        mode,
        score: toCount(data['score']),
        stars: toCount(data['stars']),
        dateMs: toCount(data['dateMs']),
    };
}

/** Parses stored records. Anything missing or malformed becomes a safe default. */
export function parseRecords(raw: string | null | undefined): Records {
    const records = createEmptyRecords();
    if (!raw) {
        return records;
    }
    try {
        const data = toObject(JSON.parse(raw));
        for (const [
            levelId,
            rawModes,
        ] of Object.entries(toObject(data['levels']))) {
            const modeData = toObject(rawModes);
            records.levels[levelId] = {
                campaign: parseModeRecord(modeData['campaign']),
                endless: parseModeRecord(modeData['endless']),
            };
        }
        for (const [
            key,
            rawRecord,
        ] of Object.entries(toObject(data['coop']))) {
            records.coop[key] = parseModeRecord(rawRecord);
        }
        if (Array.isArray(data['hall'])) {
            records.hall = (data['hall'] as unknown[])
                .map(parseHallEntry)
                .filter((entry): entry is HallEntry => !!entry)
                .slice(0, recordsConfig.hallSize);
        }
    } catch {
        return createEmptyRecords();
    }

    return records;
}

/** True when the run beats the stored best score, stars or (endless) waves for its level and mode. */
export function isNewBest(records: Readonly<Records>, run: Readonly<RunResult>): boolean {
    const best = getRunRecord(records, run);

    return (
        run.score > best.bestScore ||
        run.stars > best.bestStars ||
        (run.mode === 'endless' && run.wavesReached > best.bestWaves)
    );
}

function isChamp(run: Readonly<RunResult>): boolean {
    return run.won && run.stars >= qualityConfig.mashChampStars;
}

/** Returns new records with the run folded in. Pure. */
export function mergeRunIntoRecords(records: Readonly<Records>, run: Readonly<RunResult>): Records {
    const playerCount = run.playerCount ?? 1;
    const best = getRunRecord(records, run);
    const updated: ModeRecord = {
        bestScore: Math.max(best.bestScore, run.score),
        bestStars: Math.max(best.bestStars, run.stars),
        wins: best.wins + (run.won ? 1 : 0),
        champs: best.champs + (isChamp(run) ? 1 : 0),
        bestWaves: Math.max(best.bestWaves, run.wavesReached),
    };
    if (playerCount > 1) {
        return {
            ...records,
            coop: {
                ...records.coop,
                [getCoopKey(run.levelId, run.mode, playerCount)]: updated,
            },
        };
    }
    const previousModes = records.levels[run.levelId];
    const hall = [...records.hall];
    if (run.score > 0) {
        hall.push({
            levelId: run.levelId,
            mode: run.mode,
            score: run.score,
            stars: run.stars,
            dateMs: run.dateMs,
        });
    }
    hall.sort((a, b) => b.score - a.score || b.stars - a.stars || a.dateMs - b.dateMs);

    return {
        levels: {
            ...records.levels,
            [run.levelId]: {
                campaign: previousModes?.campaign ?? createEmptyModeRecord(),
                endless: previousModes?.endless ?? createEmptyModeRecord(),
                [run.mode]: updated,
            },
        },
        coop: records.coop,
        hall: hall.slice(0, recordsConfig.hallSize),
    };
}

/** Folds in the endless bests the old per-level keys saved before this module existed. */
function mergeLegacyEndlessBests(records: Records) {
    for (const level of levels) {
        try {
            const stored = Number(
                globalThis.localStorage.getItem(`${endlessBestStorageKey}${level.levelId}`) ?? 0,
            );
            if (Number.isFinite(stored) && stored > 0) {
                const modeRecords = records.levels[level.levelId] ?? {
                    campaign: createEmptyModeRecord(),
                    endless: createEmptyModeRecord(),
                };
                modeRecords.endless.bestWaves = Math.max(modeRecords.endless.bestWaves, stored);
                records.levels[level.levelId] = modeRecords;
            }
        } catch {
            return;
        }
    }
}

/** Loaded once, then replaced by `saveFinishedRun`, so the HUD can read it every tick. */
let cachedRecords: Records | undefined;

/** The records for this browser. Storage failures give empty records. */
export function getRecords(): Records {
    if (!cachedRecords) {
        try {
            cachedRecords = parseRecords(globalThis.localStorage.getItem(recordsConfig.storageKey));
        } catch {
            cachedRecords = createEmptyRecords();
        }
        mergeLegacyEndlessBests(cachedRecords);
    }

    return cachedRecords;
}

/** Runs already saved, and whether each one beat a record. Keyed by the run object itself. */
const savedRuns = new WeakMap<object, boolean>();

/**
 * UI side: saves a finished (Won or Lost) run once and returns whether it set a new best. Later
 * calls for the same run return the same answer without saving again. `undefined` while playing.
 */
export function saveFinishedRun(
    runState: Readonly<RunState>,
    result: Readonly<{
        score: number;
        stars: number;
        wavesReached: number;
        playerCount?: number;
    }>,
): boolean | undefined {
    if (runState.status !== RunStatus.Won && runState.status !== RunStatus.Lost) {
        return undefined;
    }
    const known = savedRuns.get(runState);
    if (known != undefined) {
        return known;
    }

    const run: RunResult = {
        levelId: runState.levelId,
        mode: runState.mode,
        won: runState.status === RunStatus.Won,
        dateMs: Date.now(),
        ...result,
    };
    const records = getRecords();
    const newBest = isNewBest(records, run);
    cachedRecords = mergeRunIntoRecords(records, run);
    savedRuns.set(runState, newBest);
    try {
        globalThis.localStorage.setItem(recordsConfig.storageKey, JSON.stringify(cachedRecords));
    } catch {
        // Storage can be blocked; the records just last for this visit.
    }

    return newBest;
}
