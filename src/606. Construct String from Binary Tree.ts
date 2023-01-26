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
    function tree2str(root: TreeNode | null): string {
        const stack: string[] = [];
        function tree2strEx(node: TreeNode | null): void {
            if (node === null) return;
            stack.push(node.val.toString());
            if (node.left === null && node.right === null) {
                return;
            } else if (node.right === null) {
                stack.push('(');
                tree2strEx(node.left);
                stack.push(')');
                return;
            } else {
                stack.push('(');
                tree2strEx(node.left);
                stack.push(')');
                stack.push('(');
                tree2strEx(node.right);
                stack.push(')');
                return;
            }
        }
        tree2strEx(root!);
        return stack.join('');
    },
    function tree2str(root: TreeNode | null): string {
        if (root === null) return '';
        if (root.left === null && root.right === null) return root.val.toString();
        if (root.right === null) return `${root.val}(${tree2str(root.left)})`;
        return `${root.val}(${tree2str(root.left)})(${tree2str(root.right)})`;
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
