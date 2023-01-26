import assert from 'assert';

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

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
    function isSubPath(head: ListNode | null, root: TreeNode | null): boolean {
        function isSubPath_excatStart(listNode: ListNode | null, treeNode: TreeNode | null): boolean {
            if (listNode === null) return true;
            if (treeNode === null) return false;
            if (listNode.val !== treeNode.val) return false;
            return (
                isSubPath_excatStart(listNode.next, treeNode.left) ||
                isSubPath_excatStart(listNode.next, treeNode.right)
            );
        }

        function isSubPathEx(treeNode: TreeNode | null): boolean {
            if (treeNode === null) return false;
            return isSubPath_excatStart(head, treeNode) || isSubPathEx(treeNode.left) || isSubPathEx(treeNode.right);
        }
        return isSubPathEx(root);
    },
];

type TestCase = Parameters<typeof funcs[number]>;
function* testCaseIterator(): Generator<TestCase> {}

function test(testCase: TestCase, actualFuncInd: number, expectedFuncInd: number): boolean {
    try {
        assert.deepStrictEqual(funcs[actualFuncInd](...testCase), funcs[expectedFuncInd](...testCase));
        return true;
    } catch (e) {
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

outer: for (const testCase of testCaseIterator()) {
    for (let i = 0; i < funcs.length - 1; i++) {
        if (!test(testCase, i, i + 1)) break outer;
    }
}
