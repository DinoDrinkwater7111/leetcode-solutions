import assert from 'assert';

function search(nums: number[], target: number): number {
    let minInd = 0;
    if (nums[0] > nums[nums.length - 1]) {
        let start = 0;
        let end = nums.length - 1;
        while (end - start > 1) {
            const mid = (start + end) >> 1;
            if (nums[start] > nums[mid]) end = mid;
            else start = mid;
        }
        minInd = nums.length - start;
    }
    {
        let start = minInd;
        let end = minInd + nums.length - 1;
        while (start < end) {
            const mid = (start + end) >> 1;
            if (target <= nums[mid % nums.length]) end = mid;
            else start = mid + 1;
        }
        return nums[start % nums.length] === target ? start % nums.length : -1;
    }
}

function _search(nums: number[], target: number): number {
    //TODO
}
