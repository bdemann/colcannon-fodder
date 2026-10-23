import {defineAnthaMod} from '@antha/engine';
import {calculateVirtualViewportPoint} from '@antha/graphics-2d';
import {type FullGameState} from '../game-state/game-state.js';

/** Converts a DOM pointer event into game-world coordinates, or `undefined` if outside the world. */
function toWorldPoint(state: Partial<FullGameState>, event: PointerEvent) {
    const canvas = state.pixi?.canvas;

    if (!canvas || !state.virtualViewport) {
        return undefined;
    }

    return calculateVirtualViewportPoint({
        canvasBounds: canvas.getBoundingClientRect(),
        clientPoint: {
            x: event.clientX,
            y: event.clientY,
        },
        virtualViewport: state.virtualViewport,
    });
}

/**
 * Feeds mouse and keyboard input into `state.ui`. Listeners attach once, when the canvas exists.
 * Consumers read `state.ui.pointerWorld` and drain `state.ui.pendingClicks` /
 * `state.ui.pendingKeys` (set them back to `[]` after handling).
 */
export const inputMod = defineAnthaMod<
    FullGameState & {
        inputListenersAttached: boolean;
    }
>({
    modName: 'input',
    execute({state}) {
        const canvas = state.pixi?.canvas;

        if (state.inputListenersAttached || !canvas || !state.ui) {
            return;
        }

        state.inputListenersAttached = true;
        const ui = state.ui;

        canvas.addEventListener('pointermove', (event) => {
            ui.pointerWorld = toWorldPoint(state, event);
        });
        canvas.addEventListener('pointerleave', () => {
            ui.pointerWorld = undefined;
        });
        canvas.addEventListener('pointerdown', (event) => {
            if (event.button !== 0) {
                return;
            }

            const point = toWorldPoint(state, event);

            if (point) {
                ui.pendingClicks.push(point);
            }
        });
        globalThis.addEventListener('keydown', (event) => {
            if (!event.repeat) {
                ui.pendingKeys.push(event.key);
            }
        });
    },
});
