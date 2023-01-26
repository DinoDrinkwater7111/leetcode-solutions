import assert from 'assert';

function nextPermutation(nums: number[]): void {
    function reverse(start: number, end: number): void {
        const mid = Math.ceil((end - start) / 2);
        for (let i = 0; i < mid; i++) {
            [nums[start + i], nums[end - i]] = [nums[end - i], nums[start + i]];
        }
    }

    function findRightMostSupInd(start: number, end: number, target: number): number {
        while (start < end) {
            let mid = Math.ceil((start + end) / 2);
            if (nums[mid] >= target) start = mid;
            else end = mid - 1;
        }
        return start;
    }

    let i = nums.length - 1;
    for (; i >= 1; i--) {
        if (nums[i] > nums[i - 1]) break;
    }
    if (i === 0) {
        nums.reverse();
    } else {
        const supInd = findRightMostSupInd(i, nums.length - 1, nums[i - 1]);
        [nums[i - 1], nums[supInd]] = [nums[supInd], nums[i - 1]];
        reverse(i, nums.length - 1);
    }
}

function _nextPermutation(nums: number[]): void {}

//TODO
function test() {
    let nums: number[] = [];
    try {
        for (let i = 2; i < 10000; i++) {
            const result = nextPermutation(nums);
            const _result = _nextPermutation(nums);
            assert.deepStrictEqual(result, _result);
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
