import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {gameWorldSize} from '../game-state/game-world.js';
import {getPositionAlongPath} from '../level/level.js';
import {levels} from '../level/levels.js';
import {hudPlayfieldRects, rectsOverlap, segmentTouchesRect, type HudRect} from './hud-layout.js';

/** Chutes are drawn a little bigger than the belt is wide. */
const chuteRadiusPx = 60;

describe('hud layout', () => {
    it('keeps every panel on screen', () => {
        for (const {name, rect} of hudPlayfieldRects) {
            assert.isTrue(
                rect.x >= 0 &&
                    rect.y >= 0 &&
                    rect.x + rect.width <= gameWorldSize.width &&
                    rect.y + rect.height <= gameWorldSize.height,
                `${name} is off screen`,
            );
        }
    });

    for (const level of levels) {
        it(`covers no belt, chute or restaurant on ${level.name}`, () => {
            const restaurant: HudRect = {
                x: level.restaurant.x - level.restaurant.sizePx / 2,
                y: level.restaurant.y - level.restaurant.sizePx / 2,
                width: level.restaurant.sizePx,
                height: level.restaurant.sizePx,
            };

            for (const {name, rect} of hudPlayfieldRects) {
                assert.isFalse(
                    rectsOverlap({
                        first: rect,
                        second: restaurant,
                    }),
                    `${name} covers the restaurant`,
                );

                for (const path of level.paths) {
                    for (let index = 1; index < path.waypoints.length; index++) {
                        const start = path.waypoints[index - 1];
                        const end = path.waypoints[index];

                        assert.isDefined(start);
                        assert.isDefined(end);
                        assert.isFalse(
                            segmentTouchesRect({
                                start,
                                end,
                                radius: path.widthPx / 2,
                                rect,
                            }),
                            `${name} covers the ${path.pathId} belt of ${level.name} (segment ${index})`,
                        );
                    }
                    for (const chute of path.chutes ?? []) {
                        const spot = getPositionAlongPath(path, chute.distancePx);

                        assert.isFalse(
                            segmentTouchesRect({
                                start: spot,
                                end: spot,
                                radius: chuteRadiusPx,
                                rect,
                            }),
                            `${name} covers a chute on ${level.name}`,
                        );
                    }
                }
            }
        });
    }
});
