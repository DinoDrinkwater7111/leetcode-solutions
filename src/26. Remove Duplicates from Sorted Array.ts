import assert from 'assert';

function removeDuplicates(nums: number[]): number {
    let n = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[n] !== nums[i]) {
            n++;
            nums[n] = nums[i];
        }
    }
    return n + 1;
}

function _removeDuplicates(nums: number[]): number {
    const resultNums = Array.from(new Set(nums)).sort((a, b) => a - b);
    nums.length = 0;
    nums.push(...resultNums);
    return nums.length;
}

function test() {
    let nums: number[] = [];
    try {
        for (let n = 1; n < 1000; n++) {
            nums = Array(n)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * n))
                .sort((a, b) => a - b);
            const _nums = [...nums];
            const result = removeDuplicates(nums);
            const _result = _removeDuplicates(_nums);
            assert.strictEqual(result, _result);
            assert.deepStrictEqual(nums.slice(0, result), _nums.slice(0, _result));
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
