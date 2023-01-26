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

function sortedArrayToBST(nums: number[]): TreeNode | null {

}

function _sortedArrayToBST(nums: number[]): TreeNode | null {
    const result = new TreeNode();
    function sortedArrayToBSTEx(node: TreeNode, start: number, end: number, isLeft: boolean): void {
        if (start > end) return;
        if (isLeft) {
            const mid = (start + end) >> 1;
            node.left = new TreeNode(nums[mid]);
            sortedArrayToBSTEx(node.left, start, mid - 1, true);
            sortedArrayToBSTEx(node.left, mid + 1, end, false);
        } else {
            const mid = Math.ceil((start + end) / 2);
            node.right = new TreeNode(nums[mid]);
            sortedArrayToBSTEx(node.right, start, mid - 1, true);
            sortedArrayToBSTEx(node.right, mid + 1, end, false);
        }
    }
    const mid = (nums.length - 1) >> 1;
    result.val = nums[mid];
    sortedArrayToBSTEx(result, 0, mid - 1, true);
    sortedArrayToBSTEx(result, mid + 1, nums.length - 1, false);
}
