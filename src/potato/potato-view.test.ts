import {Graphics} from '@antha/graphics-2d';
import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {createNoToppings, Topping} from '../order/topping.js';
import {drawPotato} from './potato-view.js';

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
