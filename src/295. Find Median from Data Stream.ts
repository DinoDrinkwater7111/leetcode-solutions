import assert from 'assert';

const classes = [
    //TODO priority queue
    class MedianFinder {
        private readonly nums: number[] = [];
        constructor() {}

        private findSupInd(target: number): number {
            let l = 0;
            let r = this.nums.length;
            while (l < r) {
                const m = (l + r) >> 1;
                if (target <= this.nums[m]) r = m;
                else l = m + 1;
            }
            return l;
        }

        addNum(num: number): void {
            this.nums.splice(this.findSupInd(num), 0, num);
        }

        findMedian(): number {
            const mid = this.nums.length >> 1;
            if ((this.nums.length & 1) === 0) {
                return (this.nums[mid - 1] + this.nums[mid]) / 2;
            } else {
                return this.nums[mid];
            }
        }
    },
];
