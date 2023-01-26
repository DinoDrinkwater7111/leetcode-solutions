import assert from 'assert';

const funcs = [
    function exist(board: string[][], word: string): boolean {
        function dfs(i: number, j: number, charInd: number): boolean {
            if (charInd === word.length) return false;
            if (board[i]?.[j] !== word[charInd]) return false;
            if (charInd === word.length - 1) return true;

            board[i][j] = undefined as never;
            const result =
                dfs(i + 1, j, charInd + 1) ||
                dfs(i - 1, j, charInd + 1) ||
                dfs(i, j + 1, charInd + 1) ||
                dfs(i, j - 1, charInd + 1);
            board[i][j] = word[charInd];
            return result;
        }
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (dfs(i, j, 0)) return true;
            }
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
