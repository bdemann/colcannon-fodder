/**
 * Tuning for the line towers. The Knife cuts straight across the belt (`perpendicularRangePx`
 * long); the Laser is the aimable long line (its length is its `rangePx`).
 */
export const knifeConfig = {
    /** How far the Knife's automatic perpendicular cut reaches from the tower. */
    perpendicularRangePx: 160,
    /** Half the slice's thickness for hit tests. */
    lineHalfWidthPx: 14,
    /** The faint line a built Knife always shows along its cut. */
    lineColor: '#e0e0e0',
    lineAlpha: 0.45,
    lineWidthPx: 4,
    /** The Laser's beam color. */
    laserColor: '#ff4d4d',
    /** Each wheel notch or `[` / `]` press turns the Laser this many degrees. */
    rotateStepDeg: 15,
} as const;
