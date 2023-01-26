import assert from 'assert';

class NumMatrix {
    private readonly matrix: number[][];
    private readonly sqareSum_00_ij: number[][] = [];
    constructor(matrix: number[][]) {
        this.matrix = matrix;
    }

    sumRegion(row1: number, col1: number, row2: number, col2: number): number {
        if (row1 === 0 && col1 === 0) {
            if (row2 < 0 || col2 < 0) return 0;
            let cache = this.sqareSum_00_ij[row2]?.[col2];
            if (cache === undefined) {
                cache =
                    this.sumRegion(0, 0, row2 - 1, col2) +
                    this.sumRegion(0, 0, row2, col2 - 1) -
                    this.sumRegion(0, 0, row2 - 1, col2 - 1) +
                    this.matrix[row2][col2];
                this.sqareSum_00_ij[row2] ??= [];
                this.sqareSum_00_ij[row2][col2] = cache;
            }
            return cache;
        } else {
            return (
                this.sumRegion(0, 0, row2, col2) -
                this.sumRegion(0, 0, row1 - 1, col2) -
                this.sumRegion(0, 0, row2, col1 - 1) +
                this.sumRegion(0, 0, row1 - 1, col1 - 1)
            );
        }
    }
}

class _NumMatrix {
    private readonly matrix: number[][];
    private readonly rowSum_0_X: number[][] = [];
    constructor(matrix: number[][]) {
        this.matrix = matrix;
    }

    sumRegion(row1: number, col1: number, row2: number, col2: number): number {
        let sum = 0;
        for (let row = row1; row <= row2; row++) {
            sum += this.sumRow(row, col1, col2);
        }
        return sum;
    }

    private sumRow(row: number, i: number, j: number): number {
        if (i > j) return 0;
        if (i === j) return this.matrix[row][i];
        if (i === 0) {
            let cache = this.rowSum_0_X[row]?.[j];
            if (cache === undefined) {
                cache = this.sumRow(row, i, j - 1) + this.matrix[row][j];
                this.rowSum_0_X[row] ??= [];
                this.rowSum_0_X[row][j] = cache;
            }
            return cache;
        } else {
            return this.sumRow(row, 0, j) - this.sumRow(row, 0, i - 1);
        }
    }
}

class __NumMatrix {
    private readonly matrix: number[][];
    private readonly rowPartialSum: number[][][];
    constructor(matrix: number[][]) {
        this.matrix = matrix;
        this.rowPartialSum = [];
    }

    sumRegion(row1: number, col1: number, row2: number, col2: number): number {
        let sum = 0;
        for (let i = row1; i <= row2; i++) {
            let rowSum = this.rowPartialSum[i]?.[col1]?.[col2];
            if (rowSum === undefined) {
                rowSum = 0;
                for (let j = col1; j <= col2; j++) {
                    rowSum += this.matrix[i][j];
                }
                this.rowPartialSum[i] ??= [];
                this.rowPartialSum[i][col1] ??= [];
                this.rowPartialSum[i][col1][col2] = rowSum;
            }
            sum += rowSum;
        }
        return sum;
    }
}

class ___NumMatrix {
    private readonly matrix: number[][];
    constructor(matrix: number[][]) {
        this.matrix = matrix;
    }

    sumRegion(row1: number, col1: number, row2: number, col2: number): number {
        let sum = 0;
        for (let i = row1; i <= row2; i++) {
            for (let j = col1; j <= col2; j++) {
                sum += this.matrix[i][j];
            }
        }
        return sum;
    }
}

function test() {
    let matrix: number[][] = [];
    let rects: [number, number, number, number][] = [];
    try {
        for (let m = 1; m <= 10; m++) {
            for (let n = 1; n <= 10; n++) {
                matrix = Array(m)
                    .fill(undefined)
                    .map(() =>
                        Array(n)
                            .fill(undefined)
                            .map(() => Math.floor(Math.random() * 100))
                    );
                rects = Array(5)
                    .fill(undefined)
                    .map(() => {
                        const lr = Math.floor(Math.random() * m);
                        const lc = Math.floor(Math.random() * n);
                        const rr = Math.min(m - 1, lr + Math.floor(Math.random() * m));
                        const rc = Math.min(n - 1, lc + Math.floor(Math.random() * n));
                        return [lr, lc, rr, rc];
                    });
                const numM = new NumMatrix(matrix.map((row) => row.slice()));
                const _numM = new _NumMatrix(matrix.map((row) => row.slice()));
                const __numM = new __NumMatrix(matrix.map((row) => row.slice()));
                const ___numM = new ___NumMatrix(matrix.map((row) => row.slice()));
                for (const rect of rects) {
                    const result = numM.sumRegion(...rect);
                    const _result = _numM.sumRegion(...rect);
                    const __result = __numM.sumRegion(...rect);
                    const ___result = ___numM.sumRegion(...rect);
                    assert.strictEqual(result, _result);
                    assert.strictEqual(_result, __result);
                    assert.strictEqual(__result, ___result);
                }
            }
        }
    } catch (e) {
        console.log(matrix);
        console.log(rects);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
