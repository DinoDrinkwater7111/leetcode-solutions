import assert from 'assert';

function matrixReshape_(mat: number[][], r: number, c: number): number[][] {
    const n = mat.length;
    const m = mat[0].length;
    if (r * c !== n * m) return mat;
    const result: number[][] = [];
    for (let i = 0; i < r; i++) result[i] = [];
    let row = 0;
    let col = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            result[row][col++] = mat[i][j];
            if (col === c) {
                row++;
                col = 0;
            }
        }
    }
    return result;
}

function matrixReshape(mat: number[][], r: number, c: number): number[][] {
    const result: number[][] = [];
    const n = mat.length;
    const m = mat[0].length;
    if (r * c !== n * m) return mat;
    for (let i = 0; i < r; i++) {
        result[i] = [];
        for (let j = 0; j < c; j++) {
            const flatInd = i * c + j;
            result[i][j] = mat[Math.floor(flatInd / m)][flatInd % m];
        }
    }
    return result;
}

function _matrixReshape(mat: number[][], r: number, c: number): number[][] {
    const result: number[][] = [];
    const n = mat.length;
    const m = mat[0].length;
    if (r * c !== n * m) return mat;
    let a = 0;
    let b = 0;
    for (let i = 0; i < r; i++) {
        result[i] = [];
        for (let j = 0; j < c; j++) {
            result[i][j] = mat[a][b];
            b++;
            if (b === n - 1) {
                b = 0;
                a++;
            }
        }
    }
    return result;
}

//TODO
function test() {
    let coins: number[] = [];
    let amount: number = 0;
    try {
        for (let i = 2; i < 1000; i++) {
            coins = Array(12)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * 10000) + 1);
            amount = Math.random() * 10 ** 4;
            coins = [3, 7, 405, 436];
            amount = 8839;
            assert.deepStrictEqual(coinChange(coins, amount), _coinChange(coins, amount));
            break;
        }
    } catch (e) {
        console.log(coins);
        console.log(amount);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
