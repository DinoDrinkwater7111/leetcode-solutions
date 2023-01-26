import assert from 'assert';

const funcs = [
    function findBall(grid: number[][]): number[] {
        const result: number[] = [];
        outer: for (let i = 0; i < grid[0].length; i++) {
            let row = 0;
            let col = i;
            while (row < grid.length) {
                if (grid[row][col] === 1 && grid[row][col + 1] === 1) {
                    col++;
                } else if (grid[row][col] === -1 && grid[row][col - 1] === -1) {
                    col--;
                } else {
                    result[i] = -1;
                    continue outer;
                }
                row++;
            }
            result[i] = col;
        }
        return result;
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
