import assert from 'assert';

function twoSum(nums: number[], target: number): number[] {
    let start = 0;
    let end = nums.length - 1;
    while (start < end) {
        const substracted = target - nums[start];
        while (nums[end] > substracted) {
            end--;
        }
        if (nums[end] === substracted) {
            return [start + 1, end + 1];
        } else {
            start++;
        }
    }
    throw new Error();
}

function _twoSum(nums: number[], target: number): number[] {
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (i === j) continue;
            if (nums[i] + nums[j] === target) {
                return [i + 1, j + 1];
            }
        }
    }
    throw new Error();
}

function test() {
    let nums: number[] = [];
    let target: number = 0;
    try {
        for (let i = 2; i < 1000; i++) {
            nums = Array.from(
                new Set(
                    Array(i)
                        .fill(undefined)
                        .map(() => Math.floor(Math.random() * 1000) - 1000)
                )
            ).sort((a, b) => a - b);
            const i1 = Math.floor(Math.random() * nums.length);
            let i2 = Math.floor(Math.random() * nums.length);
            while (i2 === i1) i2 = Math.floor(Math.random() * i);
            target = nums[i1] + nums[i2];
            assert.deepStrictEqual(twoSum(nums, target), _twoSum(nums, target));
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(nums);
            console.log(target);
            console.log(e.message);
        } else {
            console.log(nums);
            console.log(target);
            console.error(e);
        }
    }
}
test();
