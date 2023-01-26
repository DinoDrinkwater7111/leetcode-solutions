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

function isBalanced(root: TreeNode | null): boolean {
}

function _isBalanced(root: TreeNode | null): boolean {
    let result = true;
    /**
     * @return height
     */
    function isBalancedEx(node: TreeNode | null): number {
        if (node === null) return 0;
        const _height = isBalancedEx(node.left);
        const height_ = isBalancedEx(node.right);
        if (Math.abs(_height - height_) > 1) result = false;
        return Math.max(_height, height_) + 1;
    }
    isBalancedEx(root);
    return result;
}

//TODO
