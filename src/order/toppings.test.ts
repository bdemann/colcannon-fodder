import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {Dish, dishDefinitions} from './dish.js';
import {Topping, createNoToppings} from './topping.js';
import {canApplyTopping, getPotatoToppings, matchDish} from './toppings.js';

function withToppings(toppings: ReadonlyArray<Topping>) {
    const result = createNoToppings();
    for (const topping of toppings) {
        result[topping] = true;
    }
    return result;
}

describe(matchDish.name, () => {
    for (const dish of Object.values(Dish)) {
        it(`matches ${dish}`, () => {
            assert.strictEquals(matchDish(withToppings(dishDefinitions[dish].toppings)), dish);
        });
    }

    it('gives undefined for no toppings', () => {
        assert.isUndefined(matchDish(createNoToppings()));
    });

    it('gives undefined for an extra topping', () => {
        assert.isUndefined(
            matchDish(
                withToppings([
                    Topping.Butter,
                    Topping.Gravy,
                ]),
            ),
        );
        assert.isUndefined(
            matchDish(
                withToppings([
                    Topping.Butter,
                    Topping.Scallions,
                    Topping.Cabbage,
                ]),
            ),
        );
    });

    it('gives undefined for a missing topping', () => {
        assert.isUndefined(matchDish(withToppings([Topping.Scallions])));
        assert.isUndefined(matchDish(withToppings([Topping.Cabbage])));
    });
});

describe(getPotatoToppings.name, () => {
    it('reads only the topping keys', () => {
        const params = {
            ...withToppings([Topping.Gravy]),
            mashHp: 0,
        };
        assert.deepEquals(getPotatoToppings(params), withToppings([Topping.Gravy]));
    });
});

describe(canApplyTopping.name, () => {
    const mashed = {
        mashHp: 0,
        served: false,
        ...createNoToppings(),
    };

    it('allows a topping on a mashed potato', () => {
        assert.isTrue(canApplyTopping(mashed, Topping.Butter));
    });

    it('rejects not-yet-mashed, served, or already topped potatoes', () => {
        assert.isFalse(
            canApplyTopping(
                {
                    ...mashed,
                    mashHp: 1,
                },
                Topping.Butter,
            ),
        );
        assert.isFalse(
            canApplyTopping(
                {
                    ...mashed,
                    served: true,
                },
                Topping.Butter,
            ),
        );
        assert.isFalse(
            canApplyTopping(
                {
                    ...mashed,
                    butter: true,
                },
                Topping.Butter,
            ),
        );
        assert.isTrue(
            canApplyTopping(
                {
                    ...mashed,
                    butter: true,
                },
                Topping.Gravy,
            ),
        );
    });
});
