/** Render-only potato animation. */
export const potatoMotionConfig = {
    /** Length of one bob (squash and stretch) cycle. */
    bobPeriodMs: 1000,
    /** How long a hit squashes the potato. */
    hitSquashMs: 260,
    /** How much a hit squashes it (0.2 is 20%). */
    hitSquash: 0.2,
} as const;
