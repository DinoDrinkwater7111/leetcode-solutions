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

function serialize(root: TreeNode | null): string {
    if (root === null) return JSON.stringify([]);
    const resultArr: (number | null)[] = [root.val];
    let level: (TreeNode | null)[] = [root];
    while (level.length > 0) {
        const level_: (TreeNode | null)[] = [];
        for (const node of level) {
            if (node === null) continue;
            level_.push(node.left, node.right);
            resultArr.push(node.left?.val ?? null, node.right?.val ?? null);
        }
        for (const node of level_) {
            if (node !== null) {
                level = level_;
                break;
            }
        }
    }
    for (let i = resultArr.length - 1; i >= 0; i--) {
        if (resultArr[i] === null) resultArr.pop();
        else break;
    }
    return JSON.stringify(resultArr);
}
function deserialize(data: string): TreeNode | null {
    const arr: (number | null)[] = JSON.parse(data);
    if (arr.length === 0) return null;
    const root = new TreeNode(arr[0]!);
    let level: TreeNode[] = [root];
    let i = 0;
    while (i < arr.length) {
        const level_: TreeNode[] = [];
        for (const node of level) {
            if ((arr[++i] ?? null) !== null) level_.push((node.left = new TreeNode(arr[i]!)));
            if ((arr[++i] ?? null) !== null) level_.push((node.right = new TreeNode(arr[i]!)));
        }
        level = level_;
    }
    return root;
}

function _serialize(root: TreeNode | null): string {
    return JSON.stringify(root);
}
function _deserialize(data: string): TreeNode | null {
    return JSON.parse(data) as never;
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
