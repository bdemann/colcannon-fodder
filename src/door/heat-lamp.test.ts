import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {doorConfig} from '../config/door-config.js';
import {heatLampLoss} from './heat-lamp.js';

describe(heatLampLoss.name, () => {
    it('loses nothing during the grace period', () => {
        assert.strictEquals(
            heatLampLoss({
                passWaitMs: doorConfig.heatLampGraceMs,
                ms: 100,
            }),
            0,
        );
        assert.strictEquals(
            heatLampLoss({
                passWaitMs: 0,
                ms: 100,
            }),
            0,
        );
    });
    it('loses the full rate after the grace period', () => {
        assert.strictEquals(
            heatLampLoss({
                passWaitMs: doorConfig.heatLampGraceMs + 5000,
                ms: 1000,
            }),
            doorConfig.heatLampQualityPerSecond,
        );
    });
    it('only counts the part of a tick past the grace period', () => {
        assert.strictEquals(
            heatLampLoss({
                passWaitMs: doorConfig.heatLampGraceMs + 500,
                ms: 1000,
            }),
            (doorConfig.heatLampQualityPerSecond * 500) / 1000,
        );
    });
});
