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

function mergeTrees(root1: TreeNode | null, root2: TreeNode | null): TreeNode | null {
    if (root1 === null && root2 === null) return null;
    const node = new TreeNode((root1?.val ?? 0) + (root2?.val ?? 0));
    node.left = mergeTrees(root1?.left ?? null, root2?.left ?? null);
    node.right = mergeTrees(root1?.right ?? null, root2?.right ?? null);
    return node;
}

//TODO
function test() {
    let descriptions: number[][] = [];
    try {
        descriptions = [
            [20, 15, 1],
            [20, 17, 0],
            [50, 20, 1],
            [50, 80, 0],
            [80, 19, 1],
        ];
        const root = createBinaryTree(descriptions);
        let currentNode = root!;
        const parentNodeStack: TreeNode[] = [currentNode];
        while (parentNodeStack.length > 0) {
            console.log(currentNode.val);
            if (currentNode.left !== null) {
                parentNodeStack.push(currentNode);
                currentNode = currentNode.left;
            } else if (currentNode.right !== null) {
                parentNodeStack.push(currentNode);
                currentNode = currentNode.right;
            } else {
                const parentNode = parentNodeStack.pop()!;
                if (parentNode.left === currentNode) {
                    parentNode.left = null;
                }
                if (parentNode.right === currentNode) {
                    parentNode.right = null;
                }
                if (parentNode.left === null && parentNode.right === null) {
                    currentNode = parentNodeStack.pop()!;
                } else {
                    currentNode = parentNode;
                }
            }
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(descriptions);
            console.log(e.message);
        } else {
            console.log(descriptions);
            console.error(e);
        }
    }
}
test();
