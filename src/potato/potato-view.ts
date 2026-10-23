import {type Graphics} from '@antha/graphics-2d';
import {potatoConfig} from '../config/game-config.js';
import {type PotatoProcessing} from '../run/run-state.js';

const potatoColors = {
    skin: '#c8a165',
    outline: '#7a5a30',
} as const;

/** Eye dot positions, relative to the potato's center. */
const eyePositions = [
    {
        x: -8,
        y: -5,
    },
    {
        x: 6,
        y: 4,
    },
    {
        x: 10,
        y: -7,
    },
] as const;

/**
 * Clears `graphics` and draws a potato centered on (0, 0). For now it always draws the raw look,
 * whatever `processing` says.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- the look will depend on it in a later issue
export function drawPotato(graphics: Graphics, _processing: Readonly<PotatoProcessing>): Graphics {
    /** Processed looks are added in a later issue; until then every potato looks raw. */
    graphics.clear();
    graphics
        .ellipse(0, 0, potatoConfig.radius * 1.2, potatoConfig.radius * 0.9)
        .fill({
            color: potatoColors.skin,
        })
        .stroke({
            color: potatoColors.outline,
            width: 3,
        });

    for (const eye of eyePositions) {
        graphics.circle(eye.x, eye.y, 3).fill({
            color: potatoColors.outline,
        });
    }

    return graphics;
}
