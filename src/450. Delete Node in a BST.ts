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

function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
    if (root === null) return null;
    function deleteNodeEx(node: TreeNode): TreeNode | null {
        if (node.right === null) return node.left;
        const result = node.right;
        if (result.left === null) {
            result.left = node.left;
        } else {
            if (node.left !== null) {
                let curr = node.left;
                while (curr.right !== null) curr = curr.right;
                curr.right = result.left;
                result.left = node.left;
            }
        }
        return result;
    }
    if (root.val === key) {
        return deleteNodeEx(root);
    } else {
        let _node: TreeNode = null as never;
        let node: TreeNode | null = root;
        while (node !== null) {
            if (key > node.val) {
                _node = node;
                node = node.right;
            } else if (key < node.val) {
                _node = node;
                node = node.left;
            } else {
                break;
            }
        }
        if (node !== null) {
            const node_ = deleteNodeEx(node);
            if (node.val > _node.val) _node.right = node_;
            else _node.left = node_;
        }

        return root;
    }
}

//TODO
