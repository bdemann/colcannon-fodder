import {type ViewCreation2d} from '@antha/entity-2d';
import {Graphics} from '@antha/graphics-2d';
import {assertWrap} from '@augment-vir/assert';
import {defineEntity} from '../game-state/game-entity.mod.js';
import {
    getPathDirectionAt,
    getPathLength,
    getPositionAlongPath,
    type PathDefinition,
} from '../level/level.js';
import {getPassStartPx} from './pass.entity.js';

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

    graphics
        .poly([
            start.x - normalX,
            start.y - normalY,
            end.x - normalX,
            end.y - normalY,
            end.x + normalX,
            end.y + normalY,
            start.x + normalX,
            start.y + normalY,
        ])
        .fill({
            color: '#ff9800',
            alpha: 0.18,
        });

    const lampX = start.x - normalX * 1.3;
    const lampY = start.y - normalY * 1.3;
    graphics.rect(lampX - 22, lampY - 10, 44, 20).fill({
        color: '#37474f',
    });
    graphics.circle(lampX, lampY, 9).fill({
        color: '#ffcc80',
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
