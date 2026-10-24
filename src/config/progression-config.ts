/**
 * Prestige progression: prestige points climb from 0 by serving quality mash, and the star rating
 * (points / pointsPerStar) unlocks towers and upgrades. Every number here is meant to be tuned.
 */
export const progressionConfig = {
    /** Prestige points per star. */
    pointsPerStar: 20,
    /** Most prestige points (5 stars). */
    maxPoints: 100,
    /** Most stars. */
    maxStars: 5,
    /** A perfect serving gives `perfectMax * quality / 100` points. */
    perfectMax: 3,
    /** A perfect serving under this quality counts as rubbery and costs `rubberyPenalty` instead. */
    rubberyQuality: 60,
    rubberyPenalty: -2,
    incompletePenalty: -2,
    rawPenalty: -4,
    orderFilled: 2,
    orderExpired: -2,
    potatoStolen: -1,
    /** Stars needed to build each tower type. At 5 stars everything is unlocked. */
    towerUnlockStars: {
        knife: 0,
        boiler: 0.5,
        masher: 1,
        swiper: 2,
        'cricket-trap': 2,
        microwave: 3,
        laser: 4,
    },
    /**
     * When stars drop below a built tower's threshold: true = it stops working (greyed with a
     * padlock) until unlocked again; false = it keeps working but cannot be upgraded.
     */
    lockedBuiltTowersGoDormant: true,
    /** Stars needed to upgrade a tower to level 2 and level 3. */
    upgradeLevelStars: {
        2: 2.5,
        3: 4,
    },
    /**
     * Coins paid when a wave's last potato is resolved, by wave (the last entry repeats). Wave 1
     * must cover a Boiling Pot so the first unlock can be built right away.
     */
    waveEndBonusCoins: [
        80,
        60,
        60,
        80,
        100,
    ],
    /** The wave-1 hint shows this long after the run starts. */
    tutorialHintMs: 20_000,
    tutorialHint:
        'Only the Knife is unlocked. Serve great mash to earn stars and unlock more towers!',
    /** How long the unlocked and locked banners show, and the toolbar glow lasts. */
    noticeMs: 4000,
} as const;
