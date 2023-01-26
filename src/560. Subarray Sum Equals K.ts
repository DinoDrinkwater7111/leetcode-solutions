import assert from 'assert';

function subarraySum(nums: number[], k: number): number {
    const dp: number[] = [nums[0]];
    for (let i = 1; i < nums.length; i++) dp[i] = dp[i - 1] + nums[i];
    const sum2Count: number[] = [1];
    let result = 0;
    for (const sum of dp) {
        result += sum2Count[sum - k] ?? 0;
        sum2Count[sum] = (sum2Count[sum] ?? 0) + 1;
    }
    return result;
}

function _subarraySum(nums: number[], k: number): number {
    const dp: number[] = [0];
    for (let i = 0; i < nums.length; i++) dp[i + 1] = dp[i] + nums[i];

    let result = 0;
    for (let start = 0; start < nums.length; start++) {
        for (let end = start; end < nums.length; end++) {
            if (dp[end + 1] - dp[start] === k) result++;
        }
    }
    return result;
}

//TODO
