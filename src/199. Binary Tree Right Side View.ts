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

function rightSideView(root: TreeNode | null): number[] {
    if (root === null) return [];
    const result: number[] = [];
    let nodes: TreeNode[] = [root];
    while (nodes.length > 0) {
        const nodes_: TreeNode[] = [];
        for (let i = 0; i < nodes.length - 1; i++) {
            const node = nodes[i];
            if (node.left !== null) nodes_.push(node.left);
            if (node.right !== null) nodes_.push(node.right);
        }
        const node = nodes[nodes.length - 1];
        result.push(node.val);
        if (node.left !== null) nodes_.push(node.left);
        if (node.right !== null) nodes_.push(node.right);
        nodes = nodes_;
    }
    return result;
}

//TODO
