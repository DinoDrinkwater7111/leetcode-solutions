import assert from 'assert';

function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    if (nums1.length < nums2.length) {
        const numsTemp = nums1;
        nums1 = nums2;
        nums2 = numsTemp;
    }
    class NumArr {
        public readonly nums: number[];
        public effectiveStart: number;
        public effectiveEnd: number;
        public start: number;
        public end: number;

        constructor(arg: { nums: number[]; effectiveStart: number; effectiveEnd: number; start: number; end: number }) {
            this.nums = arg.nums;
            this.start = arg.start;
            this.end = arg.end;
            this.effectiveStart = arg.effectiveStart;
            this.effectiveEnd = arg.effectiveEnd;
        }

        public get length(): number {
            return this.end - this.start + 1;
        }

        public get lowerMiddleInd(): number {
            return this.start + Math.floor((this.length - 1) / 2);
        }

        public get lowerMiddle(): number {
            return this.get(this.start + Math.floor((this.length - 1) / 2));
        }

        public get higherMiddleInd(): number {
            return this.start + Math.ceil((this.length - 1) / 2);
        }

        public get higherMiddle(): number {
            return this.get(this.start + Math.ceil((this.length - 1) / 2));
        }

        public get(index: number): number {
            if (index < this.effectiveStart) {
                return Number.NEGATIVE_INFINITY;
            } else if (index > this.effectiveEnd) {
                return Number.POSITIVE_INFINITY;
            } else {
                return this.nums[index];
            }
        }

        public print(): void {
            const resArr: number[] = [];
            for (let i = this.start; i <= this.end; i++) {
                resArr.push(this.get(i));
            }
            console.log(
                JSON.stringify(
                    resArr.map((n) => {
                        switch (n) {
                            case Number.NEGATIVE_INFINITY:
                                return '-∞';
                            case Number.POSITIVE_INFINITY:
                                return '+∞';
                            default:
                                return n.toString();
                        }
                    })
                )
            );
        }
    }

    let arr1 = new NumArr({
        nums: nums1,
        effectiveEnd: nums1.length - 1,
        effectiveStart: 0,
        end: nums1.length - 1,
        start: 0,
    });
    let arr2 = new NumArr({
        nums: nums2,
        effectiveEnd: nums2.length - 1,
        effectiveStart: 0,
        end: nums2.length - 1,
        start: 0,
    });

    while (arr2.length > 1 && arr1.effectiveEnd >= arr1.effectiveStart) {
        let _arr1: NumArr = arr1;
        let _arr2: NumArr = arr2;

        if (arr2.length > 1) {
            if (arr1.lowerMiddle < arr2.lowerMiddle) {
                _arr1 = new NumArr({
                    nums: arr1.nums,
                    effectiveStart: arr1.lowerMiddleInd + (arr1.length % 2 === 0 ? 1 : 0),
                    effectiveEnd: arr1.effectiveEnd,
                    end: arr1.end,
                    start: arr1.start,
                });
            } else {
                _arr1 = new NumArr({
                    nums: arr1.nums,
                    effectiveStart: arr1.effectiveStart,
                    effectiveEnd: arr1.effectiveEnd,
                    end: arr1.end,
                    start: arr1.start - (arr2.lowerMiddleInd - arr2.start + (arr2.length % 2 === 0 ? 1 : 0)),
                });
                _arr2 = new NumArr({
                    nums: arr2.nums,
                    effectiveStart: arr2.effectiveStart,
                    effectiveEnd: arr2.effectiveEnd,
                    end: arr2.end,
                    start: arr2.lowerMiddleInd + (arr2.length % 2 === 0 ? 1 : 0),
                });
            }
        }

        let arr1_: NumArr = _arr1;
        let arr2_: NumArr = _arr2;

        if (_arr2.length > 1) {
            if (_arr1.higherMiddle > _arr2.higherMiddle) {
                arr1_ = new NumArr({
                    nums: _arr1.nums,
                    effectiveStart: _arr1.effectiveStart,
                    effectiveEnd: _arr1.higherMiddleInd - (_arr1.length % 2 === 0 ? 1 : 0),
                    end: _arr1.end,
                    start: _arr1.start,
                });
            } else {
                arr1_ = new NumArr({
                    nums: _arr1.nums,
                    effectiveStart: _arr1.effectiveStart,
                    effectiveEnd: _arr1.effectiveEnd,
                    end: _arr1.end + (_arr2.end - _arr2.higherMiddleInd + (_arr2.length % 2 === 0 ? 1 : 0)),
                    start: _arr1.start,
                });
                arr2_ = new NumArr({
                    nums: _arr2.nums,
                    effectiveStart: _arr2.effectiveStart,
                    effectiveEnd: _arr2.effectiveEnd,
                    end: _arr2.higherMiddleInd - (_arr2.length % 2 === 0 ? 1 : 0),
                    start: _arr2.start,
                });
            }
        }

        arr1 = arr1_;
        arr2 = arr2_;
    }

    if (arr1.effectiveEnd < arr1.effectiveStart) {
        return (arr2.lowerMiddle + arr2.higherMiddle) / 2;
    }

    switch (arr2.length) {
        case 0:
            return (arr1.lowerMiddle + arr1.higherMiddle) / 2;
        case 1: {
            if ((nums1.length + nums2.length) % 2 === 0) {
                const smallNums = [
                    arr1.get(arr1.lowerMiddleInd - 1),
                    arr1.lowerMiddle,
                    arr1.get(arr1.lowerMiddleInd + 1),
                    arr2.get(arr2.start),
                ];
                smallNums.sort((a, b) => a - b);
                return (smallNums[1] + smallNums[2]) / 2;
            } else {
                const smallNums = [arr1.lowerMiddle, arr1.higherMiddle, arr2.get(arr2.start)];
                smallNums.sort((a, b) => a - b);
                return smallNums[1];
            }
        }
        case 2:
            return (arr2.get(arr2.start) + arr2.get(arr2.end)) / 2;
        default:
            arr1.print();
            arr2.print();
    }

    throw new Error();
}

function _findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    const nums3 = nums1.concat(nums2).sort((a, b) => a - b);
    if (nums3.length % 2 === 0) {
        return (nums3[nums3.length / 2 - 1] + nums3[nums3.length / 2]) / 2;
    } else {
        return nums3[Math.floor(nums3.length / 2)];
    }
}

function test() {
    {
        const N = 1000000;
        const nums1 = Array(N)
            .fill(undefined)
            .map(() => Math.random() - 0.5)
            .sort((a, b) => a - b);
        const nums2 = Array(N/2)
            .fill(undefined)
            .map(() => Math.random() - 0.5)
            .sort((a, b) => a - b);
        {
            const t1 = performance.now();
            findMedianSortedArrays(nums1, nums2);
            const t2 = performance.now();
            console.log(t2 - t1);
        }
        {
            const t1 = performance.now();
            _findMedianSortedArrays(nums1, nums2);
            const t2 = performance.now();
            console.log(t2 - t1);
        }
    }
    return;

    let nums1: number[];
    let nums2: number[];
    try {
        for (let k = 0; k < 10; k++) {
            for (let i = 0; i < 100; i++) {
                for (let j = 0; j < 100; j++) {
                    if (i + j === 0) continue;
                    nums1 = Array(i)
                        .fill(undefined)
                        .map(() => Math.random() - 0.5)
                        .sort((a, b) => a - b);
                    nums2 = Array(j)
                        .fill(undefined)
                        .map(() => Math.random() - 0.5)
                        .sort((a, b) => a - b);
                    assert.equal(findMedianSortedArrays(nums1, nums2), _findMedianSortedArrays(nums1, nums2));
                }
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
