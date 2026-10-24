/** Tuning for the Knife tower (a fast straight-line slice). Slice length is its `rangePx`. */
export const knifeConfig = {
    /** Half the slice's thickness for hit tests. */
    lineHalfWidthPx: 14,
    /** The faint line a built Knife always shows along its cut. */
    lineColor: '#e0e0e0',
    lineAlpha: 0.25,
    lineWidthPx: 4,
    /** Each wheel notch or `[` / `]` press turns the blade this many degrees. */
    rotateStepDeg: 15,
} as const;
