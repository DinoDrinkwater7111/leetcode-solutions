import assert from 'assert';

function maxScoreSightseeingPair(values: number[]): number {
    let max = 1;
    let max_vi = values[0];
    for (let j = 1; j < values.length; j++) {
        max = Math.max(max, max_vi + values[j] - j);
        max_vi = Math.max(max_vi, values[j] + j);
    }
    return max;
}

function _maxScoreSightseeingPair(values: number[]): number {
    let max = 1;
    for (let i = 0; i < values.length - 1; i++) {
        for (let j = i + 1; j < values.length; j++) {
            max = Math.max(max, values[j] + values[i] + i - j);
        }
    }
    return max;
}

function test() {
    let nums: number[] = [];
    try {
        for (let n = 0; n < 10; n++) {
            for (let i = 0; i < 100; i++) {
                nums = Array(i)
                    .fill(undefined)
                    .map(() => Math.floor(Math.random() * 100) + 2);
                assert.strictEqual(maxScoreSightseeingPair(nums.slice()), _maxScoreSightseeingPair(nums.slice()));
            }
        }
    } catch (e) {
        console.log(nums);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
