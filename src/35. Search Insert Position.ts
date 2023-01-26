import assert from 'assert';

function searchInsert(nums: number[], target: number): number {
    let start = 0;
    let end = nums.length - 1;
    while (start <= end) {
        const middle = Math.floor((end + start) / 2);
        const middleNum = nums[middle];
        if (target > middleNum) {
            start = middle + 1;
        } else if (target < middleNum) {
            end = middle - 1;
        } else {
            return middle;
        }
    }

    return start;
}

function _searchInsert(nums: number[], target: number): number {
    const targetInd = nums.indexOf(target);
    if (targetInd !== -1) {
        return targetInd;
    } else {
        for (let i = 0; i <= nums.length; i++) {
            if ((nums[i - 1] === undefined || nums[i - 1] < target) && (target < nums[i] || nums[i] === undefined)) {
                return i;
            }
        }
    }
    throw new Error();
}

function test() {
    let nums: number[] = [];
    let target: number = 0;
    try {
        for (let i = 1; i < 1000; i++) {
            nums = Array.from(
                new Set(
                    Array(i)
                        .fill(undefined)
                        .map(() => Math.floor(Math.random() * 1000))
                )
            ).sort((a, b) => a - b);
            target = Math.floor(Math.random() * 1000);
            assert.strictEqual(searchInsert(nums, target), _searchInsert(nums, target));
        }
    } catch (e) {
        console.log(nums);
        console.log(target);
        console.error(e);
    }
}
test();
