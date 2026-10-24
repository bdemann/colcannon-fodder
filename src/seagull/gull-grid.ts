import {type Coords} from '@augment-vir/common';
import {towerConfig} from '../config/game-config.js';
import {gullPathConfig} from '../config/gull-path-config.js';
import {gameWorldSize} from '../game-state/game-world.js';
import {getDistanceToPath, getPositionAlongPath, type LevelDefinition} from '../level/level.js';

/** A coarse walkable-cell grid. Cell `index` is `row * cols + col`. */
export type GullGrid = Readonly<{
    cols: number;
    rows: number;
    cellPx: number;
    /** 1 = a gull can never stand here (restaurant, chute, tower). */
    blocked: Uint8Array;
    /** 1 = a belt cell: walkable, but costs more and carries the gull. */
    belt: Uint8Array;
}>;

export type GridCell = Readonly<{col: number; row: number}>;

/** Builds the grid from the level and the current tower centers. Pure and deterministic. */
export function buildGullGrid({
    level,
    towers,
    cellPx = gullPathConfig.cellPx,
    gullRadiusPx = gullPathConfig.gullRadiusPx,
    towerRadiusPx = towerConfig.radius,
}: Readonly<{
    level: Readonly<LevelDefinition>;
    towers: ReadonlyArray<Readonly<Coords>>;
    cellPx?: number;
    gullRadiusPx?: number;
    towerRadiusPx?: number;
}>): GullGrid {
    const cols = Math.ceil(gameWorldSize.width / cellPx);
    const rows = Math.ceil(gameWorldSize.height / cellPx);
    const blocked = new Uint8Array(cols * rows);
    const belt = new Uint8Array(cols * rows);
    const {restaurant} = level;
    const restaurantReach = restaurant.sizePx / 2 + gullRadiusPx;
    const chutePoints = level.paths.flatMap((path) => {
        return (path.chutes ?? []).map((chute) => getPositionAlongPath(path, chute.distancePx));
    });

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = (col + 0.5) * cellPx;
            const y = (row + 0.5) * cellPx;
            const index = row * cols + col;

            if (
                level.paths.some((path) => {
                    return (
                        getDistanceToPath(path, {
                            x,
                            y,
                        }) <=
                        path.widthPx / 2
                    );
                })
            ) {
                belt[index] = 1;
            }
            if (
                (Math.abs(x - restaurant.x) < restaurantReach &&
                    Math.abs(y - restaurant.y) < restaurantReach) ||
                chutePoints.some((point) => {
                    return Math.hypot(point.x - x, point.y - y) < gullPathConfig.chuteBlockRadiusPx;
                }) ||
                towers.some((tower) => {
                    return Math.hypot(tower.x - x, tower.y - y) < towerRadiusPx + gullRadiusPx;
                })
            ) {
                blocked[index] = 1;
            }
        }
    }

    return {
        cols,
        rows,
        cellPx,
        blocked,
        belt,
    };
}

/** The cell containing a world point, clamped onto the grid (gulls spawn just off screen). */
export function getCellAt({
    grid,
    point,
}: Readonly<{grid: GullGrid; point: Readonly<Coords>}>): GridCell {
    return {
        col: Math.min(grid.cols - 1, Math.max(0, Math.floor(point.x / grid.cellPx))),
        row: Math.min(grid.rows - 1, Math.max(0, Math.floor(point.y / grid.cellPx))),
    };
}

/** The world position of a cell's center. */
export function getCellCenter({grid, cell}: Readonly<{grid: GullGrid; cell: GridCell}>): Coords {
    return {
        x: (cell.col + 0.5) * grid.cellPx,
        y: (cell.row + 0.5) * grid.cellPx,
    };
}

/** An escape goal: an unblocked, non-belt cell on the outer ring (belts would carry it away). */
export function isWalkableEdge({grid, cell}: Readonly<{grid: GullGrid; cell: GridCell}>): boolean {
    const onEdge =
        cell.col === 0 ||
        cell.row === 0 ||
        cell.col === grid.cols - 1 ||
        cell.row === grid.rows - 1;
    const index = cell.row * grid.cols + cell.col;

    return onEdge && grid.blocked[index] === 0 && grid.belt[index] === 0;
}

/** Cells to the nearest outer-ring cell; never more than the real cost, so A* stays optimal. */
export function distanceToEdgeCells({
    grid,
    cell,
}: Readonly<{grid: GullGrid; cell: GridCell}>): number {
    return Math.min(cell.col, cell.row, grid.cols - 1 - cell.col, grid.rows - 1 - cell.row);
}

let cached: {level: unknown; key: string; grid: GullGrid} | undefined;

/**
 * Keeps the shared grid in step with the towers. Called every frame by the spawner (which can see
 * towers without an import cycle); the grid is rebuilt only when the level or the set of tower
 * positions changes (placed, sold or destroyed).
 */
export function refreshGullGrid({
    level,
    towers,
}: Readonly<{
    level: Readonly<LevelDefinition>;
    towers: ReadonlyArray<Readonly<Coords>>;
}>): GullGrid {
    const key = towers
        .map((tower) => `${tower.x},${tower.y}`)
        .sort()
        .join(';');

    if (cached?.level !== level || cached.key !== key) {
        cached = {
            level,
            key,
            grid: buildGullGrid({
                level,
                towers,
            }),
        };
    }

    return cached.grid;
}

/** The grid last built by `refreshGullGrid` for this level (towerless if none was built yet). */
export function getGullGrid(level: Readonly<LevelDefinition>): GullGrid {
    if (cached?.level === level) {
        return cached.grid;
    }

    return refreshGullGrid({
        level,
        towers: [],
    });
}
