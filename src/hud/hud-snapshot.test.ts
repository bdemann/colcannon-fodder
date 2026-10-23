import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {hudConfig} from '../config/game-config.js';
import {createInitialRunState, ServingResult} from '../run/run-state.js';
import {createHudSnapshot} from './hud-snapshot.js';

describe(createHudSnapshot.name, () => {
    it('sums the score of every slot', () => {
        const runState = createInitialRunState();
        runState.scoreBySlot = {
            0: 100,
            1: 250,
            3: 50,
        };

        assert.strictEquals(
            createHudSnapshot({
                runState,
            }).totalScore,
            400,
        );
    });

    it('shows the serving popup only inside its time window', () => {
        const runState = createInitialRunState();
        runState.potatoesServed = 4;
        runState.lastServing = {
            result: ServingResult.Perfect,
            servedAtMs: 5000,
            scoreDelta: 100,
            satisfactionDelta: 2,
        };

        function popupAt(elapsedMs: number) {
            return createHudSnapshot({
                runState: {
                    ...runState,
                    elapsedMs,
                },
            }).servingPopup;
        }

        assert.deepEquals(popupAt(5000), {
            result: ServingResult.Perfect,
            id: 4,
            scoreDelta: 100,
            satisfactionDelta: 2,
        });
        assert.deepEquals(popupAt(5000 + hudConfig.servingPopupMs - 1), {
            result: ServingResult.Perfect,
            id: 4,
            scoreDelta: 100,
            satisfactionDelta: 2,
        });
        assert.isUndefined(popupAt(5000 + hudConfig.servingPopupMs));
    });

    it('has no popup before anything was served', () => {
        assert.isUndefined(createHudSnapshot({}).servingPopup);
    });
});
