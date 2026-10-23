import {type PotatoProcessing, type RunState, ServingResult} from './run-state.js';

/** Which result a potato earns from its processing. See the table in `docs/spec.md` section 4. */
export function evaluatePotato(_processing: Readonly<PotatoProcessing>): ServingResult {
    /** Stub. Implemented in the "Restaurant judges every potato" issue. */
    return ServingResult.Raw;
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
    /** Stub: only counts the potato. Implemented in the "Restaurant judges every potato" issue. */
    const result = evaluatePotato(serving.processing);
    runState.potatoesServed++;

    return result;
}
