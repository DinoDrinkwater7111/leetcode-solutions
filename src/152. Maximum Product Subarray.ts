import assert from 'assert';

function maxProduct(nums: number[]): number {
    let max = Number.MIN_SAFE_INTEGER;
    let has0 = false;
    let prod = 1;
    let count = 0;
    let firstNegativeProd = 1;
    for (let i = 0; i <= nums.length; i++) {
        const num = nums[i];
        if (num === 0 || num === undefined) {
            if (count > 1) {
                max = Math.max(prod / firstNegativeProd, max);
            }
            has0 ||= num === 0;
            prod = 1;
            count = 0;
            firstNegativeProd = 1;
        } else {
            prod *= num;
            if (firstNegativeProd === 1 && prod < 0) {
                firstNegativeProd = prod;
            }
            max = Math.max(max, prod);
            count++;
        }
    }
    return Math.max(max, has0 ? 0 : Number.MIN_SAFE_INTEGER);
}

function _maxProduct(nums: number[]): number {
    let max = Number.MIN_SAFE_INTEGER;
    for (const num of nums) {
        max = Math.max(num, max);
    }
    const cache = nums.slice();
    for (let n = 2; n <= nums.length; n++) {
        for (let i = 0; i <= nums.length - n; i++) {
            cache[i] *= nums[i + n - 1];
            max = Math.max(cache[i], max);
        }
    }
    return max;
}

function __maxProduct(nums: number[]): number {
    let max = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < nums.length; i++) {
        for (let j = i; j < nums.length; j++) {
            let v = 1;
            for (let k = i; k <= j; k++) {
                v *= nums[k];
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
            for (let i = 1; i <= 10; i++) {
                nums = Array(i)
                    .fill(undefined)
                    .map(() => Math.floor(Math.random() * 20) - 10);
                assert.deepStrictEqual(maxProduct(nums.slice()), _maxProduct(nums.slice()));
                assert.deepStrictEqual(_maxProduct(nums.slice()), __maxProduct(nums.slice()));
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
