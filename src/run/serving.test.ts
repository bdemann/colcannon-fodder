import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {
    economyConfig,
    orderConfig,
    potatoSizeConfig,
    satisfactionConfig,
    servingConfig,
} from '../config/game-config.js';
import {Dish} from '../order/dish.js';
import {createNoToppings, Topping} from '../order/topping.js';
import {
    createInitialRunState,
    type PotatoProcessing,
    RunStatus,
    ServingResult,
} from './run-state.js';
import {evaluatePotato, getSatisfactionDelta, servePotato} from './serving.js';

const perfect: PotatoProcessing = {
    cut: true,
    cooked: true,
    mashHp: 0,
    maxMashHp: 100,
};
const raw: PotatoProcessing = {
    cut: false,
    cooked: false,
    mashHp: 100,
    maxMashHp: 100,
};
const partial: PotatoProcessing = {
    cut: true,
    cooked: false,
    mashHp: 50,
    maxMashHp: 100,
};

describe(evaluatePotato.name, () => {
    it('is Perfect at 0 mashHp, whatever the effects', () => {
        for (const cut of [
            true,
            false,
        ]) {
            for (const cooked of [
                true,
                false,
            ]) {
                assert.strictEquals(
                    evaluatePotato({
                        cut,
                        cooked,
                        mashHp: 0,
                        maxMashHp: 100,
                    }),
                    ServingResult.Perfect,
                );
            }
        }
    });

    it('is Raw when untouched', () => {
        assert.strictEquals(evaluatePotato(raw), ServingResult.Raw);
    });

    it('is Incomplete with any effect or damage but mashHp left', () => {
        assert.strictEquals(evaluatePotato(partial), ServingResult.Incomplete);
        assert.strictEquals(
            evaluatePotato({
                cut: false,
                cooked: true,
                mashHp: 100,
                maxMashHp: 100,
            }),
            ServingResult.Incomplete,
        );
        assert.strictEquals(
            evaluatePotato({
                cut: false,
                cooked: false,
                mashHp: 70,
                maxMashHp: 100,
            }),
            ServingResult.Incomplete,
        );
    });
});

describe(getSatisfactionDelta.name, () => {
    function at(progress: number): number {
        const processing = {
            cut: true,
            cooked: false,
            mashHp: 100 * (1 - progress),
            maxMashHp: 100,
        };
        return getSatisfactionDelta(evaluatePotato(processing), processing);
    }

    it('scales incomplete servings with progress', () => {
        // Issue #36 says -14, but Math.round(-13.5) is -13 in JS.
        assert.strictEquals(at(0.1), -13);
        assert.strictEquals(at(0.9), servingConfig.incomplete.satisfaction);
    });

    it('uses the flat penalties for perfect and raw', () => {
        assert.strictEquals(
            getSatisfactionDelta(ServingResult.Perfect, perfect),
            servingConfig.perfect.satisfaction,
        );
        assert.strictEquals(
            getSatisfactionDelta(ServingResult.Raw, raw),
            servingConfig.raw.satisfaction,
        );
    });
});

describe(servePotato.name, () => {
    it('records a perfect serving', () => {
        const runState = createInitialRunState();
        runState.satisfaction = 50;
        runState.elapsedMs = 1234;

        const result = servePotato(runState, {
            processing: perfect,
            ownerSlot: 0,
            value: 1,
            toppings: createNoToppings(),
        });

        assert.strictEquals(result, ServingResult.Perfect);
        assert.strictEquals(runState.scoreBySlot[0], servingConfig.perfect.score);
        assert.strictEquals(runState.satisfaction, 50 + servingConfig.perfect.satisfaction);
        assert.strictEquals(runState.potatoesServed, 1);
        assert.strictEquals(runState.servingCounts[ServingResult.Perfect], 1);
        assert.deepEquals(runState.lastServing, {
            result: ServingResult.Perfect,
            servedAtMs: 1234,
            scoreDelta: servingConfig.perfect.score,
            satisfactionDelta: servingConfig.perfect.satisfaction,
            progress: 1,
        });
        assert.strictEquals(runState.status, RunStatus.Playing);
    });

    it('applies incomplete servings', () => {
        const runState = createInitialRunState();
        servePotato(runState, {
            processing: partial,
            ownerSlot: 0,
            value: 1,
            toppings: createNoToppings(),
        });
        assert.strictEquals(runState.servingCounts[ServingResult.Incomplete], 1);
        // partial is 50% mashed: round(-15 * 0.5) = -7, worse than the incomplete penalty -5.
        assert.strictEquals(runState.satisfaction, satisfactionConfig.starting - 7);
        assert.strictEquals(runState.lastServing?.satisfactionDelta, -7);
    });

    it('never raises satisfaction above the max', () => {
        const runState = createInitialRunState();
        servePotato(runState, {
            processing: perfect,
            ownerSlot: 0,
            value: 1,
            toppings: createNoToppings(),
        });
        assert.strictEquals(runState.satisfaction, satisfactionConfig.max);
    });

    it('never lowers satisfaction below 0', () => {
        const runState = createInitialRunState();
        runState.satisfaction = 3;
        servePotato(runState, {
            processing: raw,
            ownerSlot: 0,
            value: 1,
            toppings: createNoToppings(),
        });
        assert.strictEquals(runState.satisfaction, 0);
    });

    it('credits a slot that is not in scoreBySlot yet', () => {
        const runState = createInitialRunState();
        servePotato(runState, {
            processing: perfect,
            ownerSlot: 1,
            value: 1,
            toppings: createNoToppings(),
        });
        assert.strictEquals(runState.scoreBySlot[1], servingConfig.perfect.score);
        assert.strictEquals(runState.scoreBySlot[0], 0);
    });

    it('loses the run when enough raw potatoes are served, then ignores later servings', () => {
        const runState = createInitialRunState();
        for (let i = 0; i < 20 && runState.status === RunStatus.Playing; i++) {
            servePotato(runState, {
                processing: raw,
                ownerSlot: 0,
                value: 1,
                toppings: createNoToppings(),
            });
        }
        assert.strictEquals(runState.status, RunStatus.Lost);

        const before = structuredClone(runState);
        const result = servePotato(runState, {
            processing: perfect,
            ownerSlot: 0,
            value: 1,
            toppings: createNoToppings(),
        });
        assert.strictEquals(result, ServingResult.Perfect);
        assert.deepEquals(runState, before);
    });

    it('wins the run after serving every potato', () => {
        const runState = createInitialRunState();
        for (let i = 0; i < runState.potatoesPerRun - 1; i++) {
            servePotato(runState, {
                processing: perfect,
                ownerSlot: 0,
                value: 1,
                toppings: createNoToppings(),
            });
            assert.strictEquals(runState.status, RunStatus.Playing);
        }
        servePotato(runState, {
            processing: perfect,
            ownerSlot: 0,
            value: 1,
            toppings: createNoToppings(),
        });
        assert.strictEquals(runState.status, RunStatus.Won);
        assert.strictEquals(runState.potatoesServed, runState.potatoesPerRun);
    });

    it('counts losing on the last potato as a loss', () => {
        const runState = createInitialRunState();
        runState.potatoesServed = runState.potatoesPerRun - 1;
        runState.satisfaction = 1;
        servePotato(runState, {
            processing: raw,
            ownerSlot: 0,
            value: 1,
            toppings: createNoToppings(),
        });
        assert.strictEquals(runState.status, RunStatus.Lost);
    });
});

describe('servePotato size value', () => {
    it('scales a perfect serving score and coins by value', () => {
        const large = createInitialRunState();
        servePotato(large, {
            processing: perfect,
            ownerSlot: 0,
            value: potatoSizeConfig.large.value,
            toppings: createNoToppings(),
        });
        assert.strictEquals(large.scoreBySlot[0], 180);
        assert.strictEquals(large.lastServing?.scoreDelta, 180);
        assert.strictEquals(large.coins, economyConfig.startingCoins + 36);

        const small = createInitialRunState();
        servePotato(small, {
            processing: perfect,
            ownerSlot: 0,
            value: potatoSizeConfig.small.value,
            toppings: createNoToppings(),
        });
        assert.strictEquals(small.scoreBySlot[0], 60);
        assert.strictEquals(small.coins, economyConfig.startingCoins + 12);
    });

    it('does not scale raw or incomplete servings', () => {
        const runState = createInitialRunState();
        servePotato(runState, {
            processing: partial,
            ownerSlot: 0,
            value: 1.8,
            toppings: createNoToppings(),
        });
        assert.strictEquals(runState.scoreBySlot[0], 0);
        assert.strictEquals(runState.coins, economyConfig.startingCoins + 5);
    });
});

describe('servePotato order filling', () => {
    const butter = {
        ...createNoToppings(),
        [Topping.Butter]: true,
    };

    function order(orderId: number, dish: Dish) {
        return {
            orderId,
            dish,
            createdAtMs: 0,
            expiresAtMs: 99_999,
        };
    }

    function serve(
        runState: ReturnType<typeof createInitialRunState>,
        overrides: {processing?: PotatoProcessing; value?: number} = {},
    ) {
        servePotato(runState, {
            processing: overrides.processing ?? perfect,
            ownerSlot: 0,
            value: overrides.value ?? 1,
            toppings: butter,
        });
    }

    it('fills a matching order with the bonus', () => {
        const runState = createInitialRunState();
        runState.satisfaction = 50;
        runState.elapsedMs = 777;
        runState.orders.push(order(1, Dish.ButteredMash));
        serve(runState);

        assert.deepEquals(runState.orders, []);
        assert.strictEquals(
            runState.scoreBySlot[0],
            servingConfig.perfect.score + orderConfig.fulfilled.score,
        );
        assert.strictEquals(
            runState.coins,
            economyConfig.startingCoins +
                economyConfig.servingCoins.perfect +
                orderConfig.fulfilled.coins,
        );
        assert.strictEquals(
            runState.satisfaction,
            50 + servingConfig.perfect.satisfaction + orderConfig.fulfilled.satisfaction,
        );
        assert.deepEquals(runState.lastOrderEvent, {
            kind: 'fulfilled',
            dish: Dish.ButteredMash,
            atMs: 777,
            scoreDelta: orderConfig.fulfilled.score,
            satisfactionDelta: orderConfig.fulfilled.satisfaction,
        });
    });

    it('fills the oldest of two same-dish orders', () => {
        const runState = createInitialRunState();
        runState.orders.push(order(1, Dish.ButteredMash), order(2, Dish.ButteredMash));
        serve(runState);
        assert.deepEquals(
            runState.orders.map((x) => x.orderId),
            [2],
        );
    });

    it('does not fill a different dish', () => {
        const runState = createInitialRunState();
        runState.orders.push(order(1, Dish.Champ));
        serve(runState);
        assert.strictEquals(runState.orders.length, 1);
        assert.isUndefined(runState.lastOrderEvent);
    });

    it('does not fill with an incomplete potato', () => {
        const runState = createInitialRunState();
        runState.orders.push(order(1, Dish.ButteredMash));
        serve(runState, {
            processing: partial,
        });
        assert.strictEquals(runState.orders.length, 1);
    });

    it('scales the bonus by value', () => {
        const runState = createInitialRunState();
        runState.orders.push(order(1, Dish.ButteredMash));
        serve(runState, {
            value: 2,
        });
        assert.strictEquals(
            runState.scoreBySlot[0],
            servingConfig.perfect.score * 2 + orderConfig.fulfilled.score * 2,
        );
        assert.strictEquals(
            runState.coins,
            economyConfig.startingCoins +
                economyConfig.servingCoins.perfect * 2 +
                orderConfig.fulfilled.coins * 2,
        );
    });

    it('does nothing extra for toppings with no open order', () => {
        const runState = createInitialRunState();
        serve(runState);
        assert.isUndefined(runState.lastOrderEvent);
        assert.strictEquals(runState.scoreBySlot[0], servingConfig.perfect.score);
    });
});

describe('servePotato coins', () => {
    const cases: ReadonlyArray<
        [
            ServingResult,
            PotatoProcessing,
        ]
    > = [
        [
            ServingResult.Perfect,
            perfect,
        ],
        [
            ServingResult.Incomplete,
            partial,
        ],
        [
            ServingResult.Raw,
            raw,
        ],
    ];

    for (const [
        result,
        processing,
    ] of cases) {
        it(`pays ${economyConfig.servingCoins[result]} coins for ${result}`, () => {
            const runState = createInitialRunState();

            servePotato(runState, {
                processing,
                ownerSlot: 0,
                value: 1,
                toppings: createNoToppings(),
            });

            assert.strictEquals(
                runState.coins,
                economyConfig.startingCoins + economyConfig.servingCoins[result],
            );
        });
    }

    it('pays nothing once the run is over', () => {
        const runState = createInitialRunState();
        runState.status = RunStatus.Lost;

        servePotato(runState, {
            processing: perfect,
            ownerSlot: 0,
            value: 1,
            toppings: createNoToppings(),
        });

        assert.strictEquals(runState.coins, economyConfig.startingCoins);
    });
});
