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

function zigzagLevelOrder(root: TreeNode | null): number[][] {
    if (root === null) return [];
    let result: number[][] = [];
    let nodes: TreeNode[] = [root];
    let fromLeft = true;
    while (nodes.length > 0) {
        const vals: number[] = [];
        let nodes_: TreeNode[] = [];
        for (let i = nodes.length - 1; i >= 0; i--) {
            const node = nodes[i];
            vals.push(node.val);
            if (fromLeft) {
                if (node.left !== null) nodes_.push(node.left);
                if (node.right !== null) nodes_.push(node.right);
            } else {
                if (node.right !== null) nodes_.push(node.right);
                if (node.left !== null) nodes_.push(node.left);
            }
        }
        fromLeft = !fromLeft;
        result.push(vals);
        nodes = nodes_;
    }
    return result;
}
