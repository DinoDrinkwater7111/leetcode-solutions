import assert from 'assert/strict';


//TODO
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    // Make nums1.length always equal or greater than nums2.length
    if (nums2.length > nums1.length) {
        const numsTemp = nums1;
        nums1 = nums2;
        nums2 = numsTemp;
    }

    class SortedArr {
        public readonly arr: number[];
        public readonly length: number;
        public readonly offsetStart: number;
        public readonly offsetEnd: number;
        public readonly lowerMiddleIndex: number;

        constructor(arg: { arr: number[] | SortedArr; offsetStart: number; offsetEnd: number }) {
            if (arg.arr instanceof SortedArr) {
                this.arr = arg.arr.arr;
                this.length = arg.arr.length;
                this.offsetStart = arg.arr.offsetStart + arg.offsetStart;
                this.offsetEnd = arg.arr.offsetEnd + arg.offsetEnd;
            } else {
                this.arr = arg.arr;
                this.length = arg.arr.length + arg.offsetStart + arg.offsetEnd;
                this.offsetStart = arg.offsetStart;
                this.offsetEnd = arg.offsetEnd;
            }
            this.lowerMiddleIndex = this.length % 2 === 0 ? this.length / 2 - 1 : (this.length - 1) / 2;
        }

        public get(index: number): number {
            return this.arr[index - this.offsetStart];
        }
    }

    const arr1 = new SortedArr({ arr: nums1, offsetStart: 0, offsetEnd: 0 });
    const arr2 = new SortedArr({ arr: nums2, offsetStart: 0, offsetEnd: 0 });

    function _findMedianSortedArrays(arg: { arr1: SortedArr; arr2: SortedArr }): number {
        if(arg.arr2.length === 0){
            if((arg.arr1.length%2)===0)
        }

        if ( arg.arr2.get(arg.arr2.lowerMiddleIndex)<arg.arr1.get(arg.arr1.lowerMiddleIndex)) {
            return _findMedianSortedArrays({

            })
        }
    }

    return _findMedianSortedArrays({ arr1: arr1, arr2: arr2 });

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
            return (this.get(this.lowerMiddleIndex) + this.get(this.higherMiddleIndex)) / 2;
        }

        public get lowerMiddleIndex() {
            return this.length / 2 - 1;
        }

        public get higherMiddleIndex() {
            return this.length / 2;
        }

        public findSuperiorIndex(arg: { start: number; end: number; target: number }): number {
            const { start, end, target } = arg;

            if (start === end) {
                if (target <= this.get(end)) return end;
                else return -1;
            }

            const middle = Math.floor((start + end) / 2);
            if (target <= this.get(middle)) {
                return this.findSuperiorIndex({
                    start: start,
                    end: middle,
                    target: target,
                });
            } else {
                return this.findSuperiorIndex({
                    start: middle + 1,
                    end: end,
                    target: target,
                });
            }
        }

        public findInferior(arg: { start: number; end: number; target: number }): number {
            const { start, end, target } = arg;

            if (start === end) {
                if (this.get(start) <= target) return start;
                else return -1;
            }

            const middle = Math.ceil((start + end) / 2);
            if (this.get(middle) <= target) {
                return this.findInferior({
                    start: middle,
                    end: end,
                    target: target,
                });
            } else {
                return this.findInferior({
                    start: start,
                    end: middle - 1,
                    target: target,
                });
            }
        }
    }

    let _nums1 = new DoubledNums(nums1);
    let _nums2 = new DoubledNums(nums2);

    if (_nums2.length === 0) return _nums1.median;

    //Make _nums1[_nums1.lowerMiddleIndex] always equal or greater than _nums2[_nums2.lowerMiddleIndex]
    if (_nums1.get(_nums1.lowerMiddleIndex) < _nums2.get(_nums2.lowerMiddleIndex)) {
        const _numsTemp = _nums1;
        _nums1 = _nums2;
        _nums2 = _numsTemp;
    }

    const superiorIndex = _nums2.findSuperiorIndex({
        start: _nums2.higherMiddleIndex,
        end: _nums2.length - 1,
        target: _nums1.get(_nums1.higherMiddleIndex),
    });
    if (superiorIndex === _nums2.higherMiddleIndex) {
        return _nums1.median;
    } else {
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
                    .map(() => Math.random() - 0.5)
                    .sort();
                nums2 = Array(j)
                    .fill(undefined)
                    .map(() => Math.random() - 0.5)
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
