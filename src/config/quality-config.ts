/** Potato quality and restaurant prestige. See the Microwave tower. */
export const qualityConfig = {
    /** Quality lost per second by a potato inside the Microwave cone. */
    microwaveQualityPerSecond: 40,
    /** Mash damage per second to a potato inside the Microwave cone (no multipliers). */
    microwaveDamagePerSecond: 45,
    /** Half-angle of the Microwave cone, in degrees. */
    microwaveConeHalfAngleDeg: 25,
    /** The cone wedge shows for this long after the last firing update. */
    microwaveFlashMs: 200,
    /** Orders refuse potatoes below this quality. */
    minOrderQuality: 50,
    /** Stars needed (with a win) for the Mash Champ title. */
    mashChampStars: 3,
    /** Most prestige stars. */
    maxStars: 5,
    /** Grey overlay opacity on a potato at quality 0 (scaled down as quality rises). */
    rubberyMaxAlpha: 0.6,
    /** The grey overlay and its redraw key move in steps of this much quality. */
    rubberyStep: 10,
} as const;
