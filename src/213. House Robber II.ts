import assert from 'assert';

function rob(nums: number[]): number {
    class Queue<T> {
        private readonly arr: T[] = [];
        private _start = 0;
        private _count = 0;

        public get count(): number {
            return this._count;
        }

        constructor(public readonly length: number) {}

        public enqueue(val: T) {
            if (this._count === this.length) {
                throw new Error('FULL');
            }
            this.arr[(this._start + this._count) % this.length] = val;
            this._count++;
        }

        public dequeue(): T {
            if (this._count === 0) {
                throw new Error('EMPTY');
            }
            const result = this.arr[this._start];
            this._start = (this._start + 1) % this.length;
            this._count--;
            return result;
        }

        public get(i: number): T {
            if (i < 0 || i >= this.count) {
                throw new Error('INDEX OUT OF RANGE');
            }
            return this.arr[(this._start + i) % this.length];
        }
    }

    if (nums.length === 1) return nums[0];
    if (nums.length === 2) return Math.max(nums[0], nums[1]);
    if (nums[0] === 0 || nums[nums.length - 1] === 0) {
        for (let i = 2; i < nums.length; i++) {
            nums[i] += Math.max(nums[i - 2], nums[i - 3] ?? 0);
        }
        return Math.max(nums[nums.length - 1], nums[nums.length - 2]);
    } else {
        const sumQueue = new Queue<number>(3);
        const usedFirstQueue = new Queue<boolean>(3);
        sumQueue.enqueue(nums[0]);
        usedFirstQueue.enqueue(true);
        sumQueue.enqueue(nums[1]);
        usedFirstQueue.enqueue(false);
        sumQueue.enqueue(nums[0] + nums[2]);
        usedFirstQueue.enqueue(true);
        for (let i = 3; i < nums.length; i++) {
            const sum_0 = sumQueue.dequeue();
            const usedFirst_0 = usedFirstQueue.dequeue();
            if (sumQueue.get(0) > sum_0) {
                sumQueue.enqueue(sumQueue.get(0) + nums[i]);
                usedFirstQueue.enqueue(usedFirstQueue.get(0));
            } else {
                sumQueue.enqueue(sum_0 + nums[i]);
                usedFirstQueue.enqueue(usedFirst_0);
            }
        }

        if (usedFirstQueue.get(usedFirstQueue.length - 1)) {
            nums[0] = 0;
            for (let i = 2; i < nums.length; i++) {
                nums[i] += Math.max(nums[i - 2], nums[i - 3] ?? 0);
            }
            return Math.max(
                nums[nums.length - 1],
                sumQueue.get(sumQueue.length - 2),
                sumQueue.get(sumQueue.length - 3)
            );
        } else {
            return Math.max(sumQueue.get(sumQueue.length - 2), sumQueue.get(sumQueue.length - 1));
        }
    }
}

function _rob(nums: number[]): number {
    if (nums.length === 1) return nums[0];

    function robEx(nums: number[], start: number): number {
        if (start >= nums.length) return 0;
        if (start === nums.length - 1) return nums[start];
        return Math.max(robEx(nums, start + 2) + nums[start], robEx(nums, start + 3) + nums[start + 1]);
    }
    
    return Math.max(robEx(nums.slice(0, nums.length - 1), 0), robEx(nums.slice(1, nums.length), 0));
}

function test() {
    let nums: number[] = [];
    try {
        for (let n = 0; n < 10; n++) {
            for (let i = 1; i <= 10; i++) {
                nums = Array(i)
                    .fill(undefined)
                    .map(() => Math.floor(Math.random() * 1001));
                assert.strictEqual(rob(nums.slice()), _rob(nums.slice()));
            }
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(nums);
            console.log(e.message);
        } else {
            console.log(nums);
            console.error(e);
        }
    }
}
test();
