import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {mashConfig} from '../config/game-config.js';
import {type PotatoProcessing} from '../run/run-state.js';
import {TowerType, towerTypes} from '../tower/tower-type.js';
import {applyTowerHit, getHitDamage, getHitMultiplier, getMashProgress} from './mash.js';

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

/** Base damage per tower and the multipliers, read from config so balancing never breaks tests. */
const knife = towerTypes[TowerType.Knife].damage;
const boiler = towerTypes[TowerType.Boiler].damage;
const masher = towerTypes[TowerType.Masher].damage;
const {cutMultiplier, softMasherMultiplier} = mashConfig;

describe(getHitDamage.name, () => {
    it('uses each tower base damage', () => {
        assert.strictEquals(getHitDamage(fresh(), TowerType.Knife), knife);
        assert.strictEquals(getHitDamage(fresh(), TowerType.Boiler), boiler);
        assert.strictEquals(getHitDamage(fresh(), TowerType.Masher), masher);
    });

    it('applies the cut multiplier to every tower', () => {
        const cut = fresh({
            cut: true,
        });
        assert.strictEquals(getHitDamage(cut, TowerType.Knife), knife * cutMultiplier);
        assert.strictEquals(getHitDamage(cut, TowerType.Boiler), boiler * cutMultiplier);
        assert.strictEquals(getHitDamage(cut, TowerType.Masher), masher * cutMultiplier);
    });

    it('soft only boosts the masher', () => {
        const soft = fresh({
            cooked: true,
        });
        assert.strictEquals(getHitDamage(soft, TowerType.Knife), knife);
        assert.strictEquals(getHitDamage(soft, TowerType.Boiler), boiler);
        assert.strictEquals(getHitDamage(soft, TowerType.Masher), masher * softMasherMultiplier);
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
            masher * cutMultiplier * softMasherMultiplier,
        );
    });
});

describe(applyTowerHit.name, () => {
    it('applies effects after damage', () => {
        const processing = fresh();
        applyTowerHit(processing, TowerType.Knife);
        assert.strictEquals(getMashHp(processing), 100 - knife);
        assert.isTrue(processing.cut);
        applyTowerHit(processing, TowerType.Boiler);
        assert.strictEquals(getMashHp(processing), 100 - knife - boiler * cutMultiplier);
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

    it('rewards prepping before mashing', () => {
        const prepped = hitAll([
            TowerType.Knife,
            TowerType.Boiler,
            TowerType.Masher,
        ]);
        const reversed = hitAll([
            TowerType.Masher,
            TowerType.Boiler,
            TowerType.Knife,
        ]);
        assert.isBelow(prepped.mashHp, reversed.mashHp);
        assert.strictEquals(
            prepped.mashHp,
            Math.max(
                0,
                100 -
                    knife -
                    boiler * cutMultiplier -
                    masher * cutMultiplier * softMasherMultiplier,
            ),
        );
        assert.strictEquals(reversed.mashHp, 100 - masher - boiler - knife);
    });

    it('a lone masher needs several hits', () => {
        const hitsNeeded = Math.ceil(100 / masher);
        assert.isAbove(hitsNeeded, 1);
        assert.strictEquals(hitAll(new Array(hitsNeeded).fill(TowerType.Masher)).mashHp, 0);
        assert.isAbove(hitAll(new Array(hitsNeeded - 1).fill(TowerType.Masher)).mashHp, 0);
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

describe(getHitMultiplier.name, () => {
    it('is 1 on a plain potato and compounds cut and soft for the masher', () => {
        assert.strictEquals(getHitMultiplier(fresh(), TowerType.Masher), 1);
        assert.strictEquals(
            getHitMultiplier(
                fresh({
                    cooked: true,
                }),
                TowerType.Boiler,
            ),
            1,
        );
        assert.strictEquals(
            getHitMultiplier(
                fresh({
                    cut: true,
                    cooked: true,
                }),
                TowerType.Masher,
            ),
            cutMultiplier * softMasherMultiplier,
        );
    });
});

/** Reads mashHp through a function so TypeScript does not narrow it after an earlier assert. */
function getMashHp(processing: Readonly<PotatoProcessing>): number {
    return processing.mashHp;
}
