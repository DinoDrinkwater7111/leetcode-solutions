import assert from 'assert';

function searchMatrix(matrix: number[][], target: number): boolean {
    let start = 0;
    const m = matrix[0].length;
    let end = matrix.length * matrix[0].length - 1;
    while (start <= end) {
        const middle = Math.floor((start + end) / 2);
        const middleNum = matrix[Math.floor(middle / m)][middle % m];
        if (middleNum === target) return true;
        if (middleNum < target) {
            start = middle + 1;
        } else {
            end = middle - 1;
        }
    }

    return false;
}

function _searchMatrix(matrix: number[][], target: number): boolean {}

//TODO
function test() {
    let nums: number[] = [];
    let target: number = 0;
    try {
        for (let i = 2; i < 1000; i++) {
            nums = Array(i)
                .fill(undefined)
                .map(() => Math.random() - 0.5);
            const i1 = Math.floor(Math.random() * i);
            let i2 = Math.floor(Math.random() * i);
            while (i2 === i1) i2 = Math.floor(Math.random() * i);
            target = nums[i1] + nums[i2];
            assert.deepStrictEqual(twoSum(nums, target), _twoSum(nums, target));
        }
    } catch (e) {
        console.log(nums);
        console.log(target);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
