/** Tuning for the Swiper tower (a slow rotating paddle). Arm length is its `rangePx`. */
export const swiperConfig = {
    /** One full turn of the arm. */
    rotationMs: 5000,
    /**
     * How far back along the belt a swiped potato goes. Must stay below what a potato travels
     * during one turn (`pushBackPx * 2 < slowestBeltSpeed * rotationMs`, enforced by a test), so a
     * potato always makes net progress past the arm and can never be stuck forever.
     */
    pushBackPx: 120,
    /** Only stops one pass of the arm from hitting the same potato on consecutive frames. */
    debounceMs: 600,
    /** Half the paddle's width for hit tests. */
    armHalfWidthPx: 8,
} as const;
