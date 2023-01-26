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

function convertBST(root: TreeNode | null): TreeNode | null {
    if (root === null) return null;
    function convertBSTEx(node: TreeNode, sum: number): number {
        const sum_ = node.right === null ? sum : convertBSTEx(node.right, sum);
        node.val += sum_;
        const _sum = node.left === null ? node.val : convertBSTEx(node.left, node.val);
        return _sum;
    }
    convertBSTEx(root, 0);
    return root;
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

function _convertBST(root: TreeNode | null): TreeNode | null {
    if (root === null) return null;
    const valArr = treeNode2arr(root);
    const sortedValArr = valArr.slice().sort((a, b) => a - b);
    const sums: number[] = [];
    sums[valArr.length - 1] = 0;
    for (let i = valArr.length - 2; i >= 0; i--) {
        sums[i] = sums[i + 1] + sortedValArr[i + 1];
    }
    const val2sortedInd = new Map<number, number>();
    for (let i = 0; i < sortedValArr.length; i++) {
        const val = sortedValArr[i];
        val2sortedInd.set(val, i);
    }

    let currentLevelNodes: TreeNode[] = [root];
    while (currentLevelNodes.length !== 0) {
        const currentLevelNodes_: TreeNode[] = [];
        for (const node of currentLevelNodes) {
            node.val += sums[val2sortedInd.get(node.val)!];
            if (node.left !== null) {
                currentLevelNodes_.push(node.left);
            }
            if (node.right !== null) {
                currentLevelNodes_.push(node.right);
            }
        }
        currentLevelNodes = currentLevelNodes_;
    }
    return root;
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
            const result = convertBST(arr2treeNode(arr));
            const _result = _convertBST(arr2treeNode(arr));
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
