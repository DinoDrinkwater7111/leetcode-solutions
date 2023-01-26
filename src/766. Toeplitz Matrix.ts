import assert from 'assert';

const funcs = [
    function isToeplitzMatrix(matrix: number[][]): boolean {
        const m = matrix.length;
        const n = matrix[0].length;
        for (let row = 0; row < m; row++) {
            const val = matrix[row][0];
            let i = row + 1;
            let j = 1;
            while (i < m && j < n) {
                if (matrix[i][j] !== val) return false;
                i++;
                j++;
            }
        }
        for (let col = 1; col < n; col++) {
            const val = matrix[0][col];
            let i = 1;
            let j = col + 1;
            while (i < m && j < n) {
                if (matrix[i][j] !== val) return false;
                i++;
                j++;
            }
        }

        return true;
    },
];

type TestCase = Parameters<typeof funcs[number]>;
function* testCaseIterator(): Generator<TestCase> {
    //TODO
}

function test(testCase: TestCase, actualFuncInd: number, expectedFuncInd: number): boolean {
    try {
        const json = JSON.stringify(testCase);
        assert.deepStrictEqual(
            funcs[actualFuncInd](...(JSON.parse(json) as TestCase)),
            funcs[expectedFuncInd](...(JSON.parse(json) as TestCase))
        );
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
