import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {runConfig, satisfactionConfig, servingConfig} from '../config/game-config.js';
import {
    createInitialRunState,
    type PotatoProcessing,
    RunStatus,
    ServingResult,
} from './run-state.js';
import {evaluatePotato, servePotato} from './serving.js';

const perfect: PotatoProcessing = {
    cut: true,
    cooked: true,
    mashed: true,
};
const raw: PotatoProcessing = {
    cut: false,
    cooked: false,
    mashed: false,
};
const partial: PotatoProcessing = {
    cut: true,
    cooked: false,
    mashed: false,
};

describe(evaluatePotato.name, () => {
    for (const cut of [
        true,
        false,
    ]) {
        for (const cooked of [
            true,
            false,
        ]) {
            for (const mashed of [
                true,
                false,
            ]) {
                const count = [
                    cut,
                    cooked,
                    mashed,
                ].filter(Boolean).length;
                const expected =
                    count === 3
                        ? ServingResult.Perfect
                        : count === 0
                          ? ServingResult.Raw
                          : ServingResult.Incomplete;
                it(`cut=${cut} cooked=${cooked} mashed=${mashed} is ${expected}`, () => {
                    assert.strictEquals(
                        evaluatePotato({
                            cut,
                            cooked,
                            mashed,
                        }),
                        expected,
                    );
                });
            }
        }
    }
});

describe(servePotato.name, () => {
    it('records a perfect serving', () => {
        const runState = createInitialRunState();
        runState.satisfaction = 50;
        runState.elapsedMs = 1234;

        const result = servePotato(runState, {
            processing: perfect,
            ownerSlot: 0,
        });

        assert.strictEquals(result, ServingResult.Perfect);
        assert.strictEquals(runState.scoreBySlot[0], servingConfig.perfect.score);
        assert.strictEquals(runState.satisfaction, 50 + servingConfig.perfect.satisfaction);
        assert.strictEquals(runState.potatoesServed, 1);
        assert.strictEquals(runState.servingCounts[ServingResult.Perfect], 1);
        assert.deepEquals(runState.lastServing, {
            result: ServingResult.Perfect,
            servedAtMs: 1234,
        });
        assert.strictEquals(runState.status, RunStatus.Playing);
    });

    it('applies incomplete servings', () => {
        const runState = createInitialRunState();
        servePotato(runState, {
            processing: partial,
            ownerSlot: 0,
        });
        assert.strictEquals(runState.servingCounts[ServingResult.Incomplete], 1);
        assert.strictEquals(
            runState.satisfaction,
            satisfactionConfig.starting + servingConfig.incomplete.satisfaction,
        );
    });

    it('never raises satisfaction above the max', () => {
        const runState = createInitialRunState();
        servePotato(runState, {
            processing: perfect,
            ownerSlot: 0,
        });
        assert.strictEquals(runState.satisfaction, satisfactionConfig.max);
    });

    it('never lowers satisfaction below 0', () => {
        const runState = createInitialRunState();
        runState.satisfaction = 3;
        servePotato(runState, {
            processing: raw,
            ownerSlot: 0,
        });
        assert.strictEquals(runState.satisfaction, 0);
    });

    it('credits a slot that is not in scoreBySlot yet', () => {
        const runState = createInitialRunState();
        servePotato(runState, {
            processing: perfect,
            ownerSlot: 1,
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
            });
        }
        assert.strictEquals(runState.status, RunStatus.Lost);

        const before = structuredClone(runState);
        const result = servePotato(runState, {
            processing: perfect,
            ownerSlot: 0,
        });
        assert.strictEquals(result, ServingResult.Perfect);
        assert.deepEquals(runState, before);
    });

    it('wins the run after serving every potato', () => {
        const runState = createInitialRunState();
        for (let i = 0; i < runConfig.potatoesPerRun - 1; i++) {
            servePotato(runState, {
                processing: perfect,
                ownerSlot: 0,
            });
            assert.strictEquals(runState.status, RunStatus.Playing);
        }
        servePotato(runState, {
            processing: perfect,
            ownerSlot: 0,
        });
        assert.strictEquals(runState.status, RunStatus.Won);
        assert.strictEquals(runState.potatoesServed, runConfig.potatoesPerRun);
    });

    it('counts losing on the last potato as a loss', () => {
        const runState = createInitialRunState();
        runState.potatoesServed = runConfig.potatoesPerRun - 1;
        runState.satisfaction = 1;
        servePotato(runState, {
            processing: raw,
            ownerSlot: 0,
        });
        assert.strictEquals(runState.status, RunStatus.Lost);
    });
});
