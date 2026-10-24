import {getBossHp} from '../config/boss-config.js';
import {endlessConfig} from '../config/endless-config.js';
import {orderConfig, waveConfig} from '../config/game-config.js';
import {Dish} from '../order/dish.js';
import {type RunState} from './run-state.js';

/** Settings for the orders of one wave. */
export type OrderSettings = {
    maxOpen: number;
    intervalMs: number;
    lifetimeMs: number;
    dishes: ReadonlyArray<string>;
};

/** Everything the spawner, waves, orders, seagulls, chutes, clumps and boss read about a wave. */
export type WaveSettings = {
    potatoCount: number;
    /** Multiplies the mash HP of this wave's potatoes. */
    hpMultiplier: number;
    chuteShare: number;
    seagullCount: number;
    clumpChance: number;
    clumpMaxExtra: number;
    extraSpawnsPerSecond: number;
    bossCount: number;
    /** Mash HP of this wave's boss. */
    bossHp: number;
    spawnIntervalMs: number;
    speedPxPerMs: number;
    sizeWeights: {small: number; medium: number; large: number};
    orders: OrderSettings;
};

/** The settings of endless wave `n` (1-based). Pure. */
export function generateEndlessWave(n: number): WaveSettings {
    const c = endlessConfig;
    const large = Math.min(c.largeWeightMax, c.largeWeightPerWave * n);
    const small = Math.max(0, c.smallWeightStart - c.smallWeightPerWave * n);

    return {
        potatoCount: c.potatoBase + c.potatoPerWave * n,
        hpMultiplier: 1,
        spawnIntervalMs: Math.max(
            c.spawnIntervalMinMs,
            c.spawnIntervalBaseMs - c.spawnIntervalPerWaveMs * n,
        ),
        speedPxPerMs: Math.min(c.speedMax, c.speedBase + c.speedPerWave * n),
        sizeWeights: {
            small,
            medium: Math.max(0, 1 - large - small),
            large,
        },
        seagullCount: Math.floor(n / c.wavesPerSeagull),
        chuteShare: Math.min(c.chuteShareMax, c.chuteSharePerWave * n),
        clumpChance: Math.min(c.clumpChanceMax, c.clumpChancePerWave * n),
        clumpMaxExtra: Math.min(c.clumpMaxExtraMax, Math.floor(n / c.wavesPerClumpExtra)),
        extraSpawnsPerSecond: Math.min(c.extraSpawnsMax, c.extraSpawnsPerWave * n),
        bossCount: n % c.bossEveryWaves === 0 ? 1 : 0,
        bossHp: getBossHp(Math.max(0, n / c.bossEveryWaves - 1)),
        orders: {
            maxOpen: Math.min(
                c.orders.maxOpenMax,
                c.orders.maxOpenBase + Math.floor(n / c.orders.wavesPerOpenOrder),
            ),
            intervalMs: Math.max(
                c.orders.intervalMinMs,
                c.orders.intervalBaseMs - c.orders.intervalPerWaveMs * n,
            ),
            lifetimeMs: Math.max(
                c.orders.lifetimeMinMs,
                c.orders.lifetimeBaseMs - c.orders.lifetimePerWaveMs * n,
            ),
            dishes:
                n >= c.orders.allDishesFromWave
                    ? Object.values(Dish)
                    : (orderConfig.byWave[n - 1]?.dishes ?? Object.values(Dish)),
        },
    };
}

/**
 * The one source for wave settings. Campaign reads `waveConfig.waves[waveIndex]` (undefined past
 * the end); endless generates the wave, so it never runs out.
 */
export function getWaveSettings(
    runState: Readonly<Pick<RunState, 'mode'>>,
    waveIndex: number,
): WaveSettings | undefined {
    if (runState.mode === 'endless') {
        return generateEndlessWave(waveIndex + 1);
    }

    const wave = waveConfig.waves[waveIndex];
    if (!wave) {
        return undefined;
    }
    const orders =
        orderConfig.byWave[waveIndex] ?? orderConfig.byWave[orderConfig.byWave.length - 1];

    return {
        ...wave,
        bossHp: getBossHp(0),
        orders: orders ?? generateEndlessWave(waveIndex + 1).orders,
    };
}

/** Waves the restaurant got through: the current wave counts once it has started spawning. */
export function getWavesReached(runState: Readonly<RunState>): number {
    return runState.wavePhase === 'spawning' ? runState.waveIndex + 1 : runState.waveIndex;
}
