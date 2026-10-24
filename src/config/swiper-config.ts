/** Tuning for the Swiper tower (a slow rotating paddle). Arm length is its `rangePx`. */
export const swiperConfig = {
    /** One full turn of the arm. */
    rotationMs: 5000,
    /** How far back along the belt a swiped potato goes. */
    pushBackPx: 120,
    /** Half the paddle's width for hit tests. */
    armHalfWidthPx: 8,
} as const;
