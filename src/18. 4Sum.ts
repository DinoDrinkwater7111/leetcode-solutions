import assert from 'assert';

function fourSum(nums: number[], target: number): number[][] {
    if (nums.length < 4) return [];
    nums.sort((a, b) => a - b);

    const result: number[][] = [];
    for (let i = 0; i < nums.length - 3; i++) {
        for (let j = i + 1; j < nums.length - 2; j++) {
            let k = j + 1;
            let l = nums.length - 1;
            while (k < l) {
                const sum = nums[i] + nums[j] + nums[k] + nums[l];
                if (sum > target) {
                    l--;
                } else if (sum < target) {
                    k++;
                } else {
                    result.push([nums[i], nums[j], nums[k], nums[l]]);
                    const num_k = nums[k];
                    while (nums[k] === num_k) k++;
                    const num_l = nums[l];
                    while (nums[l] === num_l) l--;
                }
            }
            while (nums[j + 1] === nums[j]) j++;
        }
        while (nums[i + 1] === nums[i]) i++;
    }

    return result;
}

function _fourSum(nums: number[], target: number): number[][] {
    const result: number[][] = [];
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            for (let k = j + 1; k < nums.length; k++) {
                for (let l = k + 1; l < nums.length; l++) {
                    if (new Set([i, j, k, l]).size !== 4) continue;
                    if (nums[i] + nums[j] + nums[k] + nums[l] === target) {
                        result.push([nums[i], nums[j], nums[k], nums[l]]);
                    }
                }
            }
        }
    }
    const resultSet = new Set(result.map((arr) => arr.sort((a, b) => a - b).join('::')));

    return Array.from(resultSet).map((s) => s.split('::').map((numStr) => parseInt(numStr)));
}

function test() {
    let nums: number[] = [];
    let target: number = 0;
    function assertResult(actual: number[][], expected: number[][]) {
        assert.strictEqual(actual.length, expected.length);
        const actualStrArr = actual.map((v) => v.sort().join('|')).sort();
        const expectedStrArr = expected.map((v) => v.sort().join('|')).sort();
        assert.deepStrictEqual(actualStrArr, expectedStrArr);
    }
    try {
        for (let n = 0; n < 10; n++) {
            for (let i = 0; i < 20; i++) {
                nums = Array(i)
                    .fill(undefined)
                    .map(() => Math.floor(Math.random() * 100 - 50));
                target = Array(4)
                    .fill(undefined)
                    .map(() => nums[Math.floor(Math.random() * nums.length)])
                    .reduce((p, c) => p + c, 0);
                assertResult(fourSum(nums.slice(), target), _fourSum(nums.slice(), target));
            }
        }
        nums = [1, 0, -1, 0, -2, 2];
        target = 0;
        assertResult(fourSum(nums.slice(), target), _fourSum(nums.slice(), target));
        nums = [2, 2, 2, 2, 2];
        target = 8;
        assertResult(fourSum(nums.slice(), target), _fourSum(nums.slice(), target));
        nums = [
            10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 20, 20, 20, 20, 20, 20, 20,
            20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
            30, 30, 30, 30, 30, 30, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 50,
            50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 60, 60, 60, 60, 60, 60, 60, 60,
            60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70,
            70, 70, 70, 70, 70, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 90, 90,
            90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,
        ];
        target = 200;
        assertResult(fourSum(nums.slice(), target), _fourSum(nums.slice(), target));
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
