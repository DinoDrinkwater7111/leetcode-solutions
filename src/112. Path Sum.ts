import assert from "assert";

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

function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    if (root === null) return false;
    if (root.val === targetSum && root.left === null && root.right === null) return true;
    const nextVal = targetSum - root.val;
    return hasPathSum(root.left, nextVal) || hasPathSum(root.right, nextVal);
}

//TODO