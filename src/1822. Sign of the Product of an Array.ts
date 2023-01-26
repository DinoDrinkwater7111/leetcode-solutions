import assert from "assert";

function arraySign(nums: number[]): number {
    let result = 1;
    for (const num of nums) {
        if (num < 0) {
            result ^= 1;
            continue;
        }
        if (num === 0) return 0;
    }
    return result === 0 ? -1 : 1;
}

function _arraySign(nums: number[]): number {
    let result = 1;
    for (const num of nums) result *= Math.sign(num);
    return result;
}

//TODO