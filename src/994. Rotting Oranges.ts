import assert from 'assert';

function orangesRotting(grid: number[][]): number {
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

    let rottenCount = 0;
    let orangeCount = 0;
    let minutes = -1;
    const rottenQueue = new Queue<[number, number]>(grid.length * grid[0].length);
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === 1) orangeCount++;
            if (grid[row][col] === 2) {
                rottenCount++;
                orangeCount++;
                rottenQueue.enqueue([row, col]);
            }
        }
    }

    const offsets: [number, number][] = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];
    while (rottenQueue.count !== 0) {
        const N = rottenQueue.count;
        for (let i = 0; i < N; i++) {
            const rotten = rottenQueue.dequeue();
            const rotten_row = rotten[0];
            const rotten_col = rotten[1];
            for (const offset of offsets) {
                const adj_row = rotten_row + offset[0];
                const adj_col = rotten_col + offset[1];
                if (grid[adj_row]?.[adj_col] === 1) {
                    grid[adj_row][adj_col] = 2;
                    rottenQueue.enqueue([adj_row, adj_col]);
                    rottenCount++;
                }
            }
        }
        minutes++;
    }

    if (orangeCount === 0) {
        return 0;
    } else if (rottenCount !== orangeCount) {
        return -1;
    } else {
        return minutes;
    }
}

function _orangesRotting(grid: number[][]): number {}

function test() {
    let nums: number[] = [];
    let target: number = 0;
    try {
        for (let i = 2; i < 1000; i++) {
            nums = Array(i)
                .fill(undefined)
                .map(() => Math.random() - 0.5);
            const i1 = Math.floor(Math.random() * i);
            let i2 = Math.floor(Math.random() * i);
            while (i2 === i1) i2 = Math.floor(Math.random() * i);
            target = nums[i1] + nums[i2];
            assert.deepStrictEqual(twoSum(nums, target), _twoSum(nums, target));
        }
    } catch (e) {
        console.log(nums);
        console.log(target);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
