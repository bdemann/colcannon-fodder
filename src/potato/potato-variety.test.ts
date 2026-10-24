import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {mashConfig} from '../config/game-config.js';
import {potatoVarietyConfig} from '../config/potato-variety-config.js';
import {type PotatoProcessing} from '../run/run-state.js';
import {TowerType, towerTypes} from '../tower/tower-type.js';
import {applyTowerHit, getHitDamage, getHitMultiplier} from './mash.js';
import {createVarietyWeights, pickPotatoVariety, PotatoVariety} from './potato-variety.js';

function potato(
    variety: PotatoVariety,
    overrides: Partial<PotatoProcessing> = {},
): PotatoProcessing {
    return {
        cut: false,
        cooked: false,
        mashHp: 1000,
        maxMashHp: 1000,
        variety,
        hasEyes: false,
        ...overrides,
    };
}

const {toughSkinMultiplier, denseMasherMultiplier, eyesBladeMultiplier} = potatoVarietyConfig;
const {cutMultiplier, softMasherMultiplier} = mashConfig;
const knife = towerTypes[TowerType.Knife].damage;
const boiler = towerTypes[TowerType.Boiler].damage;
const masher = towerTypes[TowerType.Masher].damage;
const laser = towerTypes[TowerType.Laser].damage;

describe('variety HP', () => {
    it('multiplies as configured', () => {
        const {varieties} = potatoVarietyConfig;
        assert.strictEquals(varieties[PotatoVariety.Red].hpMultiplier, 0.7);
        assert.strictEquals(varieties[PotatoVariety.Russet].hpMultiplier, 1);
        assert.strictEquals(varieties[PotatoVariety.Yukon].hpMultiplier, 1.3);
        assert.strictEquals(varieties[PotatoVariety.ToughSkinned].hpMultiplier, 1.2);
        assert.strictEquals(varieties[PotatoVariety.Sweet].hpMultiplier, 1.5);
        assert.strictEquals(varieties[PotatoVariety.Yam].hpMultiplier, 2);
    });
});

describe('plain varieties', () => {
    it('Red, Russet and Yukon have no traits', () => {
        for (const variety of [
            PotatoVariety.Red,
            PotatoVariety.Russet,
            PotatoVariety.Yukon,
        ]) {
            assert.strictEquals(getHitDamage(potato(variety), TowerType.Knife), knife);
            assert.strictEquals(getHitDamage(potato(variety), TowerType.Masher), masher);
        }
    });

    it('a missing variety acts like Russet', () => {
        const processing: PotatoProcessing = {
            cut: false,
            cooked: false,
            mashHp: 9,
            maxMashHp: 9,
        };
        assert.strictEquals(getHitDamage(processing, TowerType.Masher), masher);
    });
});

describe('tough skin', () => {
    it('slows every tower until Cut', () => {
        const tough = potato(PotatoVariety.ToughSkinned);
        assert.strictEquals(getHitDamage(tough, TowerType.Knife), knife * toughSkinMultiplier);
        assert.strictEquals(getHitDamage(tough, TowerType.Boiler), boiler * toughSkinMultiplier);
        assert.strictEquals(getHitDamage(tough, TowerType.Masher), masher * toughSkinMultiplier);
        assert.strictEquals(getHitDamage(tough, TowerType.Laser), laser * toughSkinMultiplier);
    });

    it('the Cut hit itself is reduced, then the skin is no problem', () => {
        const tough = potato(PotatoVariety.ToughSkinned);
        applyTowerHit(tough, TowerType.Knife);
        assert.strictEquals(tough.mashHp, 1000 - knife * toughSkinMultiplier);
        assert.isTrue(tough.cut);
        assert.strictEquals(getHitDamage(tough, TowerType.Knife), knife * cutMultiplier);
        assert.strictEquals(getHitDamage(tough, TowerType.Masher), masher * cutMultiplier);
    });

    it('a Boiling Pot does not remove it', () => {
        const tough = potato(PotatoVariety.ToughSkinned, {
            cooked: true,
        });
        assert.strictEquals(
            getHitDamage(tough, TowerType.Masher),
            masher * softMasherMultiplier * toughSkinMultiplier,
        );
    });
});

describe('dense', () => {
    it('halves Masher hits until Soft', () => {
        assert.strictEquals(
            getHitDamage(potato(PotatoVariety.Sweet), TowerType.Masher),
            masher * denseMasherMultiplier,
        );
        assert.strictEquals(
            getHitDamage(
                potato(PotatoVariety.Sweet, {
                    cooked: true,
                }),
                TowerType.Masher,
            ),
            masher * softMasherMultiplier,
        );
    });

    it('does not slow other towers', () => {
        const sweet = potato(PotatoVariety.Sweet);
        assert.strictEquals(getHitDamage(sweet, TowerType.Knife), knife);
        assert.strictEquals(getHitDamage(sweet, TowerType.Boiler), boiler);
    });
});

describe('yam', () => {
    it('has both traits', () => {
        const yam = potato(PotatoVariety.Yam);
        assert.strictEquals(
            getHitDamage(yam, TowerType.Masher),
            masher * toughSkinMultiplier * denseMasherMultiplier,
        );
        assert.strictEquals(getHitDamage(yam, TowerType.Knife), knife * toughSkinMultiplier);
    });

    it('is fully prepared by Cut and Soft', () => {
        assert.strictEquals(
            getHitDamage(
                potato(PotatoVariety.Yam, {
                    cut: true,
                    cooked: true,
                }),
                TowerType.Masher,
            ),
            masher * cutMultiplier * softMasherMultiplier,
        );
    });
});

describe('eyes', () => {
    it('halve Knife and Laser hits only', () => {
        const eyes = potato(PotatoVariety.Russet, {
            hasEyes: true,
        });
        assert.strictEquals(getHitDamage(eyes, TowerType.Knife), knife * eyesBladeMultiplier);
        assert.strictEquals(getHitDamage(eyes, TowerType.Laser), laser * eyesBladeMultiplier);
        assert.strictEquals(getHitDamage(eyes, TowerType.Masher), masher);
        assert.strictEquals(getHitDamage(eyes, TowerType.Boiler), boiler);
    });

    it('stack with tough skin in the shared multiplier', () => {
        const eyes = potato(PotatoVariety.ToughSkinned, {
            hasEyes: true,
        });
        assert.strictEquals(
            getHitMultiplier(eyes, TowerType.Knife),
            toughSkinMultiplier * eyesBladeMultiplier,
        );
    });
});

describe(pickPotatoVariety.name, () => {
    const weights = createVarietyWeights({
        [PotatoVariety.Red]: 0.5,
        [PotatoVariety.Yam]: 0.5,
    });

    it('walks the weights in order', () => {
        assert.strictEquals(pickPotatoVariety(weights, 0), PotatoVariety.Red);
        assert.strictEquals(pickPotatoVariety(weights, 0.49), PotatoVariety.Red);
        assert.strictEquals(pickPotatoVariety(weights, 0.5), PotatoVariety.Yam);
        assert.strictEquals(pickPotatoVariety(weights, 0.999), PotatoVariety.Yam);
    });

    it('never picks a zero-weight variety, even on rounding leftovers', () => {
        assert.strictEquals(pickPotatoVariety(weights, 1), PotatoVariety.Yam);
    });
});
