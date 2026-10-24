import {assert, assertWrap} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {buildGullGrid, type GridCell, type GullGrid} from './gull-grid.js';
import {findGullPath, octileDistance} from './gull-pathfinding.js';
import {shortBeltLevel, testLevel} from './gull-test-level.js';

function pathTo({grid, start, goal}: Readonly<{grid: GullGrid; start: GridCell; goal: GridCell}>) {
    return findGullPath({
        grid,
        start,
        isGoal(cell) {
            return cell.col === goal.col && cell.row === goal.row;
        },
        heuristic(cell) {
            return octileDistance({
                from: cell,
                to: goal,
            });
        },
    });
}

function isBelt({grid, cell}: Readonly<{grid: GullGrid; cell: GridCell}>) {
    return grid.belt[cell.row * grid.cols + cell.col] === 1;
}

function isBlocked({grid, cell}: Readonly<{grid: GullGrid; cell: GridCell}>) {
    return grid.blocked[cell.row * grid.cols + cell.col] === 1;
}

const openGrid = buildGullGrid({
    level: testLevel,
    towers: [],
});
const towerGrid = buildGullGrid({
    level: testLevel,
    towers: [
        {
            x: 300,
            y: 700,
        },
    ],
});

describe(findGullPath.name, () => {
    it('goes straight across open grass', () => {
        const path = assertWrap.isDefined(
            pathTo({
                grid: openGrid,
                start: {
                    col: 0,
                    row: 20,
                },
                goal: {
                    col: 5,
                    row: 20,
                },
            }),
        );

        assert.strictEquals(path.length, 5);
        assert.deepEquals(path.at(-1), {
            col: 5,
            row: 20,
        });
    });

    it('returns an empty route when already at the goal', () => {
        assert.deepEquals(
            pathTo({
                grid: openGrid,
                start: {
                    col: 3,
                    row: 3,
                },
                goal: {
                    col: 3,
                    row: 3,
                },
            }),
            [],
        );
    });

    it('walks around a tower instead of through it', () => {
        const path = assertWrap.isDefined(
            pathTo({
                grid: towerGrid,
                start: {
                    col: 2,
                    row: 17,
                },
                goal: {
                    col: 12,
                    row: 17,
                },
            }),
        );

        assert.isTrue(path.length >= 10);
        assert.isFalse(
            path.some((cell) => {
                return isBlocked({
                    grid: towerGrid,
                    cell,
                });
            }),
        );
    });

    it('hops across a belt when going around costs more', () => {
        // The belt runs from the west edge to the restaurant, so the detour is very long.
        const path = assertWrap.isDefined(
            pathTo({
                grid: openGrid,
                start: {
                    col: 5,
                    row: 20,
                },
                goal: {
                    col: 5,
                    row: 3,
                },
            }),
        );

        assert.isTrue(
            path.some((cell) => {
                return isBelt({
                    grid: openGrid,
                    cell,
                });
            }),
        );
    });

    it('walks around a belt end when that is cheaper than hopping', () => {
        const grid = buildGullGrid({
            level: shortBeltLevel,
            towers: [],
        });
        const path = assertWrap.isDefined(
            pathTo({
                grid,
                start: {
                    col: 3,
                    row: 12,
                },
                goal: {
                    col: 3,
                    row: 7,
                },
            }),
        );

        assert.isFalse(
            path.some((cell) => {
                return isBelt({
                    grid,
                    cell,
                });
            }),
        );
    });

    it('returns undefined when the goal is walled in', () => {
        const walled: GullGrid = {
            ...openGrid,
            blocked: openGrid.blocked.map((unused, index) => {
                const col = index % openGrid.cols;
                const row = Math.floor(index / openGrid.cols);
                const ring = Math.abs(col - 30) <= 1 && Math.abs(row - 20) <= 1;

                return ring && !(col === 30 && row === 20) ? 1 : unused * 0;
            }),
        };

        assert.isUndefined(
            pathTo({
                grid: walled,
                start: {
                    col: 5,
                    row: 22,
                },
                goal: {
                    col: 30,
                    row: 20,
                },
            }),
        );
    });

    it('is deterministic', () => {
        function run() {
            return pathTo({
                grid: towerGrid,
                start: {
                    col: 2,
                    row: 17,
                },
                goal: {
                    col: 12,
                    row: 17,
                },
            });
        }

        assert.deepEquals(run(), run());
    });
});
