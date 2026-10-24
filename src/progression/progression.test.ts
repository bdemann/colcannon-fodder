import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {economyConfig, mashConfig, potatoSizeConfig, waveConfig} from '../config/game-config.js';
import {knifeConfig} from '../config/knife-config.js';
import {progressionConfig} from '../config/progression-config.js';
import {createInitialRunState} from '../run/run-state.js';
import {payWaveBonuses} from '../run/serving.js';
import {getTowerStats, TowerType} from '../tower/tower-type.js';
import {
    applyPrestigeEvent,
    canUpgradeAtStars,
    getNextUnlockProgress,
    getStarsFromPoints,
    isTowerUnlocked,
    isTowerWorking,
} from './progression.js';

describe(getStarsFromPoints.name, () => {
    it('is points / 20 in half steps, clamped to 0 to 5', () => {
        assert.strictEquals(getStarsFromPoints(0), 0);
        assert.strictEquals(getStarsFromPoints(10), 0.5);
        assert.strictEquals(getStarsFromPoints(19.9), 0.5);
        assert.strictEquals(getStarsFromPoints(50), 2.5);
        assert.strictEquals(getStarsFromPoints(100), 5);
        assert.strictEquals(getStarsFromPoints(500), 5);
        assert.strictEquals(getStarsFromPoints(-5), 0);
    });
});

describe(isTowerUnlocked.name, () => {
    it('unlocks by threshold', () => {
        assert.isTrue(isTowerUnlocked(TowerType.Knife, 0));
        assert.isFalse(isTowerUnlocked(TowerType.Boiler, 0));
        assert.isTrue(isTowerUnlocked(TowerType.Boiler, 0.5));
        assert.isFalse(isTowerUnlocked(TowerType.Microwave, 2.5));
        assert.isTrue(isTowerUnlocked(TowerType.Microwave, 3));
    });

    it('unlocks every tower at 5 stars', () => {
        for (const towerType of Object.values(TowerType)) {
            assert.isTrue(isTowerUnlocked(towerType, 5));
            assert.isDefined(progressionConfig.towerUnlockStars[towerType]);
        }
    });
});

describe(isTowerWorking.name, () => {
    it('goes dormant when locked, if configured', () => {
        assert.isFalse(isTowerWorking(TowerType.Masher, 0, true));
        assert.isTrue(isTowerWorking(TowerType.Masher, 1, true));
    });

    it('keeps working when locked, if not dormant', () => {
        assert.isTrue(isTowerWorking(TowerType.Masher, 0, false));
    });
});

describe(canUpgradeAtStars.name, () => {
    it('gates levels 2 and 3 by stars', () => {
        assert.isFalse(
            canUpgradeAtStars({
                towerType: TowerType.Knife,
                toLevel: 2,
                stars: 2,
            }),
        );
        assert.isTrue(
            canUpgradeAtStars({
                towerType: TowerType.Knife,
                toLevel: 2,
                stars: 2.5,
            }),
        );
        assert.isFalse(
            canUpgradeAtStars({
                towerType: TowerType.Knife,
                toLevel: 3,
                stars: 3.5,
            }),
        );
        assert.isTrue(
            canUpgradeAtStars({
                towerType: TowerType.Knife,
                toLevel: 3,
                stars: 4,
            }),
        );
    });

    it('blocks upgrading a locked tower type', () => {
        assert.isFalse(
            canUpgradeAtStars({
                towerType: TowerType.Laser,
                toLevel: 2,
                stars: 3,
            }),
        );
    });
});

describe(getNextUnlockProgress.name, () => {
    it('reports progress to the next milestone', () => {
        assert.deepEquals(getNextUnlockProgress(5), {
            nextStars: 0.5,
            fraction: 0.5,
        });
        assert.deepEquals(getNextUnlockProgress(100), undefined);
    });
});

describe(applyPrestigeEvent.name, () => {
    function create(points: number) {
        const runState = createInitialRunState();
        runState.prestigePoints = points;

        return runState;
    }

    it('scales perfect servings by quality', () => {
        const runState = create(0);
        assert.strictEquals(
            applyPrestigeEvent(runState, {
                kind: 'perfect',
                quality: 80,
            }),
            2.4,
        );
        assert.strictEquals(runState.prestigePoints, 2.4);
    });

    it('penalizes rubbery perfect servings', () => {
        const runState = create(10);
        applyPrestigeEvent(runState, {
            kind: 'perfect',
            quality: progressionConfig.rubberyQuality - 1,
        });
        assert.strictEquals(runState.prestigePoints, 10 + progressionConfig.rubberyPenalty);
    });

    it('applies the other events', () => {
        const runState = create(50);
        applyPrestigeEvent(runState, {
            kind: 'incomplete',
        });
        applyPrestigeEvent(runState, {
            kind: 'raw',
        });
        applyPrestigeEvent(runState, {
            kind: 'order-filled',
        });
        applyPrestigeEvent(runState, {
            kind: 'order-expired',
        });
        applyPrestigeEvent(runState, {
            kind: 'stolen',
        });
        assert.strictEquals(runState.prestigePoints, 50 - 2 - 4 + 2 - 2 - 1);
    });

    it('clamps to 0 to 100 and reports the applied change', () => {
        const low = create(1);
        assert.strictEquals(
            applyPrestigeEvent(low, {
                kind: 'raw',
            }),
            -1,
        );
        assert.strictEquals(low.prestigePoints, 0);
        const high = create(99);
        assert.strictEquals(
            applyPrestigeEvent(high, {
                kind: 'perfect',
                quality: 100,
            }),
            1,
        );
        assert.strictEquals(high.prestigePoints, 100);
    });

    it('records a notice when a tower unlocks or locks', () => {
        const runState = create(9);
        applyPrestigeEvent(runState, {
            kind: 'order-filled',
        });
        assert.deepEquals(runState.prestigeNotice?.towerTypes, [TowerType.Boiler]);
        assert.strictEquals(runState.prestigeNotice?.kind, 'unlocked');
        applyPrestigeEvent(runState, {
            kind: 'raw',
        });
        function notice(): {kind: string; id: number} | undefined {
            return runState.prestigeNotice;
        }
        assert.strictEquals(notice()?.kind, 'locked');
        assert.strictEquals(notice()?.id, 2);
    });
});

describe('wave 1 tutorial', () => {
    const wave1 = waveConfig.waves[0];

    it('lets 3 Knives on one straight stretch mash every wave-1 potato', () => {
        const knife = getTowerStats(TowerType.Knife, 1);
        const knives = 3;
        for (const size of [
            'small',
            'medium',
        ] as const) {
            const radius = potatoSizeConfig[size].radius;
            const zoneMs = (2 * (knifeConfig.lineHalfWidthPx + radius)) / wave1.speedPxPerMs;
            const hitsPerKnife = Math.floor(zoneMs / knife.cooldownMs);
            const hits = hitsPerKnife * knives;
            // The first hit cuts; every later hit gets the cut multiplier.
            const damage = knife.damage + (hits - 1) * knife.damage * mashConfig.cutMultiplier;
            assert.isTrue(
                damage >= potatoSizeConfig[size].mashHp * wave1.hpMultiplier,
                `${size}: ${damage} damage vs ${potatoSizeConfig[size].mashHp * wave1.hpMultiplier} HP`,
            );
        }
    });

    it('pays a wave 1 bonus that covers a Boiling Pot', () => {
        const bonus: number = progressionConfig.waveEndBonusCoins[0];
        const cost: number = economyConfig.towerCost.boiler;
        assert.isTrue(bonus >= cost);
    });
});

describe(payWaveBonuses.name, () => {
    it('pays once when the wave is finished and all its potatoes are resolved', () => {
        const runState = createInitialRunState();
        runState.waveIndex = 1;
        runState.wavePhase = 'break';
        runState.potatoesSpawned = 8;
        runState.potatoesServed = 7;
        const coins = runState.coins;
        payWaveBonuses(runState);
        assert.strictEquals(runState.coins, coins);
        runState.potatoesServed = 8;
        payWaveBonuses(runState);
        payWaveBonuses(runState);
        assert.strictEquals(runState.coins, coins + progressionConfig.waveEndBonusCoins[0]);
        assert.strictEquals(runState.coinEvents.at(-1)?.reason, 'Wave 1 cleared!');
    });
});
