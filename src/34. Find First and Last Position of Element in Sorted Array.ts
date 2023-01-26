import assert from 'assert';

function searchRange(nums: number[], target: number): number[] {
    function findSupInd(): number {
        let start = 0;
        let end = nums.length;
        while (start < end) {
            const mid = (start + end) >> 1;
            if (target <= nums[mid]) end = mid;
            else start = mid + 1;
        }
        return start;
    }

    function findInfInd(): number {
        let start = 0;
        let end = nums.length;
        while (start < end) {
            const mid = Math.ceil((start + end) / 2);
            if (nums[mid] <= target) start = mid;
            else end = mid - 1;
        }
        return start;
    }

    const supInd = findSupInd();
    const infInd = findInfInd();
    return nums[supInd] === target ? [supInd, infInd] : [-1, -1];
}

function _searchRange(nums: number[], target: number): number[] {}
