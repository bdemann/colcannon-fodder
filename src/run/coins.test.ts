import {assert, assertWrap} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {economyConfig} from '../config/game-config.js';
import {addCoins, getPerfectReason} from './coins.js';
import {createInitialRunState} from './run-state.js';

describe(addCoins.name, () => {
    it('adds coins, tracks earnings and records the event', () => {
        const runState = createInitialRunState();
        runState.elapsedMs = 500;
        addCoins(runState, {
            amount: 20,
            reason: 'Perfect mash',
            x: 1,
            y: 2,
        });

        assert.strictEquals(runState.coins, economyConfig.startingCoins + 20);
        assert.strictEquals(runState.coinsEarned, 20);
        assert.deepEquals(runState.coinEvents, [
            {
                id: 1,
                atMs: 500,
                amount: 20,
                reason: 'Perfect mash',
                x: 1,
                y: 2,
            },
        ]);
        assert.strictEquals(runState.nextCoinEventId, 2);
    });

    it('records zero-coin events without earning', () => {
        const runState = createInitialRunState();
        addCoins(runState, {
            amount: 0,
            reason: 'Free sample',
            x: 0,
            y: 0,
        });

        assert.strictEquals(runState.coins, economyConfig.startingCoins);
        assert.strictEquals(runState.coinsEarned, 0);
        assert.strictEquals(runState.coinEvents.length, 1);
    });

    it('keeps only the latest events', () => {
        const runState = createInitialRunState();
        for (let index = 0; index < economyConfig.coinEventsKept + 3; index++) {
            addCoins(runState, {
                amount: 1,
                reason: 'x',
                x: 0,
                y: 0,
            });
        }

        assert.strictEquals(runState.coinEvents.length, economyConfig.coinEventsKept);
        assert.strictEquals(assertWrap.isDefined(runState.coinEvents[0]).id, 4);
    });
});

describe(getPerfectReason.name, () => {
    it('names size and quality only when they matter', () => {
        assert.strictEquals(
            getPerfectReason({
                value: 1,
                quality: 100,
            }),
            'Perfect mash',
        );
        assert.strictEquals(
            getPerfectReason({
                value: 1.8,
                quality: 100,
            }),
            'Perfect mash · large ×1.8',
        );
        assert.strictEquals(
            getPerfectReason({
                value: 0.6,
                quality: 72,
            }),
            'Perfect mash · small ×0.6 · quality 72%',
        );
        assert.strictEquals(
            getPerfectReason({
                value: 1,
                quality: 72,
            }),
            'Perfect mash · quality 72%',
        );
    });
});
