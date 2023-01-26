import assert from "assert"

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}


function findTarget(root: TreeNode | null, k: number): boolean {
    function binarySearch(target: number): boolean {
        let curr = root;
        while (curr !== null) {
            if (target > curr.val) {
                curr = curr.right;
            } else if (target < curr.val) {
                curr = curr.left;
            } else {
                return true;
            }
        }
        return false;
    }

    function inOrderTravel(node: TreeNode | null): boolean {
        if (node === null) return false;
        const a = inOrderTravel(node.left);
        if (node.val * 2 < k && binarySearch(k - node.val)) return true;
        return a || inOrderTravel(node.right);
    }

    return inOrderTravel(root);
}
