import assert from 'assert';

function containsDuplicate(nums: number[]): boolean {
    const has: null[] = [];
    for (const num of nums) {
        if (has[num] === null) {
            return true;
        } else {
            has[num] = null;
        }
    }
    return false;
}

function _containsDuplicate(nums: number[]): boolean {
    const numSet = new Set();
    for (const num of nums) {
        if (numSet.has(num)) {
            return true;
        } else {
            numSet.add(num);
        }
    }
    return false;
}

function __containsDuplicate(nums: number[]): boolean {
    nums.sort((a, b) => a - b);
    let previous = nums[0];
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === previous) {
            return true;
        } else {
            previous = nums[i];
        }
    }
    return false;
}

function test() {
    let nums: number[] = [];
    try {
        for (let i = 1; i < 1000; i++) {
            nums = Array(i)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * 1000) - 500);
            assert.equal(containsDuplicate(nums.slice()), _containsDuplicate(nums.slice()));
            assert.equal(_containsDuplicate(nums.slice()), __containsDuplicate(nums.slice()));
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(nums);
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
