import assert from 'assert';

function minPathSum(grid: number[][]): number {
    const cache: number[] = [grid[0][0]];
    for (let row = 1; row < grid.length; row++) {
        cache[row] = cache[row - 1] + grid[row][0];
    }
    for (let col = 1; col < grid[0].length; col++) {
        cache[0] += grid[0][col];
        for (let row = 1; row < cache.length; row++) {
            cache[row] = Math.min(cache[row - 1], cache[row]) + grid[row][col];
        }
    }
    return cache[cache.length - 1];
}

function _minPathSum(grid: number[][]): number {
    function minPathSumEx(currentRow: number, currentCol: number): number {
        if (grid[currentRow]?.[currentCol] === undefined) return Number.POSITIVE_INFINITY;
        if (currentRow === grid.length - 1 && currentCol === grid[currentRow].length - 1)
            return grid[currentRow][currentCol];
        return (
            Math.min(minPathSumEx(currentRow + 1, currentCol), minPathSumEx(currentRow, currentCol + 1)) +
            grid[currentRow][currentCol]
        );
    }

    return minPathSumEx(0, 0);
}

function test() {
    let grid: number[][] = [];
    try {
        for (let m = 1; m <= 10; m++) {
            for (let n = 1; n <= 10; n++) {
                grid = Array(m)
                    .fill(undefined)
                    .map((row) =>
                        Array(n)
                            .fill(undefined)
                            .map(() => Math.round(Math.random() - 0.4))
                    );
                assert.deepStrictEqual(
                    minPathSum(grid.map((row) => row.slice())),
                    _minPathSum(grid.map((row) => row.slice()))
                );
            }
        }
    } catch (e) {
        console.log(grid);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
