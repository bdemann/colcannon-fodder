import {slotColors} from '../config/game-config.js';
import {type RunState} from './run-state.js';

/** One player's contribution to the run. */
export type SlotContribution = {
    slot: number;
    name: string;
    color: string;
    points: number;
    perfectServings: number;
    /** True for every contributor tied for the most points (the Mash Champ crown). */
    crowned: boolean;
};

/** The color for a slot; slots past the palette wrap around. */
export function getSlotColor(slot: number): string {
    return slotColors[slot % slotColors.length] ?? '#ffffff';
}

/** How many players are in the run. A run with only slot 0 (singleplayer) counts as 1. */
export function getPlayerCount(runState: Readonly<Pick<RunState, 'slotNames'>>): number {
    return Math.max(1, Object.keys(runState.slotNames).length);
}

/**
 * Ranks every slot by points, highest first (slot order breaks display ties). All slots tied for
 * the top score are crowned, unless nobody scored.
 */
export function rankSlots(
    runState: Readonly<Pick<RunState, 'scoreBySlot' | 'perfectBySlot' | 'slotNames'>>,
): SlotContribution[] {
    const joined = Object.keys(runState.slotNames).length > 0;
    const ranked = Object.entries(runState.scoreBySlot)
        .filter(([slotKey]) => !joined || Number(slotKey) in runState.slotNames)
        .map(
            ([
                slotKey,
                points,
            ]) => {
                const slot = Number(slotKey);

                return {
                    slot,
                    name: runState.slotNames[slot] ?? `Player ${slot + 1}`,
                    color: getSlotColor(slot),
                    points,
                    perfectServings: runState.perfectBySlot[slot] ?? 0,
                };
            },
        )
        .sort((a, b) => b.points - a.points || a.slot - b.slot);
    const top = ranked[0]?.points ?? 0;

    return ranked.map((entry) => {
        return {
            ...entry,
            crowned: top > 0 && entry.points === top,
        };
    });
}
