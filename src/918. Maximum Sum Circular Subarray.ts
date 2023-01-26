import assert from 'assert';

function maxSubarraySumCircular(nums: number[]): number {
    function minSubarray(): number {
        let min = nums[0];
        let start = 0;
        while (start < nums.length) {
            let sum = 0;
            while (sum <= 0 && start < nums.length) {
                sum += nums[start];
                min = Math.min(min, sum);
                start++;
            }
        }
        return min;
    }

    let max = nums[0];
    let start = 0;
    while (start < nums.length) {
        let sum = 0;
        let count = 0;
        while (sum >= 0 && count < nums.length) {
            sum += nums[(start + count) % nums.length];
            max = Math.max(max, sum);
            count++;
        }
        if (count === nums.length) {
            const minSubarr = minSubarray();
            if (minSubarr !== sum) {
                max = Math.max(max, sum - minSubarr);
            }
        }
        start += count;
    }
    return max;
}

function _maxSubarraySumCircular(nums: number[]): number {
    let max = Number.MIN_SAFE_INTEGER;
    for (const num of nums) {
        max = Math.max(num, max);
    }
    nums.push(...nums);
    const cache = nums.slice();
    for (let n = 2; n <= nums.length / 2; n++) {
        for (let i = 0; i <= nums.length - n; i++) {
            cache[i] += nums[i + n - 1];
            max = Math.max(cache[i], max);
        }
    }
    return max;
}

function __maxSubarraySumCircular(nums: number[]): number {
    nums.push(...nums);
    let max = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < nums.length; i++) {
        for (let j = i; j < nums.length; j++) {
            if (j - i + 1 > nums.length / 2) continue;
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
        for (let n = 0; n < 1000; n++) {
            for (let i = 1; i <= 5; i++) {
                nums = Array(i)
                    .fill(undefined)
                    .map(() => Math.floor(Math.random() * 10) - 5);
                assert.deepStrictEqual(maxSubarraySumCircular(nums.slice()), _maxSubarraySumCircular(nums.slice()));
                assert.deepStrictEqual(_maxSubarraySumCircular(nums.slice()), __maxSubarraySumCircular(nums.slice()));
            }
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
