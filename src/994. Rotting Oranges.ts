import assert from 'assert';

const funcs = [
    function orangesRotting(grid: number[][]): number {
        const M = grid.length;
        const N = grid[0].length;
        const freshSet = new Set<number>();
        let candidates = new Set<number>();
        for (let i = 0; i < M; i++) {
            for (let j = 0; j < N; j++) {
                switch (grid[i][j]) {
                    case 1:
                        freshSet.add(i * N + j);
                        break;
                    case 2:
                        candidates.add(i * N + j);
                        break;
                }
            }
        }
        if (freshSet.size === 0) return 0;
        let nMinute = -1;
        while (candidates.size > 0) {
            const candidates_ = new Set<number>();
            for (const candidate of candidates.values()) {
                freshSet.delete(candidate);
                candidates_.add(candidate - N);
                candidates_.add(candidate + N);
                if (candidate % N !== 0) candidates_.add(candidate - 1);
                if (candidate % N !== N - 1) candidates_.add(candidate + 1);
            }
            for (const candidate_ of candidates_.values()) {
                if (!freshSet.has(candidate_)) candidates_.delete(candidate_);
            }
            candidates = candidates_;
            nMinute++;
        }

        return freshSet.size > 0 ? -1 : nMinute;
    },
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
    },
];

type TestCase = Parameters<typeof funcs[number]>;
function* testCaseIterator(): Generator<TestCase> {
    for (let i = 0; i < 1000; i++) {
        for (let m = 1; m <= 10; m++) {
            for (let n = 1; n <= 10; n++) {
                const mat = Array(m)
                    .fill(undefined)
                    .map(() =>
                        Array(n)
                            .fill(0)
                            .map(() => Math.floor(Math.random() * 3))
                    );
                yield [mat];
            }
        }
    }
}

function test(testCase: TestCase, actualFuncInd: number, expectedFuncInd: number): boolean {
    try {
        assert.deepStrictEqual(funcs[actualFuncInd](...testCase), funcs[expectedFuncInd](...testCase));
        return true;
    } catch (e) {
        console.log('❌'.repeat(32));
        console.log(`actualFuncInd: ${actualFuncInd}`);
        console.log(`expectedFuncInd: ${expectedFuncInd}`);
        console.log(`testCase: ${JSON.stringify(testCase)}`);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
        return false;
    }
}

{
    let count = 0;
    outer: for (const testCase of testCaseIterator()) {
        if (++count < 10) {
            console.log('----------------------------------------------------');
            console.log(`Testcase ${count}:`);
            console.log(JSON.stringify(testCase, undefined, 2));
        }
        for (let i = 0; i < funcs.length - 1; i++) {
            if (!test(testCase, i, i + 1)) break outer;
        }
    }
}
