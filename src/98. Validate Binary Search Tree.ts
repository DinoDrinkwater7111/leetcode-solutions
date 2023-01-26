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
    function isValidBST(root: TreeNode | null): boolean {
        let curr = root;
        let max = Number.NEGATIVE_INFINITY;
        while (curr !== null) {
            if (curr.left === null) {
                if (max >= curr.val) return false;
                max = curr.val;
                curr = curr.right;
            } else {
                let traveler = curr.left;
                while (traveler.right !== null && traveler.right !== curr) {
                    traveler = traveler.right;
                }
                if (traveler.right === null) {
                    traveler.right = curr;
                    curr = curr.left;
                } else {
                    if (max >= curr.val) return false;
                    max = curr.val;
                    traveler.right = null;
                    curr = curr.right;
                }
            }
        }
        return true;
    },
    function isValidBST(root: TreeNode | null): boolean {
        function isValidBSTEx(node: TreeNode | null, lowerBound: number, upperBound: number): boolean {
            if (node === null) return true;
            if (node.val <= lowerBound || node.val >= upperBound) return false;
            return isValidBSTEx(node.left, lowerBound, node.val) && isValidBSTEx(node.right, node.val, upperBound);
        }

        return isValidBSTEx(root, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    },
    function isValidBST(root: TreeNode | null): boolean {
        let max = Number.NEGATIVE_INFINITY;
        function inOrderTravel(node: TreeNode | null): boolean {
            if (node === null) return true;
            const a = inOrderTravel(node.left);
            if (max >= node.val) return false;
            max = node.val;
            const b = inOrderTravel(node.right);
            return a && b;
        }

        return inOrderTravel(root);
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
