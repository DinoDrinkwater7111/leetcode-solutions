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

function searchBST(root: TreeNode | null, val: number): TreeNode | null {
    let curr = root;
    while (curr !== null) {
        if (curr.val > val) {
            curr = curr.left;
        } else if (curr.val < val) {
            curr = curr.right;
        } else {
            return curr;
        }
    }
    return null;
}

//TODO