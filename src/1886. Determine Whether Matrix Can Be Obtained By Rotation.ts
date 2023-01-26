import assert from 'assert';

const funcs = [
    function findRotation(mat: number[][], target: number[][]): boolean {
        function everyMatCell(predicate: (i: number, j: number) => boolean): boolean {
            for (let i = 0; i < mat.length; i++) {
                for (let j = 0; j < mat[i].length; j++) {
                    if (!predicate(i, j)) return false;
                }
            }
            return true;
        }
        for (let i = 0; i < 4; i++) {
            let can = false;
            switch (i) {
                case 0: {
                    can = everyMatCell((i, j) => mat[i][j] === target[i][j]);
                    break;
                }
                case 1: {
                    can = everyMatCell((i, j) => mat[i][j] === target[j][target[0].length - 1 - i]);
                    break;
                }
                case 2: {
                    can = everyMatCell((i, j) => mat[i][j] === target[target.length - 1 - i][target.length - 1 - j]);
                    break;
                }
                case 3: {
                    can = everyMatCell((i, j) => mat[i][j] === target[target.length - 1 - j][i]);
                    break;
                }
            }
            if (can) return true;
        }
        return false;
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
