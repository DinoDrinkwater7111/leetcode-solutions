import assert from 'assert';

function updateMatrix(mat: number[][]): number[][] {
    if (mat.length === 0) return mat;

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

    const preCalQueue = new Queue<[number, number]>(mat.length * mat[0].length);
    for (let row = 0; row < mat.length; row++) {
        for (let col = 0; col < mat[row].length; col++) {
            if (mat[row][col] === 1) {
                mat[row][col] = Number.MAX_SAFE_INTEGER;
            } else {
                preCalQueue.enqueue([row, col]);
            }
        }
    }

    const adjOffsets: [number, number][] = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];
    while (preCalQueue.count !== 0) {
        const point = preCalQueue.dequeue();
        for (const adjOffset of adjOffsets) {
            const adj_row = point[0] + adjOffset[0];
            const adj_col = point[1] + adjOffset[1];
            if (mat[adj_row]?.[adj_col] !== undefined && mat[adj_row][adj_col] > mat[point[0]][point[1]] + 1) {
                mat[adj_row][adj_col] = mat[point[0]][point[1]] + 1;
                preCalQueue.enqueue([adj_row, adj_col]);
            }
        }
    }

    return mat;
}

function _updateMatrix(mat: number[][]): number[][] {
    for (let row = 0; row < mat.length; row++) {
        for (let col = 0; col < mat[row].length; col++) {
            if (mat[row][col] === 1) {
                mat[row][col] = null as never;
            }
        }
    }

    for (let row = 0; row < mat.length; row++) {
        for (let col = 0; col < mat[row].length; col++) {
            if (mat[row][col] === null) {
                if (mat[row - 1]?.[col] === 0) mat[row][col] = 1;
                if (mat[row + 1]?.[col] === 0) mat[row][col] = 1;
                if (mat[row]?.[col - 1] === 0) mat[row][col] = 1;
                if (mat[row]?.[col + 1] === 0) mat[row][col] = 1;
            }
        }
    }

    const nullCells = new Map<number, number[]>();
    for (let row = 0; row < mat.length; row++) {
        for (let col = 0; col < mat[row].length; col++) {
            if (mat[row][col] === null) {
                const cells = nullCells.get(row) ?? [];
                cells.push(col);
                nullCells.set(row, cells);
            }
        }
    }

    const nullCellRows = Array.from(nullCells.keys());

    function search(row: number, col: number, depth: number): number | null {
        for (let i = 0; i < depth; i++) {
            //up to right
            if (mat[row - depth + i]?.[col + i] === 0) return depth;
            //right to down
            if (mat[row + i]?.[col + depth - i] === 0) return depth;
            //down to left
            if (mat[row + depth - i]?.[col - i] === 0) return depth;
            //left to top
            if (mat[row - i]?.[col - depth + i] === 0) return depth;
        }
        return null;
    }
    while (nullCellRows.length > 0) {
        const rolInd = Math.floor(Math.random() * nullCellRows.length);
        const row = nullCellRows[rolInd];
        const cols = nullCells.get(row)!;
        const colInd = Math.floor(Math.random() * cols.length);
        const col = cols[colInd];

        {
            let up = mat[row - 1]?.[col];
            let down = mat[row + 1]?.[col];
            let left = mat[row]?.[col - 1];
            let right = mat[row]?.[col + 1];
            if (up !== null && down !== null && left !== null && right !== null) {
                mat[row][col] =
                    Math.min(
                        up ?? Number.MAX_SAFE_INTEGER,
                        down ?? Number.MAX_SAFE_INTEGER,
                        left ?? Number.MAX_SAFE_INTEGER,
                        right ?? Number.MAX_SAFE_INTEGER
                    ) + 1;
            } else {
                for (let depth = 1; mat[row][col] === null; depth++) {
                    mat[row][col] = search(row, col, depth) as never;
                }
            }
        }

        {
            cols[colInd] = cols[cols.length - 1];
            cols.pop();
            if (cols.length === 0) {
                nullCellRows[rolInd] = nullCellRows[nullCellRows.length - 1];
                nullCellRows.pop();
            }
        }
    }

    return mat;
}

function __updateMatrix(mat: number[][]): number[][] {
    if (mat.length === 0) return mat;

    let calcuated: boolean[][] = [];
    function updateMatrixEx(row: number, col: number): void {
        const target = mat[row]?.[col];
        if (target === undefined) return;
        if (calcuated[row][col]) return;
        const min_up = mat[row - 1]?.[col] ?? Number.MAX_SAFE_INTEGER;
        const min_down = mat[row + 1]?.[col] ?? Number.MAX_SAFE_INTEGER;
        const min_left = mat[row]?.[col - 1] ?? Number.MAX_SAFE_INTEGER;
        const min_right = mat[row]?.[col + 1] ?? Number.MAX_SAFE_INTEGER;
        mat[row][col] = Math.min(min_up, min_down, min_left, min_right, (target ?? Number.MAX_SAFE_INTEGER) - 1) + 1;
        calcuated[row][col] = true;
        updateMatrixEx(row - 1, col);
        updateMatrixEx(row + 1, col);
        updateMatrixEx(row, col - 1);
        updateMatrixEx(row, col + 1);
    }

    for (let row = 0; row < mat.length; row++) {
        for (let col = 0; col < mat[row].length; col++) {
            if (mat[row][col] === 1) {
                mat[row][col] = null as never;
            }
        }
    }

    for (let row = 0; row < mat.length; row++) {
        for (let col = 0; col < mat[row].length; col++) {
            if (mat[row][col] === 0) {
                calcuated = mat.map(() => []);
                updateMatrixEx(row, col);
            }
        }
    }

    return mat;
}

function test() {
    let mat: number[][] = [];
    try {
        for (let i = 2; i < 100; i++) {
            mat = Array(i)
                .fill(undefined)
                .map(() => new Array(3).fill(undefined).map(() => Math.floor(Math.random() * 2)));
            assert.deepStrictEqual(
                updateMatrix(mat.map((row) => row.slice())),
                _updateMatrix(mat.map((row) => row.slice()))
            );
            assert.deepStrictEqual(
                updateMatrix(mat.map((row) => row.slice())),
                __updateMatrix(mat.map((row) => row.slice()))
            );
        }
    } catch (e) {
        console.log(mat);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
