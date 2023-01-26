import assert from 'assert/strict';

function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    // Make nums1.length always equal or greater than nums2.length
    if (nums2.length > nums1.length) {
        const numsTemp = nums1;
        nums1 = nums2;
        nums2 = numsTemp;
    }

    //Simplify Calcation
    class DoubledNums {
        constructor(public readonly nums: number[]) {}

        public get(index: number): number {
            return this.nums[Math.floor(index / 2)];
        }

        public get length() {
            return this.nums.length * 2;
        }

        public get median() {
            return (this.get(this.length / 2 - 1) + this.get(this.length / 2)) / 2;
        }
    }

    const _nums1 = new DoubledNums(nums1);
    const _nums2 = new DoubledNums(nums2);

    if (_nums2.length === 0) return _nums1.median;

    function findSuperior(arg: { nums: DoubledNums; start: number; end: number; target: number }): number {
        const { nums, start, end, target } = arg;

        if (start === end) {
            if (target <= nums.get(end)) return end;
            else return -1;
        }

        const middle = Math.floor((start + end) / 2);
        if (target <= nums.get(middle)) {
            return findSuperior({
                nums: nums,
                start: start,
                end: middle,
                target: target,
            });
        } else {
            return findSuperior({
                nums: nums,
                start: middle + 1,
                end: end,
                target: target,
            });
        }
    }

    function findInferior(arg: { nums: DoubledNums; start: number; end: number; target: number }): number {
        const { nums, start, end, target } = arg;

        if (start === end) {
            if (nums.get(start) <= target) return start;
            else return -1;
        }

        const middle = Math.ceil((start + end) / 2);
        if (nums.get(middle) <= target) {
            return findInferior({
                nums: nums,
                start: middle,
                end: end,
                target: target,
            });
        } else {
            return findInferior({
                nums: nums,
                start: start,
                end: middle - 1,
                target: target,
            });
        }
    }

    return 1;
}

function _findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    const nums3 = nums1.concat(nums2).sort();
    if (nums3.length % 2 === 0) {
        return (nums3[nums3.length / 2 - 1] + nums3[nums3.length / 2]) / 2;
    } else {
        return nums3[Math.floor(nums3.length / 2)];
    }
}

function test() {
    findMedianSortedArrays([1, 2, 3, 4], [5, 5, 6, 7]);
    return;

    let nums1: number[];
    let nums2: number[];
    try {
        for (let i = 0; i < 100; i++) {
            for (let j = 0; j < 100; j++) {
                if (i + j === 0) continue;
                nums1 = Array(i)
                    .fill(undefined)
                    .map(() => Math.random())
                    .sort();
                nums2 = Array(j)
                    .fill(undefined)
                    .map(() => Math.random())
                    .sort();
                assert.equal(findMedianSortedArrays(nums1, nums2), _findMedianSortedArrays(nums1, nums2));
            }
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(`nums1: ${nums1!}`);
            console.log(`nums2: ${nums2!}`);
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
