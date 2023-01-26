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
    if (p!.val > q!.val) [p, q] = [q, p];
    function dfs(node: TreeNode | null, min: number, max: number): TreeNode | null {
        if (node === null) return null;
        if (min < p!.val && q!.val < max) {
            return dfs(node.left, min, node.val) ?? dfs(node.right, node.val, max) ?? node;
        } else {
            return null;
        }
    }
    return dfs(root!, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
}

function _lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {

}

//TODO
