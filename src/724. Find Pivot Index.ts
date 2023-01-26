import assert from 'assert';

function pivotIndex(nums: number[]): number {
    const dp = [0];
    for (let i = 0; i < nums.length; i++) dp[i + 1] = dp[i] + nums[i];
    for (let i = 0; i < nums.length; i++) {
        const leftSum = dp[i];
        const rightSum = dp[nums.length] - dp[i + 1];
        if (leftSum === rightSum) return i;
    }

    return -1;
}

//TODO
