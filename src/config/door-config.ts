export const doorConfig = {
    /** Plates that fit on the Pass (the counter at the end of the belt). */
    passSlots: 4,
    /** Minimum gap between potatoes queued on the belt. */
    queueSpacingPx: 50,
    /** The waiter takes the front plate this often. */
    waiterIntervalMs: 2000,
    /** A potato in the pass zone waits this long before the heat lamp starts hurting it. */
    heatLampGraceMs: 4000,
    /** Quality lost per second once the grace period is over. */
    heatLampQualityPerSecond: 2,
    /** Each consecutive send-back makes the next penalty this much worse (satisfaction). */
    angerStep: 3,
    /** After this many send-backs a potato is eaten anyway, grudgingly. */
    maxSendBacks: 2,
} as const;
