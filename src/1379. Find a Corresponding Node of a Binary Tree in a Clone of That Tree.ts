import assert from "assert";

function getTargetCopy(original: TreeNode | null, cloned: TreeNode | null, target: TreeNode | null): TreeNode | null {
    if (original === null) return null;
    if (original === target) return cloned;
    const _result = getTargetCopy(original.left, cloned!.left, target);
    if (_result !== null) return _result;
    const result_ = getTargetCopy(original.right, cloned!.right, target);
    return result_;
}

//TODO