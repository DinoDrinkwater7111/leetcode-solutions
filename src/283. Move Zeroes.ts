import assert from 'assert';

function moveZeroes(nums: number[]): void {
    let firstZeroInd = -1;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            firstZeroInd = i;
            break;
        }
    }
    if (firstZeroInd === -1) return;
    for (let i = firstZeroInd + 1; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[firstZeroInd] = nums[i];
            nums[i] = 0;
            firstZeroInd++;
        }
    }
}

function _moveZeroes(nums: number[]): void {
    const result = nums.filter((n) => n !== 0);
    for (let i = 0; i < nums.length; i++) {
        nums[i] = result[i] ?? 0;
    }
}

function test() {
    let nums: number[] = [];
    try {
        for (let i = 1; i < 10000; i++) {
            nums = Array(i)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * 10) - 10);
            const result = nums.slice();
            moveZeroes(result);
            const _result = nums.slice();
            _moveZeroes(_result);
            assert.deepStrictEqual(result, _result);
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(nums);
            console.log(e.message);
        } else {
            console.log(nums);
            console.error(e);
        }
    }
}
test();
