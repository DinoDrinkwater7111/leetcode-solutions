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

function trimBST(root: TreeNode | null, low: number, high: number): TreeNode | null {
    function trimBSTEx(treeNode: TreeNode | null): TreeNode | null {
        if (treeNode === null) return null;
        if (treeNode.val < low) {
            return trimBSTEx(treeNode.right);
        } else if (treeNode.val > high) {
            return trimBSTEx(treeNode.left);
        } else {
            treeNode.left = treeNode.val === low ? null : trimBSTEx(treeNode.left);
            treeNode.right = treeNode.val === high ? null : trimBSTEx(treeNode.right);
            return treeNode;
        }
    }

    return trimBSTEx(root);
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

function _trimBST(root: TreeNode | null, low: number, high: number): TreeNode | null {
    const arr = treeNode2arr(root!);
    const trimedArr = arr.filter((val) => val >= low && val <= high);
    return arr2treeNode(trimedArr);
}

function test() {
    let arr: number[] = [];
    let low: number = 0;
    let high: number = 0;
    try {
        for (let n = 1; n <= 1000; n++) {
            arr = Array.from(
                new Set(
                    Array(n)
                        .fill(undefined)
                        .map(() => Math.floor(Math.random() * 10000))
                )
            );
            low = Math.floor(Math.random() * 5000);
            high = low + Math.floor(Math.random() * 1000) + 1;
            const result = trimBST(arr2treeNode(arr), low, high);
            const _result = _trimBST(arr2treeNode(arr), low, high);
            assert.deepStrictEqual(result, _result);
        }
    } catch (e) {
        console.log(arr);
        console.log(low);
        console.log(high);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
