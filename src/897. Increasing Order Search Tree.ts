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

function increasingBST(root: TreeNode | null): TreeNode | null {
    if (root === null) return null;
    const nodeStack: TreeNode[] = [];
    let result = root;
    while (result.left !== null) {
        result = result.left;
    }
    let resultLastNode = new TreeNode();
    let currentNode: TreeNode | null = root;
    while (true) {
        if (currentNode === null) {
            if (nodeStack.length === 0) {
                resultLastNode.left = null;
                resultLastNode.right = null;
                break;
            } else {
                currentNode = nodeStack[nodeStack.length - 1];
            }
        } else if (currentNode === nodeStack[nodeStack.length - 1]) {
            resultLastNode.right = currentNode;
            resultLastNode.left = null;
            resultLastNode = currentNode;
            currentNode = nodeStack.pop()!.right;
        } else {
            nodeStack.push(currentNode);
            if (currentNode.left !== null) {
                currentNode = currentNode.left;
            }
        }
    }
    return result;
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

function _increasingBST(root: TreeNode | null): TreeNode | null {
    if (root === null) return null;
    const sortedValArr = treeNode2arr(root).sort((a, b) => a - b);
    return arr2treeNode(sortedValArr);
}

function test() {
    let arr: number[] = [];
    try {
        for (let n = 0; n <= 1000; n++) {
            arr = Array.from(
                new Set(
                    Array(n)
                        .fill(undefined)
                        .map(() => Math.floor(Math.random() * 10000))
                )
            );
            const result = increasingBST(arr2treeNode(arr));
            const _result = _increasingBST(arr2treeNode(arr));
            assert.deepStrictEqual(result, _result);
        }
    } catch (e) {
        console.log(arr);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
