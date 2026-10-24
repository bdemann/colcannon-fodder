import {defineAnthaMod} from '@antha/engine';
import {calculateVirtualViewportPoint} from '@antha/graphics-2d';
import {type FullGameState, type UiClick} from '../game-state/game-state.js';

/** Converts a DOM pointer event into game-world coordinates, or `undefined` if outside the world. */
function toWorldPoint(state: Partial<FullGameState>, event: MouseEvent) {
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

/** Input that arrived between ticks, waiting to be published to `state.ui`. */
const buffered: {
    clicks: UiClick[];
    keys: string[];
    wheelSteps: number;
} = {
    clicks: [],
    keys: [],
    wheelSteps: 0,
};

/**
 * Feeds mouse and keyboard input into `state.ui`. Must be the first game mod in the mod list.
 *
 * Each tick it publishes everything that happened since the previous tick to `state.ui.clicks` and
 * `state.ui.keys`, replacing last tick's values. Every later mod in the same tick can read them;
 * nobody needs to clear them.
 */
export const inputMod = defineAnthaMod<
    FullGameState & {
        inputListenersAttached: boolean;
    }
>({
    modName: 'input',
    execute({state}) {
        if (!state.ui) {
            return;
        }

        state.ui.clicks = buffered.clicks;
        state.ui.keys = buffered.keys;
        buffered.clicks = [];
        state.ui.wheelSteps = buffered.wheelSteps;
        buffered.keys = [];
        buffered.wheelSteps = 0;

        const canvas = state.pixi?.canvas;

        if (state.inputListenersAttached || !canvas) {
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
            if (event.button !== 0 && event.button !== 2) {
                return;
            }

            const point = toWorldPoint(state, event);

            if (point) {
                buffered.clicks.push({
                    ...point,
                    button: event.button === 0 ? 'left' : 'right',
                });
            }
        });
        canvas.addEventListener('contextmenu', (event) => {
            /** Right click is a game control (deselect), not the browser menu. */
            event.preventDefault();
        });
        canvas.addEventListener(
            'wheel',
            (event) => {
                /** The wheel turns the Laser, so the page must not scroll. */
                event.preventDefault();
                buffered.wheelSteps += Math.sign(event.deltaY);
            },
            {
                passive: false,
            },
        );
        globalThis.addEventListener('keydown', (event) => {
            /** Typing in a HUD text field (room name) must not trigger game hotkeys. */
            if (event.composedPath()[0] instanceof HTMLInputElement) {
                return;
            }
            if (!event.repeat) {
                buffered.keys.push(event.key);
            }
        });
    },
});
