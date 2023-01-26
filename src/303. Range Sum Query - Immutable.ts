import assert from "assert";

class NumArray {
    private readonly dp: number[] = [0];
    constructor(nums: number[]) {
        for (let i = 0; i < nums.length; i++) {
            this.dp[i + 1] = this.dp[i] + nums[i];
        }
    }

    sumRange(left: number, right: number): number {
        return this.dp[right + 1] - this.dp[left];
    }
}

//TODO