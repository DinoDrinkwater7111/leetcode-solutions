import assert from 'assert';

function sortedSquares(nums: number[]): number[] {
    const result: number[] = [];
    let resultCurrentInd = nums.length - 1;
    let i = 0;
    let j = nums.length - 1;
    while (i <= j) {
        const square1 = nums[i] * nums[i];
        const square2 = nums[j] * nums[j];

        if (square1 >= square2) {
            result[resultCurrentInd] = square1;
            resultCurrentInd--;
            i++;
        } else {
            result[resultCurrentInd] = square2;
            resultCurrentInd--;
            j--;
        }
    }

    return result;
}

function _sortedSquares(nums: number[]): number[] {
    return nums.map((num) => num * num).sort((a, b) => a - b);
}

function test() {
    let nums: number[] = [];
    try {
        for (let i = 1; i < 1000; i++) {
            nums = Array(i)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * 1000) - 500)
                .sort((a, b) => a - b);
            assert.deepStrictEqual(sortedSquares(nums.slice()), _sortedSquares(nums.slice()));
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
