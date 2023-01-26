import assert from 'assert';

function countSmaller(nums: number[]): number[] {

}

function _countSmaller(nums: number[]): number[] {
    const result: number[] = Array(nums.length).fill(0);
    const sortedNums: number[] = [nums[nums.length - 1]];
    function findSupInd(target: number): number {
        let start = 0;
        let end = sortedNums.length;
        while (start < end) {
            const mid = (start + end) >> 1;
            if (sortedNums[mid] >= target) end = mid;
            else start = mid + 1;
        }
        return start;
    }

    for (let i = nums.length - 2; i >= 0; i--) {
        const supInd = findSupInd(nums[i]);
        sortedNums.splice(supInd, 0, nums[i]);
        result[i] = supInd;
    }

    return result;
}

//TODO
