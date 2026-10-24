/** Tuning for how walking seagulls path around obstacles and hop across belts. */
export const gullPathConfig = {
    /** Size of one cell in the gull walking grid. */
    cellPx: 40,
    /** A* cost of stepping onto a belt cell (grass is 1), so gulls only hop across when it pays. */
    beltCellCost: 8,
    /** Walking speed while on a belt: a slow hop, much slower than `walkSpeedPxPerMs`. */
    hopSpeedPxPerMs: 0.03,
    /** How often a walking gull recomputes its route, besides target changes and leaving a belt. */
    repathMs: 500,
    /** Walking gulls this close to a route waypoint move on to the next one. */
    waypointReachedPx: 2,
    /** Extra clearance around towers and the restaurant. */
    gullRadiusPx: 16,
    /** Blocked radius around a chute's landing point. */
    chuteBlockRadiusPx: 36,
    /** Render-only hop animation while on a belt. */
    hopCycleMs: 600,
    hopHeightPx: 12,
    hopSquash: 0.15,
} as const;
