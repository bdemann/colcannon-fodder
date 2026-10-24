import {beltLaneConfig} from '../config/game-config.js';

/** The furthest a potato's center may sit from the belt's center line and stay on the belt. */
export function getMaxLaneOffset(params: {beltWidthPx: number; potatoRadius: number}): number {
    return Math.max(0, params.beltWidthPx / 2 - params.potatoRadius - beltLaneConfig.edgeMarginPx);
}

/**
 * Maps a roll in [0, 1) to a lane offset in `[-maxOffset, +maxOffset]`. Pass a clump's evenly
 * spaced fraction (`(index + 0.5) / count`) as the roll to spread it across the belt.
 */
export function getLaneOffset(params: {roll: number; maxOffset: number}): number {
    return (params.roll * 2 - 1) * params.maxOffset;
}
