import assert from 'assert';

function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
    const cache: number[] = [];
    for (let row = 0; row < obstacleGrid.length; row++) {
        cache[row] = Math.min(cache[row - 1] ?? 1, obstacleGrid[row][0] === 0 ? 1 : 0);
    }
    for (let col = 1; col < obstacleGrid[0].length; col++) {
        cache[0] = Math.min(cache[0], obstacleGrid[0][col] === 0 ? 1 : 0);
        for (let row = 1; row < cache.length; row++) {
            if (obstacleGrid[row][col] === 1) {
                cache[row] = 0;
            } else {
                cache[row] += cache[row - 1];
            }
        }
    }
    return cache[cache.length - 1];
}

function _uniquePathsWithObstacles(obstacleGrid: number[][]): number {
    function uniquePathsEx(currentRow: number, currentCol: number): number {
        if (obstacleGrid[currentRow]?.[currentCol] === undefined) return 0;
        if (obstacleGrid[currentRow][currentCol] === 1) return 0;
        if (currentRow === obstacleGrid.length - 1 && currentCol === obstacleGrid[currentRow].length - 1) return 1;
        return uniquePathsEx(currentRow + 1, currentCol) + uniquePathsEx(currentRow, currentCol + 1);
    }

    return uniquePathsEx(0, 0);
}

function test() {
    let obstacleGrid: number[][] = [];
    try {
        for (let m = 1; m <= 10; m++) {
            for (let n = 1; n <= 10; n++) {
                obstacleGrid = Array(m)
                    .fill(undefined)
                    .map((row) =>
                        Array(n)
                            .fill(undefined)
                            .map(() => Math.round(Math.random() - 0.4))
                    );
                assert.deepStrictEqual(
                    uniquePathsWithObstacles(obstacleGrid.map((row) => row.slice())),
                    _uniquePathsWithObstacles(obstacleGrid.map((row) => row.slice()))
                );
            }
        }
    } catch (e) {
        console.log(obstacleGrid);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
