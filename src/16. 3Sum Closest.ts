import assert from 'assert';

function threeSumClosest(nums: number[], target: number): number {
    nums.sort((a, b) => a - b);
    let upper = Number.POSITIVE_INFINITY;
    let lower = Number.NEGATIVE_INFINITY;
    let maxEnd = nums.length - 1;
    let i = 0;
    while (i <= nums.length - 2) {
        const num1 = nums[i];
        let start = i + 1;
        let end = maxEnd;
        while (start < end) {
            const num2 = nums[start];
            const num3 = nums[end];
            const sum = num1 + num2 + num3;
            if (sum > target) {
                upper = Math.min(upper, sum);
                end--;
                if (start === i + 1) {
                    maxEnd = end;
                }
            } else if (sum < target) {
                lower = Math.max(lower, sum);
                start++;
            } else {
                return target;
            }
        }
        while (nums[i] === num1) i++;
    }

    if (upper - target < target - lower) {
        return upper;
    } else {
        return lower;
    }
}

function _threeSumClosest(nums: number[], target: number): number {
    let upper = Number.POSITIVE_INFINITY;
    let lower = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            for (let k = j + 1; k < nums.length; k++) {
                const sum = nums[i] + nums[j] + nums[k];
                if (sum > target) {
                    upper = Math.min(upper, sum);
                } else if (sum < target) {
                    lower = Math.max(lower, sum);
                } else {
                    console.log(nums[i]);
                    console.log(nums[j]);
                    console.log(nums[k]);
                    return target;
                }
            }
        }
    }

    if (upper - target < target - lower) {
        return upper;
    } else {
        return lower;
    }
}

function test() {
    threeSumClosest([-38, 2, -2, -32, -49, 22, -40, 27, 43, -45, -14, 21], -33);
    return;
    let nums: number[] = [];
    let target: number = 0;
    try {
        for (let n = 0; n < 100; n++) {
            for (let i = 3; i < 100; i++) {
                nums = Array(i)
                    .fill(undefined)
                    .map(() => Math.floor(Math.random() * 100 - 50));
                target = Math.floor(Math.random() * 100 - 50);
                const actual = threeSumClosest(nums.slice(), target);
                const expected = _threeSumClosest(nums.slice(), target);
                assert.strictEqual(actual, expected);
            }
        }
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
