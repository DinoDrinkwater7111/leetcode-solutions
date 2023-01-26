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
    function pseudoPalindromicPaths(root: TreeNode | null): number {
        let result = 0;
        let num2odd: boolean[] = Array(10).fill(false);
        let oddCount = 0;
        function pseudoPalindromicPathsEx(node: TreeNode) {
            const odd = !num2odd[node.val];
            oddCount += odd ? 1 : -1;
            num2odd[node.val] = odd;
            if (node.left === null && node.right === null) if (oddCount <= 1) result++;
            if (node.left !== null) pseudoPalindromicPathsEx(node.left);
            if (node.right !== null) pseudoPalindromicPathsEx(node.right);
            num2odd[node.val] = !odd;
            oddCount -= odd ? 1 : -1;
        }

        pseudoPalindromicPathsEx(root!);
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
