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

function flatten(root: TreeNode | null): void {
    let curr = root;
    while (curr !== null) {
        if (curr.left === null) {
            curr = curr.right;
        } else {
            let traveler = curr.left;
            while (traveler.right !== null) traveler = traveler.right;
            traveler.right = curr.right;
            curr.right = curr.left;
            curr.left = null;
            curr = curr.right;
        }
    }
}

function _flatten(root: TreeNode | null): void {
    if (root === null) return;
    const preorder: TreeNode[] = [];
    function travel(node: TreeNode): void {
        preorder.push(node);
        if (node.left !== null) travel(node.left);
        if (node.right !== null) travel(node.right);
    }
    travel(root);
    for (let i = 0; i < preorder.length - 1; i++) {
        preorder[i].left = null;
        preorder[i].right = preorder[i + 1];
    }
}

//TODO
