import assert from 'assert';

function rob(nums: number[]): number {
    if (nums.length === 1) return nums[0];
    for (let i = 2; i < nums.length; i++) {
        nums[i] += Math.max(nums[i - 2], nums[i - 3] ?? 0);
    }
    return Math.max(nums[nums.length - 1], nums[nums.length - 2]);
}

function _rob(nums: number[]): number {
    function robEx(start: number): number {
        if (start >= nums.length) return 0;
        if (start === nums.length - 1) return nums[start];
        return Math.max(robEx(start + 2) + nums[start], robEx(start + 3) + nums[start + 1]);
    }

    return robEx(0);
}

function test() {
    let nums: number[] = [];
    try {
        for (let n = 0; n < 10; n++) {
            for (let i = 1; i <= 10; i++) {
                nums = Array(i)
                    .fill(undefined)
                    .map(() => Math.floor(Math.random() * 401));
                assert.strictEqual(rob(nums.slice()), _rob(nums.slice()));
            }
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(nums);
            console.log(e.message);
        } else {
            console.log(nums);
            console.error(e);
        }
    }
}
test();
