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

function recoverTree(root: TreeNode | null): void {
    if (root === null) return;
    let candidateNodes: TreeNode[] = [];
    let lastNode: TreeNode | null = null;
    function dfs(node: TreeNode): void {
        if (candidateNodes.length === 4) return;
        if (node.left !== null) dfs(node.left);
        if (lastNode !== null && lastNode.val > node.val) {
            candidateNodes.push(lastNode, node);
        }
        lastNode = node;
        if (node.right !== null) dfs(node.right);
    }
    dfs(root);
    switch (candidateNodes.length) {
        case 2:
            [candidateNodes[0].val, candidateNodes[1].val] = [candidateNodes[1].val, candidateNodes[0].val];
            break;
        case 4:
            [candidateNodes[0].val, candidateNodes[3].val] = [candidateNodes[3].val, candidateNodes[0].val];
            break;
        default:
            throw new Error();
    }
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

function _recoverTree(root: TreeNode | null): void {
    if (root === null) return;
    const arr: number[] = [];
    const val2Node = new Map<number, TreeNode>();
    function dfs(node: TreeNode) {
        if (node.left !== null) dfs(node.left);
        arr.push(node.val);
        val2Node.set(node.val, node);
        if (node.right !== null) dfs(node.right);
    }
    dfs(root);
    const sotredArr = arr.slice().sort((a, b) => a - b);
    const swapTarget: number[] = [];
    for (let i = 0; i < arr.length; i++) {
        if (sotredArr[i] !== arr[i]) {
            swapTarget.push(i);
        }
    }
    const swapTarget1 = swapTarget[0];
    const swapTarget2 = swapTarget[1];
    val2Node.get(arr[swapTarget1])!.val = arr[swapTarget2];
    val2Node.get(arr[swapTarget2])!.val = arr[swapTarget1];
}

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
