import * as assert from 'assert';

function lengthOfLIS(nums: number[]): number {
    function findSupInd(sortedNum: number[], start: number, end: number, target: number): number {
        if (start >= end) return start;
        const middle = Math.floor((start + end) / 2);
        if (sortedNum[middle] >= target) {
            return findSupInd(sortedNum, start, middle, target);
        } else {
            return findSupInd(sortedNum, middle + 1, end, target);
        }
    }
    const length2minNum: number[] = [Number.NEGATIVE_INFINITY];
    for (let end = 0; end < nums.length; end++) {
        const num = nums[end];
        if (num > length2minNum[length2minNum.length - 1]) {
            length2minNum.push(num);
        } else {
            const replaceTargetInd = findSupInd(length2minNum, 0, length2minNum.length - 1, num);
            length2minNum[replaceTargetInd] = num;
        }
    }
    return length2minNum.length - 1;
}

function _lengthOfLIS(nums: number[]): number {
    const cache = [1];
    let result = 1;
    for (let end = 1; end < nums.length; end++) {
        let max = 1;
        for (let previousEnd = end - 1; previousEnd >= 0; previousEnd--) {
            if (nums[previousEnd] < nums[end]) {
                max = Math.max(max, cache[previousEnd] + 1);
            }
        }
        cache[end] = max;
        result = Math.max(result, max);
    }
    return result;
}

function test() {
    let height: number[] = [];
    try {
        for (let i = 1; i < 1000; i++) {
            height = Array(i)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * 1000));
            const result = lengthOfLIS(height);
            const _result = _lengthOfLIS(height);
            assert.strictEqual(result, _result);
        }
    } catch (e) {
        console.log(height);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
