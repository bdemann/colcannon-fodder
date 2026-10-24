import {type RunState} from './run-state.js';

/**
 * Removes a departed client from a lobby (`Ready` run) and renumbers the remaining players so their
 * slots stay 0 to n-1, which is what a map's paths expect. Does nothing for unknown clients.
 */
export function removeClientFromLobby(
    runState: Pick<RunState, 'slotByClientId' | 'slotNames' | 'connected'>,
    clientId: string,
) {
    if (!(clientId in runState.slotByClientId)) {
        return;
    }

    const remaining = Object.entries(runState.slotByClientId)
        .filter(([id]) => id !== clientId)
        .sort(
            (
                [
                    ,
                    firstSlot,
                ],
                [
                    ,
                    secondSlot,
                ],
            ) => firstSlot - secondSlot,
        );
    const oldNames = {
        ...runState.slotNames,
    };

    runState.slotByClientId = {};
    runState.slotNames = {};
    runState.connected = {};
    remaining.forEach(
        (
            [
                id,
                oldSlot,
            ],
            newSlot,
        ) => {
            runState.slotByClientId[id] = newSlot;
            runState.slotNames[newSlot] = oldNames[oldSlot] ?? `Player ${newSlot + 1}`;
            runState.connected[newSlot] = true;
        },
    );
}
