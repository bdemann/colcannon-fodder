import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {economyConfig} from '../config/game-config.js';
import {upgradeConfig} from '../config/upgrade-config.js';
import {getSellValue, getTowerStats, getUpgradeCost, TowerType, towerTypes} from './tower-type.js';

describe(getTowerStats.name, () => {
    it('returns the base stats at level 1', () => {
        const {damage, rangePx, cooldownMs} = towerTypes[TowerType.Masher];

        assert.deepEquals(getTowerStats(TowerType.Masher, 1), {
            damage,
            rangePx,
            cooldownMs,
        });
    });

    it('applies the level multipliers, rounding damage and range', () => {
        const base = towerTypes[TowerType.Knife];
        const stats = getTowerStats(TowerType.Knife, 3);

        assert.strictEquals(stats.damage, Math.round(base.damage * upgradeConfig.damageByLevel[3]));
        assert.strictEquals(
            stats.rangePx,
            Math.round(base.rangePx * upgradeConfig.rangeByLevel[3]),
        );
        assert.strictEquals(stats.cooldownMs, base.cooldownMs * upgradeConfig.cooldownByLevel[3]);
    });

    it('gets stronger with every level', () => {
        const [
            one,
            two,
            three,
        ] = [
            1,
            2,
            3,
        ].map((level) => {
            return getTowerStats(TowerType.Masher, level);
        });

        assert.isTrue(!!one && !!two && !!three);
        assert.isTrue((one?.damage ?? 0) < (two?.damage ?? 0));
        assert.isTrue((two?.damage ?? 0) < (three?.damage ?? 0));
        assert.isTrue((one?.cooldownMs ?? 0) > (three?.cooldownMs ?? 0));
    });
});

describe(getUpgradeCost.name, () => {
    it('is a multiple of the build cost', () => {
        assert.strictEquals(
            getUpgradeCost(TowerType.Knife, 2),
            Math.round(economyConfig.towerCost.knife * upgradeConfig.costMultiplierByLevel[2]),
        );
        assert.strictEquals(
            getUpgradeCost(TowerType.Knife, 3),
            Math.round(economyConfig.towerCost.knife * upgradeConfig.costMultiplierByLevel[3]),
        );
    });
});

describe(getSellValue.name, () => {
    it('refunds half the build cost at level 1', () => {
        assert.strictEquals(
            getSellValue(TowerType.Knife, 1),
            Math.round(economyConfig.towerCost.knife * upgradeConfig.sellRefund),
        );
    });

    it('includes every upgrade paid', () => {
        const spent =
            economyConfig.towerCost.boiler +
            getUpgradeCost(TowerType.Boiler, 2) +
            getUpgradeCost(TowerType.Boiler, 3);

        assert.strictEquals(
            getSellValue(TowerType.Boiler, 3),
            Math.round(spent * upgradeConfig.sellRefund),
        );
        assert.strictEquals(
            getSellValue(TowerType.Boiler, 2),
            Math.round(
                (economyConfig.towerCost.boiler + getUpgradeCost(TowerType.Boiler, 2)) *
                    upgradeConfig.sellRefund,
            ),
        );
    });
});
