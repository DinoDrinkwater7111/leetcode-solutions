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
    function isSymmetric(root: TreeNode | null): boolean {
        let _node = root!.left;
        let node_ = root!.right;
        while (_node !== null && node_ !== null) {
            if (_node.val !== node_.val) return false;
            if (_node.left === null && node_.right === null) {
                _node = _node.right;
                node_ = node_.left;
            } else if (_node.left !== null && node_.right !== null) {
                let _traveler = _node.left;
                let traveler_ = node_.right;
                while (_traveler.right !== null && _traveler.right !== _node) {
                    if (!(traveler_.left !== null && traveler_.left !== node_)) return false;
                    _traveler = _traveler.right;
                    traveler_ = traveler_.left;
                }
                if (_traveler.right === null && traveler_.left === null) {
                    _traveler.right = _node;
                    _node = _node.left;
                    traveler_.left = node_;
                    node_ = node_.right;
                } else if (_traveler.right === _node && traveler_.left === node_) {
                    _traveler.right = null;
                    _node = _node.right;
                    traveler_.left = null;
                    node_ = node_.left;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }

        return _node === node_;
    },
    function isSymmetric(root: TreeNode | null): boolean {
        function isSymmetricEx(_node: TreeNode | null, node_: TreeNode | null): boolean {
            if (_node === null && node_ === null) return true;
            if (_node !== null && node_ !== null)
                return (
                    _node.val === node_.val &&
                    isSymmetricEx(_node.left, node_.right) &&
                    isSymmetricEx(_node.right, node_.left)
                );
            return false;
        }

        return isSymmetricEx(root!.left, root!.right);
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
