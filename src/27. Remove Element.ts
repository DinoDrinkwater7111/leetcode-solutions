import assert from 'assert';

function removeElement(nums: number[], val: number): number {
    function swap(i: number, j: number) {
        const temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    let start = 0;
    let end = nums.length - 1;
    let result = 0;

    while (start <= end) {
        if (nums[start] === val) {
            swap(start, end);
            end--;
        } else {
            result++;
            start++;
        }
    }
    return result;
}

function _removeElement(nums: number[], val: number): number {
    let result = 0;
    const _nums = nums.filter((num) => {
        if (num === val) {
            return false;
        } else {
            result++;
            return true;
        }
    });
    for (let i = 0; i < _nums.length; i++) {
        nums[i] = _nums[i];
    }

    return result;
}

function test() {
    let nums: number[] = [];
    let val: number = 0;
    const charPool = ['1', '2', '3'];
    try {
        for (let i = 1; i < 1000; i++) {
            nums = Array(i)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * 10));
            val = Math.floor(Math.random() * 10);

            const actualNums = nums.slice();
            const actual = removeElement(actualNums, val);
            const expectedNums = nums.slice();
            const expected = _removeElement(expectedNums, val);
            assert.strictEqual(actual, expected);
            assert.deepStrictEqual(actualNums.slice(0, actual).sort(), expectedNums.slice(0, expected).sort());
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(nums);
            console.log(val);
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
