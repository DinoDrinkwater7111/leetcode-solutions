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
    function countNodes(root: TreeNode | null): number {
        let h = 0;
        {
            let curr = root;
            while (curr !== null) {
                h++;
                curr = curr.left;
            }
        }
        function rightIsCandidate(node: TreeNode, nodeH: number): boolean {
            let curr = node.right;
            while (curr !== null) {
                nodeH++;
                curr = curr.left;
            }
            return nodeH === h;
        }
        const B = (1 << h) >> 1;
        let result = B - 1;
        let curr = root;
        let currH = 1;
        while (curr !== null) {
            if (rightIsCandidate(curr, currH)) {
                curr = curr.right;
                result += B >> currH;
            } else {
                curr = curr.left;
            }
            currH++;
        }
        return result + 1;
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
