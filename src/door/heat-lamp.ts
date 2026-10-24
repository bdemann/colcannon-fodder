import {doorConfig} from '../config/door-config.js';

/**
 * Quality lost over `ms` by a potato that has waited `passWaitMs` in the pass zone (including this
 * tick). Nothing is lost until the grace period is over.
 */
export function heatLampLoss({passWaitMs, ms}: {passWaitMs: number; ms: number}): number {
    const hurtMs = Math.min(ms, Math.max(0, passWaitMs - doorConfig.heatLampGraceMs));
    return (doorConfig.heatLampQualityPerSecond * hurtMs) / 1000;
}
