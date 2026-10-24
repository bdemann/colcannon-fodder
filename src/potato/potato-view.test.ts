import {Graphics} from '@antha/graphics-2d';
import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {createNoToppings, Topping} from '../order/topping.js';
import {drawPotato, getPotatoLookKey} from './potato-view.js';

describe(getPotatoLookKey.name, () => {
    const baseParams = {
        toppings: createNoToppings(),
        quality: 100,
        radius: 22,
        crown: false,
    };

    it('tells a nearly mashed potato from a fully mashed one', () => {
        const almost = getPotatoLookKey({
            ...baseParams,
            processing: {
                cut: false,
                cooked: false,
                mashHp: 1,
                maxMashHp: 100,
            },
        });
        const done = getPotatoLookKey({
            ...baseParams,
            processing: {
                cut: false,
                cooked: false,
                mashHp: 0,
                maxMashHp: 100,
            },
        });

        assert.notStrictEquals(almost, done);
    });

    it('changes with toppings', () => {
        const processing = {
            cut: false,
            cooked: false,
            mashHp: 0,
            maxMashHp: 100,
        };

        assert.notStrictEquals(
            getPotatoLookKey({
                ...baseParams,
                processing,
            }),
            getPotatoLookKey({
                ...baseParams,
                processing,
                toppings: {
                    ...createNoToppings(),
                    [Topping.Butter]: true,
                },
            }),
        );
    });
});

describe(drawPotato.name, () => {
    it('returns the same graphics instance', () => {
        const graphics = new Graphics();

        assert.strictEquals(
            drawPotato({
                graphics,
                processing: {
                    cut: false,
                    cooked: false,
                    mashHp: 100,
                    maxMashHp: 100,
                },
                radius: 22,
                toppings: createNoToppings(),
            }),
            graphics,
        );
    });

    it('draws every progress and effect combination without throwing', () => {
        for (const progress of [
            0,
            0.3,
            0.6,
            1,
        ]) {
            for (const cut of [
                false,
                true,
            ]) {
                for (const cooked of [
                    false,
                    true,
                ]) {
                    const graphics = new Graphics();
                    assert.strictEquals(
                        drawPotato({
                            graphics,
                            processing: {
                                cut,
                                cooked,
                                mashHp: 100 * (1 - progress),
                                maxMashHp: 100,
                            },
                            radius: 22,
                            toppings: createNoToppings(),
                        }),
                        graphics,
                    );
                }
            }
        }
    });

    it('draws every topping combination without throwing', () => {
        const toppings = Object.values(Topping);

        for (let mask = 0; mask < 1 << toppings.length; mask++) {
            const combination = createNoToppings();
            toppings.forEach((topping, index) => {
                combination[topping] = Boolean(mask & (1 << index));
            });
            const graphics = new Graphics();
            assert.strictEquals(
                drawPotato({
                    graphics,
                    processing: {
                        cut: false,
                        cooked: true,
                        mashHp: 0,
                        maxMashHp: 100,
                    },
                    radius: 22,
                    toppings: combination,
                }),
                graphics,
            );
        }
    });
});
