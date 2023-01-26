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

function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
    let candidates_p: TreeNode[] | undefined = undefined;
    let candidates_q: TreeNode[] | undefined = undefined;

    const stack: TreeNode[] = [];

    function dfs(node: TreeNode | null): void {
        if (node === null) return;
        if (candidates_p !== undefined && candidates_q !== undefined) return;
        stack.push(node);
        if (node === p) candidates_p = stack.slice();
        if (node === q) candidates_q = stack.slice();
        dfs(node.left);
        dfs(node.right);
        stack.pop();
    }

    dfs(root)

    let i = 0;
    while (candidates_p![i] === candidates_q![i]) i++;
    return candidates_p![i - 1];
}
