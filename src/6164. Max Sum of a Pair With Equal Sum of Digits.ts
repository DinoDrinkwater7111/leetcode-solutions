import assert from 'assert';

function maximumSum(nums: number[]): number {
    //TODO
    return 0;
}

function _maximumSum(nums: number[]): number {
    const digitSum2nums: number[][] = [];
    for (const num of nums) {
        let _num = num;
        let digitSum = 0;
        while (_num > 0) {
            digitSum += _num % 10;
            _num = Math.floor(_num / 10);
        }
        digitSum2nums[digitSum] ??= [];
        digitSum2nums[digitSum].push(num);
    }
    let max = -1;
    digitSum2nums.forEach((nums) => {
        if (nums.length > 1) {
            nums.sort((a, b) => b - a);
            max = Math.max(max, nums[0] + nums[1]);
        }
    });
    return max;
}

console.log(_maximumSum([18, 43, 36, 13, 7, 81]));
console.log(_maximumSum([10, 12, 19, 14]));
