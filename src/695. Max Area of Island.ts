import assert from 'assert';

function maxAreaOfIsland(grid: number[][]): number {
    let result = 0;
    const checked: boolean[][] = grid.map(() => []);

    function findIslandArea(row: number, col: number): number {
        if (grid[row]?.[col] === undefined) return 0;
        if (checked[row][col]) return 0;
        checked[row][col] = true;
        if (grid[row][col] === 0) return 0;
        if (grid[row][col] === 1) {
            return (
                findIslandArea(row + 1, col) +
                findIslandArea(row - 1, col) +
                findIslandArea(row, col + 1) +
                findIslandArea(row, col - 1) +
                1
            );
        }
        throw new Error();
    }

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (checked[row][col]) continue;
            result = Math.max(findIslandArea(row, col), result);
            checked[row][col] = true;
        }
    }

    return result;
}

function _maxAreaOfIsland(grid: number[][]): number {
    let result = 0;
    const checked: boolean[][] = grid.map(() => []);

    function findIslandArea(row: number, col: number): number {
        if (grid[row]?.[col] === undefined) return 0;
        if (checked[row][col]) return 0;
        checked[row][col] = true;
        if (grid[row][col] === 0) return 0;
        if (grid[row][col] === 1) {
            return (
                findIslandArea(row + 1, col) +
                findIslandArea(row - 1, col) +
                findIslandArea(row, col + 1) +
                findIslandArea(row, col - 1) +
                1
            );
        }
        throw new Error();
    }

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (checked[row][col]) continue;
            result = Math.max(findIslandArea(row, col), result);
            checked[row][col] = true;
        }
    }

    return result;
}

function test() {
    let grid: number[][] = [];
    try {
        for (let n = 1; n <= 50; n++) {
            for (let m = 1; m <= 50; m++) {
                grid = new Array(n).fill(undefined).map(() => {
                    return new Array(m).fill(undefined).map(() => Math.floor(Math.random() * 2));
                });
                assert.deepStrictEqual(
                    maxAreaOfIsland(grid.map((v) => v.slice())),
                    _maxAreaOfIsland(grid.map((v) => v.slice()))
                );
            }
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(grid);
            console.log(e.message);
        } else {
            console.log(grid);
            console.error(e);
        }
    }
}
test();
