import assert from 'assert';

function uniquePaths(m: number, n: number): number {
    const cache = Array(m).fill(1);
    for (let col = 1; col < n; col++) {
        for (let row = 1; row < cache.length; row++) {
            cache[row] += cache[row - 1];
        }
    }
    return cache[m - 1];
}

function _uniquePaths(m: number, n: number): number {
    function uniquePathsEx(currentRow: number, currentCol: number): number {
        if (currentRow >= m || currentCol >= n) return 0;
        if (currentRow === m - 1 && currentCol === n - 1) return currentRow === m - 1 ? 1 : 0;
        return uniquePathsEx(currentRow + 1, currentCol) + uniquePathsEx(currentRow, currentCol + 1);
    }

    return uniquePathsEx(0, 0);
}

function test() {
    let m: number = 0;
    let n: number = 0;
    try {
        for (m = 1; m <= 10; m++) {
            for (n = 1; n <= 10; n++) {
                assert.deepStrictEqual(uniquePaths(m, n), _uniquePaths(m, n));
            }
        }
    } catch (e) {
        console.log(m);
        console.log(n);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
