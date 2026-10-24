export const doorConfig = {
    /** Plates that fit on the Pass (the counter at the end of the belt). */
    passSlots: 4,
    /** Minimum gap between potatoes queued on the belt. */
    queueSpacingPx: 50,
    /** The waiter takes the front plate this often. */
    waiterIntervalMs: 2500,
    /** Quality lost per second while waiting on the Pass under the heat lamp. */
    heatLampQualityPerSecond: 6,
    /** Each consecutive send-back makes the next penalty this much worse (satisfaction). */
    angerStep: 3,
    /** After this many send-backs a potato is eaten anyway, grudgingly. */
    maxSendBacks: 2,
} as const;
