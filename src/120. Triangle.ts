import assert from 'assert';

function minimumTotal(triangle: number[][]): number {
    for (let level = 1; level < triangle.length; level++) {
        for (let col = 0; col < triangle[level].length; col++) {
            triangle[level][col] += Math.min(
                triangle[level - 1][col - 1] ?? Number.MAX_SAFE_INTEGER,
                triangle[level - 1][col] ?? Number.MAX_SAFE_INTEGER
            );
        }
    }

    return Math.min(...triangle[triangle.length - 1]);
}

function _minimumTotal(triangle: number[][]): number {}

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
