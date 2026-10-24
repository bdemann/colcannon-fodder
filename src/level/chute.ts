import {type ChuteDefinition} from './level.js';

/**
 * Which chute a spawn drops from, or `undefined` to enter at the start of the belt. `roll` is a 0
 * to 1 random number: below `chuteShare` it picks a chute (spread evenly if there are several).
 */
export function pickChute({
    chutes,
    chuteShare,
    roll,
}: Readonly<{
    chutes: ReadonlyArray<Readonly<ChuteDefinition>> | undefined;
    chuteShare: number;
    roll: number;
}>): Readonly<ChuteDefinition> | undefined {
    if (!chutes?.length || roll >= chuteShare) {
        return undefined;
    }

    return chutes[Math.min(chutes.length - 1, Math.floor((roll / chuteShare) * chutes.length))];
}

/** Counts a falling potato's timer down, never below 0 (landed). */
export function tickDropMs({
    dropInMs,
    msSinceLastExecute,
}: Readonly<{dropInMs: number; msSinceLastExecute: number}>): number {
    return Math.max(0, dropInMs - msSinceLastExecute);
}

/** The scale of a falling potato: `startScale` when it leaves the chute, 1 when it lands. */
export function getDropScale({
    dropInMs,
    dropMs,
    startScale,
}: Readonly<{dropInMs: number; dropMs: number; startScale: number}>): number {
    return 1 + (startScale - 1) * Math.min(1, Math.max(0, dropInMs / dropMs));
}
