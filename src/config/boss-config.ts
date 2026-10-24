import {potatoSizeConfig} from './game-config.js';

/** The Russet King, the final wave's boss (issue #80). */
export const bossConfig = {
    /** Raw or incomplete boss servings cost this many times the normal satisfaction. */
    penaltyMultiplier: 3,
    /** Mash HP of the first boss. */
    baseHp: potatoSizeConfig.king.mashHp,
    /** Extra HP per boss index, as a fraction of `baseHp` (for endless play later). */
    hpGrowthPerBoss: 0.25,
    /** How long the "approaches" banner shows. */
    bannerMs: 3000,
    /** The boss's mash meter, bigger than a normal potato's. */
    meter: {
        width: 90,
        height: 10,
    },
} as const;

/** Mash HP of the boss with this 0-based index. The campaign only uses index 0. */
export function getBossHp(bossIndex: number): number {
    return bossConfig.baseHp * (1 + bossConfig.hpGrowthPerBoss * bossIndex);
}
