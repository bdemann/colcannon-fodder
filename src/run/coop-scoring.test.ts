import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {createHudSnapshot} from '../hud/hud-snapshot.js';
import {createNoToppings} from '../order/topping.js';
import {
    createEmptyRecords,
    getModeRecord,
    getRunRecord,
    isNewBest,
    mergeRunIntoRecords,
    type RunResult,
} from '../records/records.js';
import {createInitialRunState, type PotatoProcessing} from './run-state.js';
import {servePotato} from './serving.js';
import {getSlotColor, rankSlots} from './slot-ranking.js';

const perfect: PotatoProcessing = {
    cut: true,
    cooked: true,
    mashHp: 0,
    maxMashHp: 100,
};

function servePerfect(runState: ReturnType<typeof createInitialRunState>, ownerSlot: number) {
    servePotato(runState, {
        processing: perfect,
        ownerSlot,
        value: 1,
        toppings: createNoToppings(),
        quality: 100,
    });
}

function createCoopRun() {
    const runState = createInitialRunState();
    runState.slotNames = {
        0: 'Ann',
        1: 'Bo',
    };
    runState.scoreBySlot[1] = 0;

    return runState;
}

describe('co-op scoring', () => {
    it('ranks both slots and crowns the higher one', () => {
        const runState = createCoopRun();
        servePerfect(runState, 1);
        servePerfect(runState, 1);
        servePerfect(runState, 0);

        const snapshot = createHudSnapshot({
            runState,
        });

        assert.strictEquals(snapshot.playerCount, 2);
        assert.deepEquals(
            snapshot.contributions.map((entry) => {
                return [
                    entry.slot,
                    entry.name,
                    entry.perfectServings,
                    entry.crowned,
                ];
            }),
            [
                [
                    1,
                    'Bo',
                    2,
                    true,
                ],
                [
                    0,
                    'Ann',
                    1,
                    false,
                ],
            ],
        );
        assert.strictEquals(snapshot.contributions[0]?.color, getSlotColor(1));
        assert.strictEquals(
            snapshot.contributions.reduce((sum, entry) => sum + entry.points, 0),
            snapshot.totalScore,
        );
    });

    it('crowns every tied top contributor', () => {
        const runState = createCoopRun();
        servePerfect(runState, 0);
        servePerfect(runState, 1);

        assert.deepEquals(
            rankSlots(runState).map((entry) => entry.crowned),
            [
                true,
                true,
            ],
        );
    });

    it('crowns nobody when nobody scored', () => {
        assert.deepEquals(
            rankSlots(createCoopRun()).map((entry) => entry.crowned),
            [
                false,
                false,
            ],
        );
    });

    it('leaves a solo snapshot with one contributor', () => {
        const runState = createInitialRunState();
        runState.slotNames = {
            0: 'Player 1',
        };
        servePerfect(runState, 0);

        const snapshot = createHudSnapshot({
            runState,
        });

        assert.strictEquals(snapshot.playerCount, 1);
        assert.strictEquals(snapshot.contributions.length, 1);
    });
});

describe('co-op records', () => {
    const solo: RunResult = {
        levelId: 'a',
        mode: 'campaign',
        won: true,
        score: 1000,
        stars: 3,
        wavesReached: 5,
        dateMs: 1,
    };

    it('saves a co-op result in its own bucket without touching the solo best', () => {
        const withSolo = mergeRunIntoRecords(createEmptyRecords(), solo);
        const withCoop = mergeRunIntoRecords(withSolo, {
            ...solo,
            score: 5000,
            playerCount: 2,
        });

        assert.strictEquals(getModeRecord(withCoop, 'a', 'campaign').bestScore, 1000);
        assert.strictEquals(
            getRunRecord(withCoop, {
                ...solo,
                playerCount: 2,
            }).bestScore,
            5000,
        );
        assert.strictEquals(
            getRunRecord(withCoop, {
                ...solo,
                playerCount: 3,
            }).bestScore,
            0,
        );
        assert.deepEquals(withCoop.hall, withSolo.hall);
    });

    it('does not let a solo result replace a co-op best', () => {
        const withCoop = mergeRunIntoRecords(createEmptyRecords(), {
            ...solo,
            score: 5000,
            playerCount: 2,
        });

        assert.isTrue(isNewBest(withCoop, solo));
        assert.isFalse(
            isNewBest(withCoop, {
                ...solo,
                score: 5000,
                playerCount: 2,
            }),
        );
        assert.strictEquals(
            getRunRecord(mergeRunIntoRecords(withCoop, solo), {
                ...solo,
                playerCount: 2,
            }).bestScore,
            5000,
        );
    });
});
