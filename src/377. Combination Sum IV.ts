import assert from 'assert';

function combinationSum4(nums: number[], target: number): number {
    nums = nums.filter((n) => n <= target);
    if (nums.length === 0) return 0;
    let dp: number[] = [];
    function combinationSum4Ex(sum: number): number {
        if (sum === 0) return 1;
        if (sum < 0) return 0;
        if (dp[sum] === undefined) {
            let count = 0;
            for (let num of nums) {
                count += combinationSum4Ex(sum - num);
            }
            dp[sum] = count;
        }
        return dp[sum];
    }
    return combinationSum4Ex(target);
}

function _combinationSum4(nums: number[], target: number): number {
    //TODO
}

function test() {
    let nums: number[] = [];
    let target: number = 0;
    try {
        for (let n = 1; n < 200; n++) {
            nums = Array(n)
                .fill(0)
                .map(() => Math.ceil(Math.random() * 1000));
            target = Math.ceil(Math.random() * 1000);
            assert.deepStrictEqual(combinationSum4(nums, target), _combinationSum4(nums, target));
        }
    } catch (e) {
        console.log(nums);
        console.log(target);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
