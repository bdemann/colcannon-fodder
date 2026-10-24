import {defaultLevel, getLevel} from './levels.js';

export const levelStorageKey = 'colcannon-fodder-level';

/** The last level the player picked. Any storage failure or unknown id gives the default level. */
export function loadLevelChoice(): string {
    try {
        return getLevel(globalThis.localStorage.getItem(levelStorageKey) ?? undefined).levelId;
    } catch {
        return defaultLevel.levelId;
    }
}

/** Remembers the picked level for the next visit. Storage failures are ignored. */
export function saveLevelChoice(levelId: string) {
    try {
        globalThis.localStorage.setItem(levelStorageKey, levelId);
    } catch {
        // Storage can be blocked; the choice just isn't remembered.
    }
}
