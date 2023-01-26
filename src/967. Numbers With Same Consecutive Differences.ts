import assert from 'assert';

class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

const funcs = [
    function numsSameConsecDiff(n: number, k: number): number[] {
        if (k === 0) {
            const n1 = (10 ** n - 1) / 9;
            return Array(9)
                .fill(0)
                .map((v, i) => n1 * (i + 1));
        }
        const result: number[] = [];
        let numStack: number = 0;
        function numsSameConsecDiffEx(n: number, nextDigit: number): void {
            if (nextDigit < 0 || nextDigit > 9) return;
            numStack = numStack * 10 + nextDigit;
            if (n === 1) {
                result.push(numStack);
            } else {
                numsSameConsecDiffEx(n - 1, nextDigit - k);
                numsSameConsecDiffEx(n - 1, nextDigit + k);
            }
            numStack = Math.floor(numStack / 10);
        }

        for (let i = 1; i <= 9; i++) {
            numsSameConsecDiffEx(n, i);
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
