import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {
    buildGullGrid,
    distanceToEdgeCells,
    getCellAt,
    getCellCenter,
    isWalkableEdge,
    refreshGullGrid,
    type GridCell,
    type GullGrid,
} from './gull-grid.js';
import {testLevel} from './gull-test-level.js';

function blockedAt({grid, cell}: Readonly<{grid: GullGrid; cell: GridCell}>) {
    return grid.blocked[cell.row * grid.cols + cell.col];
}

function beltAt({grid, cell}: Readonly<{grid: GullGrid; cell: GridCell}>) {
    return grid.belt[cell.row * grid.cols + cell.col];
}

const openGrid = buildGullGrid({
    level: testLevel,
    towers: [],
});
const towerGrid = buildGullGrid({
    level: testLevel,
    towers: [
        {
            x: 600,
            y: 700,
        },
    ],
});

describe(buildGullGrid.name, () => {
    it('covers the world in 40 px cells', () => {
        assert.strictEquals(towerGrid.cols, 48);
        assert.strictEquals(towerGrid.rows, 27);
    });

    it('marks belt cells as walkable but not blocked', () => {
        const cell = {
            col: 5,
            row: 10,
        };

        assert.strictEquals(
            beltAt({
                grid: towerGrid,
                cell,
            }),
            1,
        );
        assert.strictEquals(
            blockedAt({
                grid: towerGrid,
                cell,
            }),
            0,
        );
        assert.strictEquals(
            beltAt({
                grid: towerGrid,
                cell: {
                    col: 5,
                    row: 15,
                },
            }),
            0,
        );
    });

    it('blocks the restaurant, a chute and towers', () => {
        assert.strictEquals(
            blockedAt({
                grid: towerGrid,
                cell: {
                    col: 25,
                    row: 10,
                },
            }),
            1,
        );
        assert.strictEquals(
            blockedAt({
                grid: towerGrid,
                cell: {
                    col: 10,
                    row: 10,
                },
            }),
            1,
        );
        assert.strictEquals(
            blockedAt({
                grid: towerGrid,
                cell: {
                    col: 15,
                    row: 17,
                },
            }),
            1,
        );
        assert.strictEquals(
            blockedAt({
                grid: towerGrid,
                cell: {
                    col: 15,
                    row: 21,
                },
            }),
            0,
        );
    });

    it('is rebuilt without a tower that was sold', () => {
        assert.strictEquals(
            blockedAt({
                grid: openGrid,
                cell: {
                    col: 15,
                    row: 17,
                },
            }),
            0,
        );
    });
});

describe(getCellAt.name, () => {
    it('maps points to cells and back', () => {
        const cell = getCellAt({
            grid: openGrid,
            point: {
                x: 85,
                y: 125,
            },
        });

        assert.deepEquals(cell, {
            col: 2,
            row: 3,
        });
        assert.deepEquals(
            getCellCenter({
                grid: openGrid,
                cell,
            }),
            {
                x: 100,
                y: 140,
            },
        );
    });

    it('clamps points outside the world onto the grid', () => {
        assert.deepEquals(
            getCellAt({
                grid: openGrid,
                point: {
                    x: -40,
                    y: 2000,
                },
            }),
            {
                col: 0,
                row: 26,
            },
        );
    });
});

describe(isWalkableEdge.name, () => {
    it('accepts grass on the ring but not belt cells or the interior', () => {
        assert.isTrue(
            isWalkableEdge({
                grid: openGrid,
                cell: {
                    col: 0,
                    row: 2,
                },
            }),
        );
        assert.isFalse(
            isWalkableEdge({
                grid: openGrid,
                cell: {
                    col: 0,
                    row: 10,
                },
            }),
        );
        assert.isFalse(
            isWalkableEdge({
                grid: openGrid,
                cell: {
                    col: 5,
                    row: 5,
                },
            }),
        );
    });

    it('measures the distance to the ring', () => {
        assert.strictEquals(
            distanceToEdgeCells({
                grid: openGrid,
                cell: {
                    col: 5,
                    row: 3,
                },
            }),
            3,
        );
    });
});

describe('refreshGullGrid', () => {
    const towerA = {
        x: 400,
        y: 300,
    };
    const towerB = {
        x: 700,
        y: 500,
    };

    it('reuses the grid while the towers stay put, in any order', () => {
        const first = refreshGullGrid({
            level: testLevel,
            towers: [
                towerA,
                towerB,
            ],
        });

        assert.strictEquals(
            refreshGullGrid({
                level: testLevel,
                towers: [
                    towerA,
                    towerB,
                ],
            }),
            first,
        );
        assert.strictEquals(
            refreshGullGrid({
                level: testLevel,
                towers: [
                    towerB,
                    towerA,
                ],
            }),
            first,
        );
        assert.strictEquals(
            refreshGullGrid({
                level: testLevel,
                towers: [
                    towerA,
                    towerB,
                ],
            }),
            first,
        );
    });

    it('rebuilds when a tower is added, moved or removed', () => {
        const first = refreshGullGrid({
            level: testLevel,
            towers: [
                towerA,
                towerB,
            ],
        });
        const added = refreshGullGrid({
            level: testLevel,
            towers: [
                towerA,
                towerB,
                {
                    x: 900,
                    y: 200,
                },
            ],
        });
        const moved = refreshGullGrid({
            level: testLevel,
            towers: [
                towerA,
                {
                    x: 701,
                    y: 500,
                },
            ],
        });
        const removed = refreshGullGrid({
            level: testLevel,
            towers: [towerA],
        });

        assert.notStrictEquals(added, first);
        assert.notStrictEquals(moved, added);
        assert.notStrictEquals(removed, moved);
        assert.deepEquals(
            removed.blocked,
            buildGullGrid({
                level: testLevel,
                towers: [towerA],
            }).blocked,
        );
    });
});
