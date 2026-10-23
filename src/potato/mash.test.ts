import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {type PotatoProcessing} from '../run/run-state.js';
import {TowerType} from '../tower/tower-type.js';
import {applyTowerHit, getHitDamage, getMashProgress} from './mash.js';

function fresh(overrides: Partial<PotatoProcessing> = {}): PotatoProcessing {
    return {
        cut: false,
        cooked: false,
        mashHp: 100,
        maxMashHp: 100,
        ...overrides,
    };
}

function hitAll(towers: ReadonlyArray<TowerType>): PotatoProcessing {
    const processing = fresh();
    for (const tower of towers) {
        applyTowerHit(processing, tower);
    }
    return processing;
}

describe(getHitDamage.name, () => {
    it('uses each tower base damage', () => {
        assert.strictEquals(getHitDamage(fresh(), TowerType.Knife), 10);
        assert.strictEquals(getHitDamage(fresh(), TowerType.Boiler), 15);
        assert.strictEquals(getHitDamage(fresh(), TowerType.Masher), 30);
    });

    it('applies the cut multiplier to every tower', () => {
        const cut = fresh({
            cut: true,
        });
        assert.strictEquals(getHitDamage(cut, TowerType.Knife), 15);
        assert.strictEquals(getHitDamage(cut, TowerType.Boiler), 22.5);
        assert.strictEquals(getHitDamage(cut, TowerType.Masher), 45);
    });

    it('soft only boosts the masher', () => {
        const soft = fresh({
            cooked: true,
        });
        assert.strictEquals(getHitDamage(soft, TowerType.Knife), 10);
        assert.strictEquals(getHitDamage(soft, TowerType.Boiler), 15);
        assert.strictEquals(getHitDamage(soft, TowerType.Masher), 60);
    });

    it('stacks cut and soft for the masher', () => {
        assert.strictEquals(
            getHitDamage(
                fresh({
                    cut: true,
                    cooked: true,
                }),
                TowerType.Masher,
            ),
            90,
        );
    });
});

describe(applyTowerHit.name, () => {
    it('applies effects after damage', () => {
        const processing = fresh();
        applyTowerHit(processing, TowerType.Knife);
        assert.strictEquals(getMashHp(processing), 90);
        assert.isTrue(processing.cut);
        applyTowerHit(processing, TowerType.Boiler);
        assert.strictEquals(getMashHp(processing), 67.5);
        assert.isTrue(processing.cooked);
    });

    it('the masher applies no effect', () => {
        const processing = fresh();
        applyTowerHit(processing, TowerType.Masher);
        assert.isFalse(processing.cut);
        assert.isFalse(processing.cooked);
    });

    it('clamps mashHp at 0', () => {
        const processing = fresh({
            mashHp: 5,
        });
        applyTowerHit(processing, TowerType.Masher);
        assert.strictEquals(processing.mashHp, 0);
    });

    it('fully mashes with Knife, Pot, Masher (122.5 damage)', () => {
        const processing = hitAll([
            TowerType.Knife,
            TowerType.Boiler,
            TowerType.Masher,
        ]);
        assert.strictEquals(processing.mashHp, 0);
        assert.strictEquals(
            getHitDamage(fresh(), TowerType.Knife) +
                getHitDamage(
                    fresh({
                        cut: true,
                    }),
                    TowerType.Boiler,
                ) +
                getHitDamage(
                    fresh({
                        cut: true,
                        cooked: true,
                    }),
                    TowerType.Masher,
                ),
            122.5,
        );
    });

    it('fully mashes with Pot, Knife, Masher (115 damage)', () => {
        const processing = hitAll([
            TowerType.Boiler,
            TowerType.Knife,
            TowerType.Masher,
        ]);
        assert.strictEquals(processing.mashHp, 0);
        assert.strictEquals(
            getHitDamage(fresh(), TowerType.Boiler) +
                getHitDamage(
                    fresh({
                        cooked: true,
                    }),
                    TowerType.Knife,
                ) +
                getHitDamage(
                    fresh({
                        cut: true,
                        cooked: true,
                    }),
                    TowerType.Masher,
                ),
            115,
        );
    });

    it('leaves 45 HP for Masher, Pot, Knife', () => {
        const processing = hitAll([
            TowerType.Masher,
            TowerType.Boiler,
            TowerType.Knife,
        ]);
        assert.strictEquals(processing.mashHp, 45);
    });

    it('four masher hits fully mash, three do not', () => {
        assert.strictEquals(hitAll(new Array(4).fill(TowerType.Masher)).mashHp, 0);
        assert.strictEquals(hitAll(new Array(3).fill(TowerType.Masher)).mashHp, 10);
    });
});

describe(getMashProgress.name, () => {
    it('goes from 0 to 1', () => {
        assert.strictEquals(getMashProgress(fresh()), 0);
        assert.strictEquals(
            getMashProgress(
                fresh({
                    mashHp: 25,
                }),
            ),
            0.75,
        );
        assert.strictEquals(
            getMashProgress(
                fresh({
                    mashHp: 0,
                }),
            ),
            1,
        );
    });
});

/** Reads mashHp through a function so TypeScript does not narrow it after an earlier assert. */
function getMashHp(processing: Readonly<PotatoProcessing>): number {
    return processing.mashHp;
}
