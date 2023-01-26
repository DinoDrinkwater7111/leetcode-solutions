import assert from 'assert';

function findKthLargest(nums: number[], k: number): number {
    const num2Count: number[] = [];
    for (const num of nums) {
        // As Array.some cannot give correct key on negative key, 
        // shift num to non-negative first
        const shiftedNum = num + 10000;
        num2Count[shiftedNum] = (num2Count[shiftedNum] ?? 0) + 1;
    }
    let count = 0;
    let result = -1;
    // kth largest element = Nth smallest element
    const N = nums.length - k + 1;
    // Array.some loop in ascending order of keys
    // better than Array.foreach as we can break the loop by returning true
    num2Count.some((numCount, num) => {
        count += numCount;
        result = num;
        return count >= N;
    });
    return result - 10000;
}

function _findKthLargest(nums: number[], k: number): number {
    return nums.sort((a, b) => b - a)[k - 1];
}

//TODO
