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
    function verticalTraversal(root: TreeNode | null): number[][] {
        // col, row -> arr
        const right: number[][][] = [];
        const left: number[][][] = [];
        function verticalTraversalEx(node: TreeNode | null, row: number, col: number): void {
            if (node === null) return;
            if (col >= 0) {
                right[col] ??= [];
                right[col][row] ??= [];
                right[col][row].push(node.val);
            } else {
                left[-col] ??= [];
                left[-col][row] ??= [];
                left[-col][row].push(node.val);
            }
            verticalTraversalEx(node.left, row + 1, col - 1);
            verticalTraversalEx(node.right, row + 1, col + 1);
        }

        verticalTraversalEx(root, 0, 0);
        const result: number[][] = [];
        for (let colInd = left.length - 1; colInd >= 1; colInd--) {
            result.push([]);
            left[colInd].forEach((arr) => {
                arr.sort((a, b) => a - b);
                result[result.length - 1].push(...arr);
            });
        }
        for (let colInd = 0; colInd < right.length; colInd++) {
            result.push([]);
            right[colInd].forEach((arr) => {
                arr.sort((a, b) => a - b);
                result[result.length - 1].push(...arr);
            });
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
