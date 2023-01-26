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
    function diameterOfBinaryTree(root: TreeNode | null): number {
        let maxNumberOfNode = Number.NEGATIVE_INFINITY;
        /**@return max height from root */
        function diameterOfBinaryTreeEx(root: TreeNode | null): number {
            if (root === null) return 0;
            const leftMaxHeight = diameterOfBinaryTreeEx(root.left);
            const rightMaxHeight = diameterOfBinaryTreeEx(root.right);
            maxNumberOfNode = Math.max(maxNumberOfNode, leftMaxHeight + rightMaxHeight + 1);
            return Math.max(leftMaxHeight, rightMaxHeight) + 1;
        }
        diameterOfBinaryTreeEx(root);
        return maxNumberOfNode - 1;
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
