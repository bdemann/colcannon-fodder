/** Render-only potato animation. */
export const potatoMotionConfig = {
    /** Length of one bob (squash and stretch) cycle. */
    bobPeriodMs: 1000,
    /** How long a hit squashes the potato. */
    hitSquashMs: 260,
    /** How much a hit squashes it (0.2 is 20%). */
    hitSquash: 0.2,
    /** How long a served potato's ghost hops into the restaurant. */
    serveHopMs: 380,
    /** Peak height of that hop, in potato radii. */
    serveHopHeight: 1.2,
    /** Time between blinks, and how long each lasts. */
    blinkPeriodMs: 3400,
    blinkMs: 130,
    /** Time for one steam puff to rise and fade, and how far it rises in radii. */
    steamPeriodMs: 1800,
    steamRise: 0.5,
} as const;
