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

function isValidBST_(root: TreeNode | null): boolean {
    function isValidBSTEx(node: TreeNode | null, lowerBound: number, upperBound: number): boolean {
        if (node === null) return true;
        if (node.val <= lowerBound || node.val >= upperBound) return false;
        return isValidBSTEx(node.left, lowerBound, node.val) && isValidBSTEx(node.right, node.val, upperBound);
    }

    return isValidBSTEx(root, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
}

function isValidBST(root: TreeNode | null): boolean {
    let curr = root;
    let max = Number.NEGATIVE_INFINITY;
    while (curr !== null) {
        if (curr.left === null) {
            if (max >= curr.val) return false;
            max = curr.val;
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
                if (max >= curr.val) return false;
                max = curr.val;
                traveler.right = null;
                curr = curr.right;
            }
        }
    }
    return true;
}

function _isValidBST(root: TreeNode | null): boolean {
    let max = Number.NEGATIVE_INFINITY;
    function inOrderTravel(node: TreeNode | null): boolean {
        if (node === null) return true;
        const a = inOrderTravel(node.left);
        if (max >= node.val) return false;
        max = node.val;
        const b = inOrderTravel(node.right);
        return a && b;
    }

    return inOrderTravel(root);
}

//TODO