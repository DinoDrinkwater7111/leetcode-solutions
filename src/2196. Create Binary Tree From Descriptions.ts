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

function createBinaryTree(descriptions: number[][]): TreeNode | null {
    const val2Node = new Map<number, TreeNode>();
    for (const desc of descriptions) {
        const parent = desc[0];
        const child = desc[1];
        const isLeft = desc[2] === 1;

        const parentNode = val2Node.get(parent) ?? new TreeNode(parent);
        val2Node.set(parent, parentNode);
        const childNode = val2Node.get(child) ?? new TreeNode(child);
        val2Node.set(child, childNode);
        if (isLeft) {
            parentNode.left = childNode;
        } else {
            parentNode.right = childNode;
        }
    }

    const rootValCandiates = new Set<number>(val2Node.keys());
    for (const desc of descriptions) {
        const child = desc[1];
        rootValCandiates.delete(child);
    }

    const rootVal: number = rootValCandiates.values().next().value;

    return val2Node.get(rootVal)!;
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
