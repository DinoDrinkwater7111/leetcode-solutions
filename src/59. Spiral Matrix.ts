import * as assert from 'assert';

function generateMatrix(n: number): number[][] {
    const result: number[][] = Array(n)
        .fill(0)
        .map((row) => Array(n).fill(0));
    let direction2Offset: [number, number][] = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];
    let i = 0;
    let j = 0;
    let direction = 0;
    const N = n ** 2;
    for (let count = 1; count <= N; count++) {
        result[i][j] = count;
        let [i_offset, j_offset] = direction2Offset[direction]!;
        const nextCell = result[i + i_offset]?.[j + j_offset];
        if (nextCell === undefined || nextCell !== 0) {
            direction = (direction + 1) % 4;
            [i_offset, j_offset] = direction2Offset[direction];
        }
        i += i_offset;
        j += j_offset;
    }
    return result;
}

function _generateMatrix(n: number): number[][] {
    //TODO
}

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
