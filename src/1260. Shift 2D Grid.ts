import assert from 'assert';

function shiftGrid(grid: number[][], k: number): number[][] {
    const m = grid.length;
    const n = grid[0].length;
    const N = m * n;
    k = k % N;
    if (N === 1) return grid;
    if (k === 0) return grid;
    function reverse(start: number, end: number) {
        const count_half = (end - start) / 2;
        for (let u = 0; u < count_half; u++) {
            const l_start = start + u;
            const i_start = Math.floor(l_start / n);
            const j_start = l_start % n;
            const l_end = end - u;
            const i_end = Math.floor(l_end / n);
            const j_end = l_end % n;
            const temp = grid[i_start][j_start];
            grid[i_start][j_start] = grid[i_end][j_end];
            grid[i_end][j_end] = temp;
        }
    }

    reverse(0, N - 1);
    reverse(0, k - 1);
    reverse(k, N - 1);

    return grid;
}

function _shiftGrid(grid: number[][], k: number): number[][] {
    const m = grid.length;
    const n = grid[0].length;
    function shift(grid: number[][]): number[][] {
        const result: number[][] = Array(m)
            .fill(undefined)
            .map((v) => []);
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (j === n - 1) {
                    if (i === m - 1) {
                        result[0][0] = grid[i][j];
                    } else {
                        result[i + 1][0] = grid[i][j];
                    }
                } else {
                    result[i][j + 1] = grid[i][j];
                }
            }
        }
        return result;
    }
    let result = grid;
    for (let i = 0; i < k; i++) {
        result = shift(result);
    }
    return result;
}

function test() {
    let grid: number[][] = [];
    let k: number = 0;
    try {
        for (let n = 1; n <= 50; n++) {
            for (let m = 1; m <= 50; m++) {
                for (let k = 0; k <= 100; k++) {
                    grid = Array(n)
                        .fill(undefined)
                        .map(() =>
                            Array(m)
                                .fill(0)
                                .map(() => Math.floor(Math.random() * 2000) - 1000)
                        );
                    assert.deepStrictEqual(shiftGrid(grid, k), _shiftGrid(grid, k));
                }
            }
        }
    } catch (e) {
        console.log(grid);
        console.log(k);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
