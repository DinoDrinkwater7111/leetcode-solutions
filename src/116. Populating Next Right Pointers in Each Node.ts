import assert from 'assert';

class Node {
    val: number;
    left: Node | null;
    right: Node | null;
    next: Node | null;
    constructor(val?: number, left?: Node, right?: Node, next?: Node) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
        this.next = next === undefined ? null : next;
    }
}

function connect(root: Node | null): Node | null {
    if (root === null) return null;
    function connectEx(node: Node | null, parentNode: Node): void {
        if (node === null) return;
        if (node === parentNode.left) {
            node.next = parentNode.right;
        } else if (parentNode.next !== null) {
            node.next = parentNode.next.left;
        } else {
            node.next = null;
        }
        connectEx(node?.left ?? null, node);
        connectEx(node?.right ?? null, node);
    }

    root.next = null;
    connectEx(root.left, root);
    connectEx(root.right, root);
    return root;
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
