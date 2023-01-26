import assert from "assert";

function canMakeArithmeticProgression(arr: number[]): boolean {
    arr.sort((a, b) => a - b);
    const d = arr[1] - arr[0];
    for (let i = 2; i < arr.length; i++) {
        if (arr[i] - arr[i - 1] !== d) return false;
    }
    return true;
}
function _canMakeArithmeticProgression(arr: number[]): boolean {
    arr.sort((a, b) => a - b);
    const d = arr[1] - arr[0];
    for (let i = 2; i < arr.length; i++) {
        if (arr[i] - arr[i - 1] !== d) return false;
    }
    return true;
}

//TODO


