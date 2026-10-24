import {gullPathConfig} from '../config/gull-path-config.js';
import {type GridCell, type GullGrid} from './gull-grid.js';

/** Neighbor order is fixed (orthogonal first) so ties always break the same way. */
const neighborOffsets = [
    {
        dc: 0,
        dr: -1,
    },
    {
        dc: 1,
        dr: 0,
    },
    {
        dc: 0,
        dr: 1,
    },
    {
        dc: -1,
        dr: 0,
    },
    {
        dc: 1,
        dr: -1,
    },
    {
        dc: 1,
        dr: 1,
    },
    {
        dc: -1,
        dr: 1,
    },
    {
        dc: -1,
        dr: -1,
    },
] as const;

/** Octile distance in cells: an admissible heuristic when the cheapest step costs 1. */
export function octileDistance({from, to}: Readonly<{from: GridCell; to: GridCell}>): number {
    const dc = Math.abs(from.col - to.col);
    const dr = Math.abs(from.row - to.row);

    return Math.max(dc, dr) + (Math.SQRT2 - 1) * Math.min(dc, dr);
}

/** A binary min-heap on (f, seq) so equal scores pop in insertion order. */
class OpenSet {
    protected readonly items: Array<{f: number; seq: number; index: number}> = [];
    protected seq = 0;

    protected less({a, b}: Readonly<{a: number; b: number}>) {
        const left = this.items[a];
        const right = this.items[b];
        if (!left || !right) {
            return false;
        }

        return left.f < right.f || (left.f === right.f && left.seq < right.seq);
    }

    protected swap({a, b}: Readonly<{a: number; b: number}>) {
        const left = this.items[a];
        const right = this.items[b];
        if (left && right) {
            this.items[a] = right;
            this.items[b] = left;
        }
    }

    public push({index, f}: Readonly<{index: number; f: number}>) {
        this.items.push({
            f,
            seq: this.seq++,
            index,
        });
        let child = this.items.length - 1;
        while (child > 0) {
            const parent = (child - 1) >> 1;
            if (
                !this.less({
                    a: child,
                    b: parent,
                })
            ) {
                break;
            }
            this.swap({
                a: child,
                b: parent,
            });
            child = parent;
        }
    }

    public pop(): number | undefined {
        const top = this.items[0];
        const last = this.items.pop();
        if (!top || !last) {
            return undefined;
        }
        if (this.items.length > 0) {
            this.items[0] = last;
            let parent = 0;
            for (;;) {
                const left = parent * 2 + 1;
                const right = left + 1;
                let smallest = parent;
                if (
                    left < this.items.length &&
                    this.less({
                        a: left,
                        b: smallest,
                    })
                ) {
                    smallest = left;
                }
                if (
                    right < this.items.length &&
                    this.less({
                        a: right,
                        b: smallest,
                    })
                ) {
                    smallest = right;
                }
                if (smallest === parent) {
                    break;
                }
                this.swap({
                    a: parent,
                    b: smallest,
                });
                parent = smallest;
            }
        }

        return top.index;
    }
}

/**
 * A* over the grid with 8-way moves and no corner cutting. Belt cells cost `beltCellCost`, grass 1.
 * The start and any goal cell are walkable even if blocked, so a gull can leave a blocked cell and
 * reach a potato sitting on a chute. Returns the cells from the one after `start` up to the goal,
 * `[]` if the start is already a goal, or `undefined` if no goal is reachable.
 */
export function findGullPath({
    grid,
    start,
    isGoal,
    heuristic,
    beltCellCost = gullPathConfig.beltCellCost,
}: Readonly<{
    grid: GullGrid;
    start: GridCell;
    isGoal: (cell: GridCell) => boolean;
    /** Must never overestimate the cost to the nearest goal. */
    heuristic: (cell: GridCell) => number;
    beltCellCost?: number;
}>): GridCell[] | undefined {
    const {cols, rows} = grid;
    const startIndex = start.row * cols + start.col;
    const cost = new Float64Array(cols * rows).fill(Infinity);
    const cameFrom = new Int32Array(cols * rows).fill(-1);
    const closed = new Uint8Array(cols * rows);
    const open = new OpenSet();
    cost[startIndex] = 0;
    open.push({
        index: startIndex,
        f: heuristic(start),
    });

    function blockedAt({col, row}: Readonly<{col: number; row: number}>) {
        return grid.blocked[row * cols + col] === 1;
    }

    for (let current = open.pop(); current != undefined; current = open.pop()) {
        if (closed[current]) {
            continue;
        }
        closed[current] = 1;
        const col = current % cols;
        const row = Math.floor(current / cols);

        if (
            isGoal({
                col,
                row,
            })
        ) {
            const path: GridCell[] = [];
            for (let at = current; at !== startIndex; at = cameFrom[at] ?? startIndex) {
                path.push({
                    col: at % cols,
                    row: Math.floor(at / cols),
                });
            }

            return path.reverse();
        }

        for (const {dc, dr} of neighborOffsets) {
            const nextCol = col + dc;
            const nextRow = row + dr;
            if (nextCol < 0 || nextRow < 0 || nextCol >= cols || nextRow >= rows) {
                continue;
            }
            const next = nextRow * cols + nextCol;
            const nextCell = {
                col: nextCol,
                row: nextRow,
            };
            if (
                closed[next] ||
                (blockedAt({
                    col: nextCol,
                    row: nextRow,
                }) &&
                    !isGoal(nextCell))
            ) {
                continue;
            }
            const diagonal = dc !== 0 && dr !== 0;
            if (
                diagonal &&
                (blockedAt({
                    col: col + dc,
                    row,
                }) ||
                    blockedAt({
                        col,
                        row: row + dr,
                    }))
            ) {
                continue;
            }

            const stepCost = (grid.belt[next] ? beltCellCost : 1) * (diagonal ? Math.SQRT2 : 1);
            const nextCost = (cost[current] ?? Infinity) + stepCost;
            if (nextCost < (cost[next] ?? Infinity)) {
                cost[next] = nextCost;
                cameFrom[next] = current;
                open.push({
                    index: next,
                    f: nextCost + heuristic(nextCell),
                });
            }
        }
    }

    return undefined;
}
