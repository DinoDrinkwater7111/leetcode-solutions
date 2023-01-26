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
    let lastPopParent: TreeNode | null = null;
    let found_p = false;
    let found_q = false;
    let curr = root;
    while (curr !== null) {
        if (curr.left === null) {
            if (curr === p) found_p = true;
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
                if (found_p && found_q) return lastPopParent;
                lastPopParent = curr;
                traveler.right = null;
                curr = curr.right;
            }
        }
    }

    throw new Error();
}

//TODO
