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
    function pathSum(root: TreeNode | null, targetSum: number): number {
        let result = 0;
        const dp: number[] = [0];
        const sum2Count = new Map([[0, 1]]);
        function pathSumEx(root: TreeNode | null): void {
            if (root === null) return;
            const sum = dp[dp.length - 1] + root.val;
            dp.push(sum);
            result += sum2Count.get(sum - targetSum) ?? 0;
            sum2Count.set(sum, (sum2Count.get(sum) ?? 0) + 1);
            pathSumEx(root.left);
            pathSumEx(root.right);
            sum2Count.set(sum, sum2Count.get(dp.pop()!)! - 1);
        }
        pathSumEx(root);
        return result;
    },
    function pathSum(root: TreeNode | null, targetSum: number): number {
        let result = 0;
        const dp: number[] = [0];
        function pathSumEx(root: TreeNode | null): void {
            if (root === null) return;
            dp.push(dp[dp.length - 1] + root.val);
            for (let i = 0; i < dp.length - 1; i++) if (dp[dp.length - 1] - dp[i] === targetSum) result++;
            pathSumEx(root.left);
            pathSumEx(root.right);
            dp.pop();
        }
        pathSumEx(root);
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
