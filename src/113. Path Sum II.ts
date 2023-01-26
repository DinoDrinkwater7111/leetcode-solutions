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

function pathSum(root: TreeNode | null, targetSum: number): number[][] {
    const result: number[][] = [];
    const path: number[] = [];
    function pathSumEx(node: TreeNode | null, targetSum: number): void {
        if (node === null) return;
        path.push(node.val);
        if (node.val === targetSum && node.left === null && node.right === null) result.push(path.slice());
        const nextVal = targetSum - node.val;
        pathSumEx(node.left, nextVal);
        pathSumEx(node.right, nextVal);
        path.pop();
    }
    pathSumEx(root, targetSum);
    return result;
}

function _pathSum(root: TreeNode | null, targetSum: number): number[][] {}
