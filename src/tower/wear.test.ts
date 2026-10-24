import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {economyConfig} from '../config/game-config.js';
import {wearConfig} from '../config/wear-config.js';
import {getTowerStats, TowerType} from './tower-type.js';
import {
    addWear,
    getServiceCost,
    getWearMultiplier,
    getWearPerSecond,
    getWearPerUse,
} from './wear.js';

describe(getWearMultiplier.name, () => {
    it('is full strength until worn', () => {
        assert.strictEquals(getWearMultiplier(0), 1);
        assert.strictEquals(getWearMultiplier(99.9), 1);
    });
    it('is reduced at 100', () => {
        assert.strictEquals(getWearMultiplier(100), wearConfig.wornEffectiveness);
    });
});

describe(getServiceCost.name, () => {
    it('is a share of build cost, at least the minimum', () => {
        for (const towerType of Object.values(TowerType)) {
            assert.strictEquals(
                getServiceCost(towerType),
                Math.max(
                    5,
                    Math.round(economyConfig.towerCost[towerType] * wearConfig.serviceCostShare),
                ),
            );
        }
    });
});

describe(addWear.name, () => {
    it('caps at 100', () => {
        assert.strictEquals(
            addWear({
                wear: 95,
                amount: 12,
            }),
            100,
        );
        assert.strictEquals(
            addWear({
                wear: 0,
                amount: 2,
            }),
            2,
        );
    });
});

describe('worn tower stats', () => {
    it('halves damage, and slows only the Cricket Trap reload', () => {
        const fresh = getTowerStats(TowerType.Masher, 1, 0);
        const worn = getTowerStats(TowerType.Masher, 1, 100);
        assert.strictEquals(worn.damage, Math.round(fresh.damage / 2));
        assert.strictEquals(worn.cooldownMs, fresh.cooldownMs);
        const trap = getTowerStats(TowerType.CricketTrap, 1, 0);
        assert.strictEquals(
            getTowerStats(TowerType.CricketTrap, 1, 100).cooldownMs,
            trap.cooldownMs * 2,
        );
    });
});

describe('wear rates', () => {
    it('knows per-use and per-second towers', () => {
        assert.strictEquals(getWearPerUse(TowerType.Knife), 0.45);
        assert.strictEquals(getWearPerUse(TowerType.Swiper), 0);
        assert.strictEquals(getWearPerSecond(TowerType.Swiper), 1.1);
        assert.strictEquals(getWearPerSecond(TowerType.Knife), 0);
    });
});
