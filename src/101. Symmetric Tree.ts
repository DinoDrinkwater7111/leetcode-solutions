import assert from "assert";

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

function isSymmetric(root: TreeNode | null): boolean {
    let _node = root!.left;
    let node_ = root!.right;
    while (_node !== null && node_ !== null) {
        if (_node.val !== node_.val) return false;
        if (_node.left === null && node_.right === null) {
            _node = _node.right;
            node_ = node_.left;
        } else if (_node.left !== null && node_.right !== null) {
            let _traveler = _node.left;
            let traveler_ = node_.right;
            while (_traveler.right !== null && _traveler.right !== _node) {
                if (!(traveler_.left !== null && traveler_.left !== node_)) return false;
                _traveler = _traveler.right;
                traveler_ = traveler_.left;
            }
            if (_traveler.right === null && traveler_.left === null) {
                _traveler.right = _node;
                _node = _node.left;
                traveler_.left = node_;
                node_ = node_.right;
            } else if (_traveler.right === _node && traveler_.left === node_) {
                _traveler.right = null;
                _node = _node.right;
                traveler_.left = null;
                node_ = node_.left;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    return _node === node_;
}

function _isSymmetric(root: TreeNode | null): boolean {
    function isSymmetricEx(_node: TreeNode | null, node_: TreeNode | null): boolean {
        if (_node === null && node_ === null) {
            return true;
        } else if (_node !== null && node_ !== null) {
            if (_node.val !== node_.val) return false;
            return isSymmetricEx(_node.left, node_.right) && isSymmetricEx(_node.right, node_.left);
        } else {
            return false;
        }
    }

    return isSymmetricEx(root!.left, root!.right);
}


//TODO