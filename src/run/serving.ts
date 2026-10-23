import {satisfactionConfig, servingConfig} from '../config/game-config.js';
import {type PotatoProcessing, type RunState, RunStatus, ServingResult} from './run-state.js';

/** Which result a potato earns from its processing. See the table in `docs/spec.md` section 4. */
export function evaluatePotato(processing: Readonly<PotatoProcessing>): ServingResult {
    if (processing.cut && processing.cooked && processing.mashed) {
        return ServingResult.Perfect;
    } else if (!processing.cut && !processing.cooked && !processing.mashed) {
        return ServingResult.Raw;
    } else {
        return ServingResult.Incomplete;
    }
}

/**
 * Serves one potato at the restaurant: updates `runState` in place with the result's score,
 * satisfaction, counts and `lastServing`, and ends the run when it is won or lost. Simulation code
 * (the potato entity) calls this exactly once per potato that reaches the restaurant.
 */
export function servePotato(
    runState: RunState,
    serving: Readonly<{
        processing: Readonly<PotatoProcessing>;
        /** The `ownerSlot` of the path the potato walked. Points are credited to this slot. */
        ownerSlot: number;
    }>,
): ServingResult {
    const result = evaluatePotato(serving.processing);
    if (runState.status !== RunStatus.Playing) {
        return result;
    }

    const config = servingConfig[result];
    runState.potatoesServed += 1;
    runState.servingCounts[result] += 1;
    runState.scoreBySlot[serving.ownerSlot] =
        (runState.scoreBySlot[serving.ownerSlot] ?? 0) + config.score;
    runState.satisfaction = Math.min(
        satisfactionConfig.max,
        Math.max(0, runState.satisfaction + config.satisfaction),
    );
    runState.lastServing = {
        result,
        servedAtMs: runState.elapsedMs,
    };

    if (runState.satisfaction <= 0) {
        runState.status = RunStatus.Lost;
    } else if (runState.potatoesServed >= runState.potatoesPerRun) {
        runState.status = RunStatus.Won;
    }

    return result;
}
