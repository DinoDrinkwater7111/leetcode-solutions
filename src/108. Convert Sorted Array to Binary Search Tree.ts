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
    function sortedArrayToBST(nums: number[]): TreeNode | null {
        const result = new TreeNode();
        function sortedArrayToBSTEx(node: TreeNode, start: number, end: number, isLeft: boolean): void {
            if (start > end) return;
            if (isLeft) {
                const mid = (start + end) >> 1;
                node.left = new TreeNode(nums[mid]);
                sortedArrayToBSTEx(node.left, start, mid - 1, true);
                sortedArrayToBSTEx(node.left, mid + 1, end, false);
            } else {
                const mid = Math.ceil((start + end) / 2);
                node.right = new TreeNode(nums[mid]);
                sortedArrayToBSTEx(node.right, start, mid - 1, true);
                sortedArrayToBSTEx(node.right, mid + 1, end, false);
            }
        }
        const mid = (nums.length - 1) >> 1;
        result.val = nums[mid];
        sortedArrayToBSTEx(result, 0, mid - 1, true);
        sortedArrayToBSTEx(result, mid + 1, nums.length - 1, false);
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
