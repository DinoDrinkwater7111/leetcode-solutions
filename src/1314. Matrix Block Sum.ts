import assert from 'assert';

function matrixBlockSum(mat: number[][], k: number): number[][] {
    const cache: number[][] = [];
    for (let row = 0; row < mat.length; row++) {
        cache[row] = [];
        cache[row][0] = 0;
        for (let col = 0; col <= k; col++) {
            cache[row][0] += mat[row][col] ?? 0;
        }
        for (let col = 1; col < mat[row].length; col++) {
            cache[row][col] = cache[row][col - 1] - (mat[row][col - k - 1] ?? 0) + (mat[row][col + k] ?? 0);
        }
    }
    const result: number[][] = [];
    result[0] = [];
    for (let col = 0; col < mat[0].length; col++) {
        result[0][col] = 0;
        for (let i = 0; i <= k; i++) {
            result[0][col] += cache[i]?.[col] ?? 0;
        }
    }
    for (let row = 1; row < cache.length; row++) {
        result[row] = [];
        for (let col = 0; col < cache[row].length; col++) {
            result[row][col] = result[row - 1][col] - (cache[row - k - 1]?.[col] ?? 0) + (cache[row + k]?.[col] ?? 0);
        }
    }

    return result;
}

function _matrixBlockSum(mat: number[][], k: number): number[][] {
    const cache: number[][] = [];
    for (let row = 0; row < mat.length; row++) {
        cache[row] = [];
        cache[row][0] = 0;
        for (let col = 0; col <= k; col++) {
            cache[row][0] += mat[row][col] ?? 0;
        }
        for (let col = 1; col < mat[row].length; col++) {
            cache[row][col] = cache[row][col - 1] - (mat[row][col - k - 1] ?? 0) + (mat[row][col + k] ?? 0);
        }
    }
    const result: number[][] = [];
    for (let row = 0; row < mat.length; row++) {
        result[row] = [];
        for (let col = 0; col < mat[row].length; col++) {
            result[row][col] = 0;
            for (let i = row - k; i <= row + k; i++) {
                result[row][col] += cache[i]?.[col] ?? 0;
            }
        }
    }

    return result;
}

function __matrixBlockSum(mat: number[][], k: number): number[][] {
    let result: number[][] = [];
    for (let row = 0; row < mat.length; row++) {
        result[row] = [];
        for (let col = 0; col < mat[row].length; col++) {
            result[row][col] = 0;
            for (let i = row - k; i <= row + k; i++) {
                for (let j = col - k; j <= col + k; j++) {
                    result[row][col] += mat[i]?.[j] ?? 0;
                }
            }
        }
    }
    return result;
}

function test() {
    let mat: number[][] = [];
    let k: number = 0;
    try {
        for (let n = 1; n <= 7; n++) {
            mat = Array(n)
                .fill(undefined)
                .map(() =>
                    Array(n)
                        .fill(undefined)
                        .map(() => Math.floor(Math.random() * 100))
                );
            k = Math.floor(Math.random() * 3) + 1;
            const result = matrixBlockSum(
                mat.map((v) => v.slice()),
                k
            );
            const _result = _matrixBlockSum(
                mat.map((v) => v.slice()),
                k
            );
            const __result = __matrixBlockSum(
                mat.map((v) => v.slice()),
                k
            );

            assert.deepStrictEqual(result, _result);
            assert.deepStrictEqual(_result, __result);
        }
    } catch (e) {
        console.log(mat);
        console.log(k);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
