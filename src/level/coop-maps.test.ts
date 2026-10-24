import {assert, assertWrap} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {gameWorldSize} from '../game-state/game-world.js';
import {canPlaceTower} from '../tower/tower-placement.js';
import {crossroadsLevel, getLevelsForPlayerCount, levels, twoRoadsLevel} from './levels.js';

const coopLevels = [
    twoRoadsLevel,
    crossroadsLevel,
];

describe('multiplayer maps', () => {
    it('declare their exact player counts and path counts', () => {
        assert.strictEquals(twoRoadsLevel.minPlayers, 2);
        assert.strictEquals(twoRoadsLevel.maxPlayers, 2);
        assert.strictEquals(twoRoadsLevel.paths.length, 2);
        assert.strictEquals(crossroadsLevel.minPlayers, 3);
        assert.strictEquals(crossroadsLevel.maxPlayers, 4);
        assert.strictEquals(crossroadsLevel.paths.length, 4);
    });

    it('give every path its own owner slot and id', () => {
        for (const level of coopLevels) {
            assert.deepEquals(
                level.paths.map((path) => path.ownerSlot),
                Array.from(level.paths.keys()),
            );
            assert.strictEquals(
                new Set(level.paths.map((path) => path.pathId)).size,
                level.paths.length,
            );
        }
    });

    it('end every path on the restaurant edge', () => {
        for (const level of coopLevels) {
            const {restaurant} = level;
            const half = restaurant.sizePx / 2;

            for (const path of level.paths) {
                const last = assertWrap.isDefined(path.waypoints.at(-1));
                const onVerticalEdge =
                    Math.abs(Math.abs(last.x - restaurant.x) - half) < 0.001 &&
                    Math.abs(last.y - restaurant.y) <= half;
                const onHorizontalEdge =
                    Math.abs(Math.abs(last.y - restaurant.y) - half) < 0.001 &&
                    Math.abs(last.x - restaurant.x) <= half;

                assert.isTrue(onVerticalEdge || onHorizontalEdge);
            }
        }
    });

    it('start every path at the world edge', () => {
        for (const level of coopLevels) {
            for (const path of level.paths) {
                const first = assertWrap.isDefined(path.waypoints[0]);

                assert.isTrue(
                    first.x === 0 ||
                        first.y === 0 ||
                        first.x === gameWorldSize.width ||
                        first.y === gameWorldSize.height,
                );
            }
        }
    });

    it('leave every player room to build that no other player can use', () => {
        for (const level of coopLevels) {
            for (const path of level.paths) {
                let exclusiveSpots = 0;

                for (let x = 0; x <= gameWorldSize.width; x += 40) {
                    for (let y = 0; y <= gameWorldSize.height; y += 40) {
                        function usable(slot: number) {
                            return canPlaceTower({
                                level,
                                towers: [],
                                point: {
                                    x,
                                    y,
                                },
                                slot,
                            }).valid;
                        }

                        if (
                            usable(path.ownerSlot) &&
                            level.paths.every((other) => {
                                return (
                                    other.ownerSlot === path.ownerSlot || !usable(other.ownerSlot)
                                );
                            })
                        ) {
                            exclusiveSpots++;
                        }
                    }
                }

                assert.isTrue(
                    exclusiveSpots >= 20,
                    `${level.levelId} ${path.pathId} has ${exclusiveSpots} private spots`,
                );
            }
        }
    });

    it('leave singleplayer maps at exactly one player', () => {
        for (const level of levels.filter((entry) => !coopLevels.includes(entry))) {
            assert.strictEquals(level.minPlayers, 1);
            assert.strictEquals(level.maxPlayers, 1);
            assert.isTrue(new Set(level.paths.map((path) => path.ownerSlot)).size === 1);
        }
    });
});

describe(getLevelsForPlayerCount.name, () => {
    function ids(count: number) {
        return getLevelsForPlayerCount(count).map((level) => level.levelId);
    }

    it('offers only single-player maps to one player', () => {
        assert.deepEquals(ids(1), [
            'winding-way',
            'double-back',
            'long-haul',
            'the-fork',
        ]);
    });

    it('offers Two Roads to exactly two players', () => {
        assert.deepEquals(ids(2), ['two-roads']);
    });

    it('offers Crossroads to three and four players', () => {
        assert.deepEquals(ids(3), ['crossroads']);
        assert.deepEquals(ids(4), ['crossroads']);
    });
});
