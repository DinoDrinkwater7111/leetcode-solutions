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

function kthSmallest(root: TreeNode | null, k: number): number {
    const nodeStack: TreeNode[] = [];
    let count = 0;
    let currentNode: TreeNode | null = root;
    while (true) {
        if (currentNode === null) {
            if (nodeStack.length === 0) {
                break;
            } else {
                currentNode = nodeStack[nodeStack.length - 1];
            }
        } else if (currentNode === nodeStack[nodeStack.length - 1]) {
            count++;
            if (count === k) return currentNode.val;
            currentNode = nodeStack.pop()!.right;
        } else {
            nodeStack.push(currentNode);
            if (currentNode.left !== null) {
                currentNode = currentNode.left;
            }
        }
    }

    throw new Error();
}

function treeNode2arr(treeNode: TreeNode): number[] {
    const result = [];
    let currentLevelNodes: TreeNode[] = [treeNode];
    while (currentLevelNodes.length !== 0) {
        const currentLevelNodes_: TreeNode[] = [];
        for (const node of currentLevelNodes) {
            result.push(node.val);
            if (node.left !== null) {
                currentLevelNodes_.push(node.left);
            }
            if (node.right !== null) {
                currentLevelNodes_.push(node.right);
            }
        }
        currentLevelNodes = currentLevelNodes_;
    }
    return result;
}

function arr2treeNode(arr: number[]): TreeNode | null {
    if (arr.length === 0) return null;
    const rootNode = new TreeNode(arr[0]);
    function insert(val: number, node: TreeNode) {
        if (node.val < val) {
            if (node.right !== null) {
                insert(val, node.right);
            } else {
                node.right = new TreeNode(val);
            }
        } else {
            if (node.left !== null) {
                insert(val, node.left);
            } else {
                node.left = new TreeNode(val);
            }
        }
    }
    for (let i = 1; i < arr.length; i++) {
        insert(arr[i], rootNode);
    }

    return rootNode;
}

function _kthSmallest(root: TreeNode | null, k: number): number {
    const sortedArr = treeNode2arr(root!).sort((a, b) => a - b);
    return sortedArr[k - 1];
}

function test() {
    let arr: number[] = [];
    let k: number = 0;
    try {
        for (let n = 1; n <= 1000; n++) {
            arr = Array.from(
                new Set(
                    Array(n)
                        .fill(undefined)
                        .map(() => Math.floor(Math.random() * 10000))
                )
            );
            k = Math.floor(Math.random() * arr.length) + 1;
            const result = kthSmallest(arr2treeNode(arr), k);
            const _result = _kthSmallest(arr2treeNode(arr), k);
            assert.deepStrictEqual(result, _result);
        }
    } catch (e) {
        console.log(arr);
        console.log(k);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
