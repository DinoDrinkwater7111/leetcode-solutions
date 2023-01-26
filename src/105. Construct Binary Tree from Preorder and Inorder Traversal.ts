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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    const result = new TreeNode(preorder[0]);

    let preorderInd = 1;
    let inorderInd = 0;

    const parents: TreeNode[] = [];
    let curr: TreeNode = result;
    while (preorderInd < preorder.length) {
        while (preorder[preorderInd - 1] !== inorder[inorderInd]) {
            parents.push(curr);
            curr.left = new TreeNode(preorder[preorderInd++]);
            curr = curr.left;
        }
        inorderInd++;
        while (parents.length > 0 && parents[parents.length - 1].val === inorder[inorderInd]) {
            inorderInd++;
            curr = parents.pop()!;
        }
        if (preorderInd < preorder.length) {
            curr.right = new TreeNode(preorder[preorderInd++]);
            curr = curr.right;
        }
    }

    return result;
}

function _buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    const inorderVal2Ind: number[] = [];
    for (let i = 0; i < inorder.length; i++) inorderVal2Ind[inorder[i]] = i;

    let preorderInd = 0;
    function buildTreeEx(start: number, end: number): TreeNode | null {
        if (start > end) return null;
        const val = preorder[preorderInd++];
        const root = new TreeNode(val);
        root.left = buildTreeEx(start, inorderVal2Ind[val] - 1);
        root.right = buildTreeEx(inorderVal2Ind[val] + 1, end);
        return root;
    }

    return buildTreeEx(0, inorder.length - 1);
}
