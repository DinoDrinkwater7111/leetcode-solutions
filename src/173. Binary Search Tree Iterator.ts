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

class BSTIterator {
    private readonly stack: TreeNode[] = [];
    private curr: TreeNode | null;
    private nextNode: TreeNode | null;
    constructor(root: TreeNode | null) {
        this.curr = root;
        this.nextNode = this.findNextNode();
    }

    next(): number {
        const result = this.nextNode!.val;
        this.nextNode = this.findNextNode();
        return result;
    }

    hasNext(): boolean {
        return this.nextNode !== null;
    }

    private findNextNode(): TreeNode | null {
        while (this.curr !== null) {
            this.stack.push(this.curr);
            this.curr = this.curr.left;
        }
        if (this.stack.length === 0) return null;
        this.curr = this.stack.pop()!;
        const result = this.curr;
        this.curr = this.curr.right;
        return result;
    }
}

class _BSTIterator {
    private readonly _nodeStack: TreeNode[] = [];
    private _currentNode: TreeNode | null;
    private nextNode: TreeNode | null;
    constructor(root: TreeNode | null) {
        this._currentNode = root;
        this.nextNode = this.findNextNode();
    }

    next(): number {
        const result = this.nextNode!.val;
        this.nextNode = this.findNextNode();
        return result;
    }

    hasNext(): boolean {
        return this.nextNode !== null;
    }

    private findNextNode(): TreeNode | null {
        while (true) {
            if (this._currentNode === null) {
                if (this._nodeStack.length === 0) {
                    break;
                } else {
                    this._currentNode = this._nodeStack[this._nodeStack.length - 1];
                }
            } else if (this._currentNode === this._nodeStack[this._nodeStack.length - 1]) {
                const result = this._currentNode;
                this._currentNode = this._nodeStack.pop()!.right;
                return result;
            } else {
                this._nodeStack.push(this._currentNode);
                if (this._currentNode.left !== null) {
                    this._currentNode = this._currentNode.left;
                }
            }
        }
        return null;
    }
}
