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

function levelOrder(root: TreeNode | null): number[][] {
    if (root === null) return [];
    const result: number[][] = [];
    let level: TreeNode[] = [root];
    while (level.length > 0) {
        result.push(level.map((node) => node.val));
        const level_: TreeNode[] = [];
        for (const node of level) {
            if (node.left !== null) level_.push(node.left);
            if (node.right !== null) level_.push(node.right);
        }
        level = level_;
    }
    return result;
}

//TODO
