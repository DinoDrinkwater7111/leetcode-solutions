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

function preorderTraversal_(root: TreeNode | null): number[] {
    const result: number[] = [];
    let currentNode = root;
    while (currentNode !== null) {
        if (currentNode.left === null) {
            result.push(currentNode.val);
            currentNode = currentNode.right;
        } else {
            let traveler: TreeNode | null = currentNode.left;
            while (traveler.right !== null && traveler.right !== currentNode) {
                traveler = traveler.right;
            }
            if (traveler.right === null) {
                result.push(currentNode.val);
                traveler.right = currentNode;
                currentNode = currentNode.left;
            } else {
                traveler.right = null;
                currentNode = currentNode.right;
            }
        }
    }
    return result;
}

function preorderTraversal(root: TreeNode | null): number[] {
    if (root === null) return [];
    const result: number[] = [root.val];
    let _node: TreeNode | undefined = root;
    let node: TreeNode | null | undefined = root.left;
    root.left = undefined as never;
    while (node !== undefined) {
        if (node === null) {
            node = _node;
        } else {
            if (node === _node) {
                node = node.right;
                _node = _node.left!;
            } else {
                result.push(node.val);
                const currentNode: TreeNode = node;
                node = currentNode.left;
                currentNode.left = _node!;
                _node = currentNode;
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

function _preorderTraversal(root: TreeNode | null): number[] {}

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
