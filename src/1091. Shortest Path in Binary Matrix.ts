import assert from "assert";

function shortestPathBinaryMatrix(grid: number[][]): number {
    const n = grid.length;

    const adjOffsets = [
        [-1, -1],
        [0, -1],
        [-1, 0],
        [1, -1],
        [1, 0],
        [1, 1],
        [0, 1],
        [-1, 1]
    ];

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                grid[i][j] = undefined as never;
            } else {
                grid[i][j] = Number.POSITIVE_INFINITY;
            }
        }
    }

    grid[0][0] = grid[0][0] === undefined ? (undefined as never) : 1;
    let candidates: [number, number][] = [[0, 0]];
    let candidates_: [number, number][] = [];

    function updateAdj(i: number, j: number): void {
        for (const offset of adjOffsets) {
            const i_ = i + offset[0];
            const j_ = j + offset[1];
            if (grid[i_]?.[j_] === undefined) continue;
            if (grid[i][j] + 1 < grid[i_][j_]) {
                grid[i_][j_] = grid[i][j] + 1;
                candidates_.push([i_, j_]);
            }
        }
    }

    while (candidates.length > 0) {
        for (const candidate of candidates) {
            updateAdj(...candidate);
        }
        candidates = candidates_;
        candidates_ = [];
    }

    if (grid[n - 1][n - 1] === Number.POSITIVE_INFINITY || grid[n - 1][n - 1] === undefined) {
        return -1;
    } else {
        return grid[n - 1][n - 1];
    }
}


//TODO