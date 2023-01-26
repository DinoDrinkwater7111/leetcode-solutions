import assert from 'assert';

function search(nums: number[], target: number): number {
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

    return -1;
}

function _search(nums: number[], target: number): number {
    return nums.indexOf(target);
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
            assert.strictEqual(search(nums, target), _search(nums, target));
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(nums);
            console.log(target);
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
