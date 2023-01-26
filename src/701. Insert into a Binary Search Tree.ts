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

function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {
    if (root === null) return new TreeNode(val);
    let curr = root;
    while (true) {
        if (curr.val > val) {
            if (curr.left === null){
                curr.left = new TreeNode(val);
                return root;
            }
            curr = curr.left;
        } else {
            if (curr.right === null){
                curr.right = new TreeNode(val);
                return root;
            }
            curr = curr.right;
        }
    }
}

//TODO