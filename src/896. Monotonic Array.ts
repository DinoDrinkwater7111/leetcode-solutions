import assert from 'assert';

function isMonotonic(nums: number[]): boolean {
    let isDecresing = true;
    let isIncresing = true;
    for (let i = 1; i < nums.length && (isIncresing || isDecresing); i++) {
        isDecresing &&= nums[i - 1] >= nums[i];
        isIncresing &&= nums[i - 1] <= nums[i];
    }
    return isDecresing || isIncresing;
}

function _isMonotonic(nums: number[]): boolean {}
