import {type ViewCreation2d} from '@antha/entity-2d';
import {Graphics} from '@antha/graphics-2d';
import {assertWrap} from '@augment-vir/assert';
import {cozyPalette, cozyShades, drawCozyShape, ellipsePath, roundRectPath} from '../art/cozy.js';
import {defineEntity} from '../game-state/game-entity.mod.js';
import {
    getPathDirectionAt,
    getPathLength,
    getPositionAlongPath,
    type PathDefinition,
} from '../level/level.js';
import {getPassStartPx} from './pass.entity.js';

/** Radius of the soft halo around the lamp bulb. */
const lampHaloRadiusPx = 34;

/** Draws one path's glow over the pass zone, plus the lamp shape at the zone's start. */
function drawLamp(graphics: Graphics, path: Readonly<PathDefinition>) {
    const length = getPathLength(path);
    const startPx = getPassStartPx(length);
    const start = getPositionAlongPath(path, startPx);
    const end = getPositionAlongPath(path, length);
    const direction = getPathDirectionAt(path, startPx);
    const half = path.widthPx / 2;
    const normalX = -direction.y * half;
    const normalY = direction.x * half;

    const zone = [
        start.x - normalX,
        start.y - normalY,
        end.x - normalX,
        end.y - normalY,
        end.x + normalX,
        end.y + normalY,
        start.x + normalX,
        start.y + normalY,
    ];
    // A soft warm glow: a wide dim Pumpkin wash with a brighter Butter core down the middle.
    graphics.poly(zone).fill({
        color: cozyPalette.pumpkin,
        alpha: 0.16,
    });
    graphics
        .poly([
            start.x - normalX * 0.55,
            start.y - normalY * 0.55,
            end.x - normalX * 0.55,
            end.y - normalY * 0.55,
            end.x + normalX * 0.55,
            end.y + normalY * 0.55,
            start.x + normalX * 0.55,
            start.y + normalY * 0.55,
        ])
        .fill({
            color: cozyPalette.butter,
            alpha: 0.14,
        });

    // The lamp: a Slate hood over a glowing Butter bulb, with a halo.
    const lampX = start.x - normalX * 1.3;
    const lampY = start.y - normalY * 1.3;
    graphics.circle(lampX, lampY, lampHaloRadiusPx).fill({
        color: cozyShades.lamp,
        alpha: 0.22,
    });
    drawCozyShape(graphics, {
        path: roundRectPath({
            x: lampX - 22,
            y: lampY - 14,
            width: 44,
            height: 16,
            radius: 7,
        }),
        fill: cozyPalette.slate,
    });
    drawCozyShape(graphics, {
        path: ellipsePath({
            x: lampX,
            y: lampY + 2,
            rx: 9,
            ry: 8,
        }),
        fill: cozyPalette.butter,
    });
    drawCozyShape(graphics, {
        path: ellipsePath({
            x: lampX,
            y: lampY + 2,
            rx: 4,
            ry: 3.5,
        }),
        fill: cozyShades.lamp,
        outline: false,
        highlight: false,
    });
}

/** Draws the heat lamp over the Pass zone of each path. Presentation only. */
export class PassLampEntity extends defineEntity({
    key: 'PassLampEntity',
}) {
    public override createView(): ViewCreation2d {
        return {
            view: new Graphics({
                zIndex: -0.4,
            }),
        };
    }

    public override update() {}

    public override render() {
        const graphics = assertWrap.instanceOf(this.view, Graphics);
        graphics.clear();
        for (const path of this.state.level.paths) {
            drawLamp(graphics, path);
        }
    }
}
