import assert from 'assert';

function majorityElement(nums: number[]): number {
    let candidate = nums[0];
    let count = 1;
    for (const num of nums) {
        if (count === 0) candidate = num;
        count += num === candidate ? 1 : -1;
    }
    return candidate;
}

function _majorityElement(nums: number[]): number {
    const mid = Math.floor(nums.length / 2);
    const num2Count: number[] = [];
    for (const num of nums) {
        num2Count[num] = (num2Count[num] ?? 0) + 1;
        if (num2Count[num] > mid) return num;
    }
    throw new Error();
}


//TODO
