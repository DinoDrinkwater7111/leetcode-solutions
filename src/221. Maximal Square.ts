import assert from 'assert';

function maximalSquare(matrix: string[][]): number {
    const cache: number[] = matrix[0].map((v) => (v === '1' ? 1 : 0));
    let maxSide = Math.max(...cache);
    for (let row = 1; row < matrix.length; row++) {
        let temp = cache[0];
        cache[0] = matrix[row][0] === '1' ? 1 : 0;
        maxSide = Math.max(maxSide, cache[0]);
        for (let col = 1; col < matrix[row].length; col++) {
            if (matrix[row][col] === '1') {
                const temp2 = Math.min(cache[col], cache[col - 1], temp) + 1;
                temp = cache[col];
                cache[col] = temp2;
                maxSide = Math.max(maxSide, temp2);
            } else {
                cache[col] = 0;
            }
        }
    }
    return maxSide ** 2;
}

function _maximalSquare(matrix: string[][]): number {
    const M = matrix.length;
    const N = matrix[0].length;
    const cache: number[][] = [];
    for (let row = 0; row < M; row++) {
        cache[row] ??= [];
        for (let col = 0; col < N; col++) {
            cache[row][col] =
                (cache[row - 1]?.[col] ?? 0) +
                (cache[row][col - 1] ?? 0) -
                (cache[row - 1]?.[col - 1] ?? 0) +
                (matrix[row][col] === '1' ? 1 : 0);
        }
    }
    let maxSide = 0;
    for (let row = 0; row < M; row++) {
        for (let col = 0; col < N; col++) {
            const maxSquareSide = Math.min(M - row, N - col);
            if (maxSquareSide <= maxSide) continue;
            let checkedSide = maxSide;
            while (checkedSide < maxSquareSide) {
                const sideToCheck = checkedSide + 1;
                const row_rightBottom = row + sideToCheck - 1;
                const col_rightBottom = col + sideToCheck - 1;
                const area =
                    cache[row_rightBottom][col_rightBottom] -
                    (cache[row_rightBottom][col - 1] ?? 0) -
                    (cache[row - 1]?.[col_rightBottom] ?? 0) +
                    (cache[row - 1]?.[col - 1] ?? 0);
                if (area === sideToCheck ** 2) {
                    checkedSide = sideToCheck;
                } else {
                    break;
                }
            }
            maxSide = Math.max(maxSide, checkedSide);
        }
    }
    return maxSide ** 2;
}

function __maximalSquare(matrix: string[][]): number {
    const maxSideLength = Math.min(matrix.length, matrix[0].length);
    const cache: [number, number][] = [];
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] === '1') {
                cache.push([row, col]);
            }
        }
    }
    if (cache.length === 0) return 0;
    let checkedMaxSideLength = 1;
    while (checkedMaxSideLength < maxSideLength) {
        for (let i = 0; i < cache.length; i++) {
            const [row, col] = cache[i];
            let failed = false;
            for (let i = 0; i < checkedMaxSideLength + 1 && !failed; i++) {
                if (matrix[row + i]?.[col + checkedMaxSideLength] !== '1') failed = true;
            }
            for (let j = 0; j < checkedMaxSideLength && !failed; j++) {
                if (matrix[row + checkedMaxSideLength]?.[col + j] !== '1') failed = true;
            }
            if (failed) {
                cache[i] = cache[cache.length - 1];
                cache.pop();
                i--;
            }
        }
        if (cache.length === 0) {
            return checkedMaxSideLength ** 2;
        }

        checkedMaxSideLength++;
    }

    return checkedMaxSideLength ** 2;
}

function test() {
    let grid: string[][] = [];
    try {
        for (let i = 0; i < 100; i++) {
            for (let m = 1; m <= 10; m++) {
                for (let n = 1; n <= 10; n++) {
                    grid = Array(m)
                        .fill(undefined)
                        .map((row) =>
                            Array(n)
                                .fill(undefined)
                                .map(() => Math.round(Math.random() - 0.4).toString())
                        );
                    const result = maximalSquare(grid.map((row) => row.slice()));
                    const _result = _maximalSquare(grid.map((row) => row.slice()));
                    const __result = __maximalSquare(grid.map((row) => row.slice()));
                    assert.deepStrictEqual(result, _result);
                    assert.deepStrictEqual(_result, __result);
                }
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
