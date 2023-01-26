import assert from 'assert';

function numberOfPairs(nums: number[]): number[] {
    const num2Count: number[] = [];
    for (let i = 0; i < nums.length; i++) num2Count[nums[i]] = (num2Count[nums[i]] ?? 0) + 1;
    let nPair = 0;
    for (const count of num2Count) nPair += count >> 1;
    return [nPair, nums.length - (nPair << 1)];
}

function _numberOfPairs(nums: number[]): number[] {
    //TODO
    return [];
}

console.log(numberOfPairs([1, 3, 2, 1, 3, 2, 2]));
console.log(numberOfPairs([1, 1]));
console.log(numberOfPairs([0]));
