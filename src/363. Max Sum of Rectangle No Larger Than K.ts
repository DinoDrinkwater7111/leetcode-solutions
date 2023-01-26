import assert from 'assert';

const funcs = [
    function maxSumSubmatrix(matrix: number[][], k: number): number {
        const M = matrix.length;
        const N = matrix[0].length;

        const sumsFromLeftTopCorner: number[][] = [Array(N + 1).fill(0)];
        for (let i = 1; i <= M; i++) {
            sumsFromLeftTopCorner[i] = [0];
            for (let j = 1; j <= N; j++) {
                sumsFromLeftTopCorner[i][j] =
                    sumsFromLeftTopCorner[i - 1][j] +
                    sumsFromLeftTopCorner[i][j - 1] +
                    matrix[i - 1][j - 1] -
                    sumsFromLeftTopCorner[i - 1][j - 1];
            }
        }
        let max = Number.NEGATIVE_INFINITY;
        for (let i = 1; i <= M; i++) {
            for (let j = 1; j <= N; j++) {
                for (let x = i; x <= M; x++) {
                    for (let y = j; y <= N; y++) {
                        const sum =
                            sumsFromLeftTopCorner[x][y] -
                            sumsFromLeftTopCorner[x][j - 1] -
                            sumsFromLeftTopCorner[i - 1][y] +
                            sumsFromLeftTopCorner[i - 1][j - 1];
                        if (sum <= k && sum > max) max = sum;
                    }
                }
            }
        }
        return max;
    },
];

type TestCase = Parameters<typeof funcs[number]>;
function* testCaseIterator(): Generator<TestCase> {
    //TODO
}

function test(testCase: TestCase, actualFuncInd: number, expectedFuncInd: number): boolean {
    try {
        assert.deepStrictEqual(funcs[actualFuncInd](...testCase), funcs[expectedFuncInd](...testCase));
        return true;
    } catch (e) {
        console.log('❌'.repeat(32));
        console.log(`actualFuncInd: ${actualFuncInd}`);
        console.log(`expectedFuncInd: ${expectedFuncInd}`);
        console.log(`testCase: ${JSON.stringify(testCase)}`);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
        return false;
    }
}

{
    let count = 0;
    outer: for (const testCase of testCaseIterator()) {
        if (++count < 10) {
            console.log('----------------------------------------------------');
            console.log(`Testcase ${count}:`);
            console.log(JSON.stringify(testCase, undefined, 2));
        }
        for (let i = 0; i < funcs.length - 1; i++) {
            if (!test(testCase, i, i + 1)) break outer;
        }
    }
}
