import assert from 'assert';

function maximumUniqueSubarray(nums: number[]): number {
    let sum = nums[0];
    let start = 0;
    let result = 0;
    let num2index: number[] = [];
    num2index[nums[0]] = 0;
    for (let i = 1; i < nums.length; i++) {
        const num = nums[i];
        if (num2index[num] !== undefined) {
            result = Math.max(result, sum);
            while (start <= num2index[num]) {
                sum -= nums[start];
                num2index[nums[start]] = undefined as never;
                start++
            }
        }
        sum += num;
        num2index[num] = i;
    }
    result = Math.max(result, sum);
    return result;
}

function _maximumUniqueSubarray(nums: number[]): number {}

//TODO
