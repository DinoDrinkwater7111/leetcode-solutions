import assert from "assert";

class Node {
    val: number
    children: Node[]
    constructor(val?: number) {
        this.val = (val===undefined ? 0 : val)
        this.children = []
    }
}


function preorder(root: Node | null): number[] {
    if (root === null) return [];
    const result: number[] = [root.val];
    if (root.children.length === 0) return result;
    const parentStack = [root];
    const childIndStack = [0];
    let curr = root.children[0];
    function action(node: Node) {
        result.push(node.val);
    }
    while (parentStack.length > 0) {
        if (curr.children.length === 0) {
            action(curr);
            curr = parentStack[parentStack.length - 1];
        } else {
            if (curr === parentStack[parentStack.length - 1]) {
                childIndStack[childIndStack.length - 1]++;
                if (childIndStack[childIndStack.length - 1] >= curr.children.length) {
                    parentStack.pop()
                    curr = parentStack[parentStack.length - 1];
                    childIndStack.pop();
                } else {
                    curr = curr.children[childIndStack[childIndStack.length - 1]];
                }
            } else {
                action(curr);
                parentStack.push(curr);
                childIndStack.push(0);
                curr = curr.children[0];
            }
        }
    }
    return result;
}

function _preorder(root: Node | null): number[] {
    const result: number[] = [];
    function preorderEx(node: Node | null): void {
        if (node === null) return;
        result.push(node.val);
        for (const child of node.children) {
            preorderEx(child);
        }
    }
    preorderEx(root);
    return result;
}


//TODO