import assert from 'assert';

function maxSubArray(nums: number[]): number {
    let max = nums[0];
    let start = 0;
    let end = nums.length - 1;
    while (start <= end) {
        let leftSum = 0;
        while (leftSum >= 0 && start <= end) {
            leftSum += nums[start];
            max = Math.max(max, leftSum);
            start++;
        }
        let rightSum = 0;
        while (rightSum >= 0 && start <= end) {
            rightSum += nums[end];
            max = Math.max(max, rightSum);
            end--;
        }
    }

    return max;
}

function _maxSubArray(nums: number[]): number {
    let max = Number.MIN_SAFE_INTEGER;
    for (const num of nums) {
        max = Math.max(num, max);
    }
    const cache = nums.slice();
    for (let n = 2; n <= nums.length; n++) {
        for (let i = 0; i <= nums.length - n; i++) {
            cache[i] += nums[i + n - 1];
            max = Math.max(cache[i], max);
        }
    }
    return max;
}

function __maxSubArray(nums: number[]): number {
    let max = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < nums.length; i++) {
        for (let j = i; j < nums.length; j++) {
            let v = 0;
            for (let k = i; k <= j; k++) {
                v += nums[k];
            }
            max = Math.max(max, v);
        }
    }
    return max;
}

function test() {
    let nums: number[] = [];
    try {
        for (let i = 1; i < 500; i++) {
            nums = Array(i)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * 10) - 5);
            assert.deepStrictEqual(maxSubArray(nums), _maxSubArray(nums));
            assert.deepStrictEqual(_maxSubArray(nums.slice()), __maxSubArray(nums.slice()));
        }
    } catch (e) {
        console.log(nums);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
