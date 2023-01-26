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
    function findTarget(root: TreeNode | null, k: number): boolean {
        const _stack: TreeNode[] = [];
        let _curr: TreeNode | null = root;
        function _next(): number {
            while (_stack.length > 0 || _curr !== null) {
                if (_curr !== null) {
                    _stack.push(_curr);
                    _curr = _curr.left;
                } else {
                    _curr = _stack.pop()!;
                    const result = _curr.val;
                    _curr = _curr.right;
                    return result;
                }
            }
            throw new Error('No next');
        }

        const stack_: TreeNode[] = [];
        let curr_: TreeNode | null = root;
        function next_(): number {
            while (stack_.length > 0 || curr_ !== null) {
                if (curr_ !== null) {
                    stack_.push(curr_);
                    curr_ = curr_.right;
                } else {
                    curr_ = stack_.pop()!;
                    const result = curr_.val;
                    curr_ = curr_.left;
                    return result;
                }
            }
            throw new Error('No next');
        }

        let left = _next();
        let right = next_();
        while (left < right) {
            if (left + right < k) left = _next();
            else if (left + right > k) right = next_();
            else return true;
        }
        return false;
    },
    function findTarget(root: TreeNode | null, k: number): boolean {
        function binarySearch(target: number): boolean {
            let curr = root;
            while (curr !== null) {
                if (target > curr.val) {
                    curr = curr.right;
                } else if (target < curr.val) {
                    curr = curr.left;
                } else {
                    return true;
                }
            }
            return false;
        }

        function inOrderTravel(node: TreeNode | null): boolean {
            if (node === null) return false;
            const a = inOrderTravel(node.left);
            if (node.val * 2 < k && binarySearch(k - node.val)) return true;
            return a || inOrderTravel(node.right);
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
