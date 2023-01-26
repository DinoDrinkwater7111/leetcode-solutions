import assert from 'assert';

function numberOfArithmeticSlices(nums: number[]): number {
    let result = 0;
    let cache = 0;
    function checkMinSlice(i: number): boolean {
        return nums[i] - nums[i - 1] === nums[i - 1] - nums[i - 2];
    }
    for (let i = 2; i < nums.length; i++) {
        if (checkMinSlice(i)) {
            cache++;
            result += cache;
        } else {
            cache = 0;
        }
    }
    return result;
}

function _numberOfArithmeticSlices(nums: number[]): number {
    if (nums.length < 3) return 0;
    let result = 0;
    let d = nums[1] - nums[0];
    let start = 0;
    let end = 1;
    while (end < nums.length) {
        const d_ = nums[end + 1] - nums[end];
        if (d_ === d) {
            end++;
        } else {
            const length = end - start + 1;
            if (length >= 3) {
                result += ((length - 2) * (length - 1)) / 2;
            }
            d = d_;
            start = end;
            end = start + 1;
        }
    }
    const length = end - start + 1;
    if (length >= 3) {
        result += ((length - 2) * (length - 1)) / 2;
    }
    return result;
}

function __numberOfArithmeticSlices(nums: number[]): number {
    let result = 0;
    function check(i: number, j: number) {
        const d = nums[i + 1] - nums[i];
        for (let k = i + 1; k <= j - 1; k++) {
            if (nums[k + 1] - nums[k] !== d) return false;
        }
        return true;
    }
    for (let i = 0; i <= nums.length - 3; i++) {
        for (let j = i + 2; j < nums.length; j++) {
            result += check(i, j) ? 1 : 0;
        }
    }
    return result;
}

function test() {
    let nums: number[] = [];
    try {
        for (let i = 1; i < 1000; i++) {
            nums = Array(i)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * 100));
            assert.deepStrictEqual(numberOfArithmeticSlices(nums), _numberOfArithmeticSlices(nums));
            assert.deepStrictEqual(_numberOfArithmeticSlices(nums), __numberOfArithmeticSlices(nums));
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
