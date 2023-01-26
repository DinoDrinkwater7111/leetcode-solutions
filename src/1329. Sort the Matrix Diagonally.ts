import assert from 'assert';

const funcs = [
    function diagonalSort(mat: number[][]): number[][] {
        function diagonalSortEx(i: number, j: number): void {
            const diagonalArr: number[] = [];
            let x = i;
            let y = j;
            while (mat[x]?.[y] !== undefined) {
                diagonalArr.push(mat[x][y]);
                x++;
                y++;
            }
            diagonalArr.sort((a, b) => a - b);
            x = i;
            y = j;
            for (const num of diagonalArr) {
                mat[x][y] = num;
                x++;
                y++;
            }
        }

        for (let j = 0; j < mat[0].length; j++) diagonalSortEx(0, j);
        for (let i = 1; i < mat.length; i++) diagonalSortEx(i, 0);
        return mat;
    },
];

type TestCase = Parameters<typeof funcs[number]>;
function* testCaseIterator(): Generator<TestCase> {}

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
