import assert from 'assert';

function threeSum(nums: number[]): number[][] {
    if (nums.length < 3) return [];

    nums.sort((a, b) => a - b);

    const result: number[][] = [];
    let maxEnd = nums.length - 1;
    let i = 0;

    while (i <= nums.length - 2) {
        const num1 = nums[i];
        if (num1 > 0) break;
        let start = i + 1;
        {
            const max = -(num1 + nums[start]);
            while (nums[maxEnd] > max) maxEnd--;
        }
        let end = maxEnd;
        while (start < end) {
            const num2 = nums[start];
            const num3 = nums[end];
            if (num1 + num2 + num3 > 0) {
                end--;
            } else if (num1 + num2 + num3 < 0) {
                start++;
            } else {
                result.push([num1, nums[start], num3]);
                const numStart = nums[start];
                const numEnd = nums[end];
                while (nums[start] === numStart) start++;
                while (nums[end] === numEnd) end--;
            }
        }
        while (nums[i] === num1) i++;
    }

    return result;
}

function _threeSum(nums: number[]): number[][] {
    const result: number[][] = [];
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            for (let k = j + 1; k < nums.length; k++) {
                if (i === j || j === k || k === i) continue;
                if (nums[i] + nums[j] + nums[k] === 0) {
                    result.push([nums[i], nums[j], nums[k]]);
                }
            }
        }
    }
    const resultSet = new Set(result.map((arr) => arr.sort((a, b) => a - b).join('::')));

    return Array.from(resultSet).map((s) => s.split('::').map((numStr) => parseInt(numStr)));
}

function test() {
    let nums: number[] = [];
    try {
        for (let n = 0; n < 100; n++) {
            for (let i = 0; i < 100; i++) {
                nums = Array(i)
                    .fill(undefined)
                    .map(() => Math.floor(Math.random() * 100 - 50));
                const actual = threeSum(nums.slice());
                const expected = _threeSum(nums.slice());
                assert.equal(actual.length, expected.length);
                const actualStrArr = actual.map((v) => v.sort().join('|')).sort();
                const expectedStrArr = expected.map((v) => v.sort().join('|')).sort();
                for (let i = 0; i < expected.length; i++) {
                    assert.deepStrictEqual(actualStrArr, expectedStrArr);
                }
            }
        }
        assert.deepStrictEqual(threeSum([0, 0, 0, 0]), _threeSum([0, 0, 0, 0]));
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
