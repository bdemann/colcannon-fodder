import {Graphics} from '@antha/graphics-2d';
import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {drawPotato} from './potato-view.js';

describe(drawPotato.name, () => {
    it('returns the same graphics instance', () => {
        const graphics = new Graphics();

        assert.strictEquals(
            drawPotato(
                graphics,
                {
                    cut: false,
                    cooked: false,
                    mashHp: 100,
                    maxMashHp: 100,
                },
                22,
            ),
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
                        drawPotato(
                            graphics,
                            {
                                cut,
                                cooked,
                                mashHp: 100 * (1 - progress),
                                maxMashHp: 100,
                            },
                            22,
                        ),
                        graphics,
                    );
                }
            }
        }
    });
});
