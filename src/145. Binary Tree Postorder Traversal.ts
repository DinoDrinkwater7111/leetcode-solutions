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

function postorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = [];
    let currentNode = root;
    while (currentNode !== null) {
        if (currentNode.right === null) {
            result.push(currentNode.val);
            currentNode = currentNode.left;
        } else {
            let traveler = currentNode.right;
            while (traveler.left !== null && traveler.left !== currentNode) {
                traveler = traveler.left;
            }
            if (traveler.left === null) {
                result.push(currentNode.val);
                traveler.left = currentNode;
                currentNode = currentNode.right;
            } else {
                traveler.left = null;
                currentNode = currentNode.left;
            }
        }
    }
    return result.reverse();
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

function _postorderTraversal(root: TreeNode | null): number[] {}

function test() {
    let arr: number[] = [];
    try {
        for (let n = 2; n <= 1000; n++) {
            arr = Array.from(
                new Set(
                    Array(n)
                        .fill(undefined)
                        .map(() => Math.floor(Math.random() * 10000))
                )
            );
            //TODO
            const result = arr2treeNode(arr);
            recoverTree(result);
            const _result = arr2treeNode(arr);
            _recoverTree(_result);
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
