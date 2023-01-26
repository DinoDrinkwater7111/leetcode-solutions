import assert from 'assert';

function minFallingPathSum(matrix: number[][]): number {
    let cache = matrix[0];
    for (let row = 1; row < matrix.length; row++) {
        const _cache: number[] = [];
        for (let col = 0; col < matrix[row].length; col++) {
            _cache[col] =
                matrix[row][col] +
                Math.min(
                    cache[col - 1] ?? Number.POSITIVE_INFINITY,
                    cache[col],
                    cache[col + 1] ?? Number.POSITIVE_INFINITY
                );
        }
        cache = _cache;
    }

    return Math.min(...cache);
}

function _minFallingPathSum(matrix: number[][]): number {
    for (let row = 1; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            matrix[row][col] += Math.min(
                matrix[row - 1][col - 1] ?? Number.POSITIVE_INFINITY,
                matrix[row - 1][col],
                matrix[row - 1][col + 1] ?? Number.POSITIVE_INFINITY
            );
        }
    }

    return Math.min(...matrix[matrix.length - 1]);
}

function test() {
    let matrix: number[][] = [];
    try {
        for (let n = 1; n <= 10; n++) {
            matrix = Array(n)
                .fill(undefined)
                .map(() =>
                    Array(n)
                        .fill(undefined)
                        .map(() => Math.floor(Math.random() * 200) - 100)
                );
            assert.deepStrictEqual(
                minFallingPathSum(matrix.map((v) => v.slice())),
                _minFallingPathSum(matrix.map((v) => v.slice()))
            );
        }
    } catch (e) {
        console.log(matrix);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
