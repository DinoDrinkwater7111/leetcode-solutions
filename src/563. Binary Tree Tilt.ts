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

function findTilt(root: TreeNode | null): number {
    if (root === null) return 0;
    let result = 0;
    /**
     * @readonly Sum of node and child values
     */
    function findSum(node: TreeNode | null): number {
        if (node === null) return 0;
        const leftSum = findSum(node.left);
        const rightSum = findSum(node.right);
        result += Math.abs(leftSum - rightSum); // calculate tilt
        return leftSum + rightSum + node.val;
    }

    //Be aware of the sum ordering due to side effect of findSum
    result = Math.abs(findSum(root.left) - findSum(root.right)) + result; 
    return result;
}

function _findTilt(root: TreeNode | null): number {}

//TODO
