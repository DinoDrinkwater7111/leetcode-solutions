import assert from 'assert';

function gameOfLife(board: number[][]): void {
    const m = board.length;
    const n = board[0].length;
    function getNextState(row: number, col: number): number {
        let liveCellCount = -(board[row][col] & 1);
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                liveCellCount += (board[row + i]?.[col + j] ?? 0) & 1;
            }
        }
        if (board[row][col] === 1) {
            if (liveCellCount == 2 || liveCellCount === 3) {
                return 0b10;
            } else {
                return 0b00;
            }
        } else {
            if (liveCellCount === 3) {
                return 0b10;
            } else {
                return 0b00;
            }
        }
    }
    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            board[row][col] |= getNextState(row, col);
        }
    }
    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            board[row][col] >>= 1;
        }
    }
}

function _gameOfLife(board: number[][]): void {
    const m = board.length;
    const n = board[0].length;
    const grid_9sum: number[][] = [];
    //sum horizontal first
    for (let row = 0; row < m; row++) {
        grid_9sum[row] = [];
        for (let col = 0; col < n; col++) {
            grid_9sum[row][col] = 0;
            for (let i = -1; i <= 1; i++) {
                grid_9sum[row][col] += board[row][col + i] ?? 0;
            }
        }
    }
    let tempRow = Array(n).fill(0);
    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            const temp = grid_9sum[row][col];
            grid_9sum[row][col] += tempRow[col] + (grid_9sum[row + 1]?.[col] ?? 0);
            tempRow[col] = temp;
        }
    }
    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            const liveCellCount = grid_9sum[row][col] - board[row][col];
            if (board[row][col] === 1) {
                if (liveCellCount == 2 || liveCellCount === 3) {
                    board[row][col] = 1;
                } else {
                    board[row][col] = 0;
                }
            } else {
                if (liveCellCount === 3) {
                    board[row][col] = 1;
                } else {
                    board[row][col] = 0;
                }
            }
        }
    }
}

function __gameOfLife(board: number[][]): void {
    function getNextState(row: number, col: number): number {
        let liveCellCount = -board[row][col];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                liveCellCount += board[row + i]?.[col + j] ?? 0;
            }
        }
        if (board[row][col] === 1) {
            if (liveCellCount == 2 || liveCellCount === 3) {
                return 1;
            } else {
                return 0;
            }
        } else {
            if (liveCellCount === 3) {
                return 1;
            } else {
                return 0;
            }
        }
    }
    const tempBoard: number[][] = [];
    for (let row = 0; row < board.length; row++) {
        tempBoard[row] = [];
        for (let col = 0; col < board[row].length; col++) {
            tempBoard[row][col] = getNextState(row, col);
        }
    }

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            board[row][col] = tempBoard[row][col];
        }
    }
}

function test() {
    let board: number[][] = [];
    try {
        for (let k = 0; k < 100; k++) {
            for (let m = 1; m <= 25; m++) {
                for (let n = 1; n <= 25; n++) {
                    board = Array(m)
                        .fill(undefined)
                        .map(() =>
                            Array(n)
                                .fill(undefined)
                                .map(() => Math.round(Math.random()))
                        );
                    const result = board.map((row) => row.slice());
                    gameOfLife(result);
                    const _result = board.map((row) => row.slice());
                    _gameOfLife(_result);
                    const __result = board.map((row) => row.slice());
                    __gameOfLife(__result);
                    assert.deepStrictEqual(result, _result);
                    assert.deepStrictEqual(_result, __result);
                }
            }
        }
    } catch (e) {
        console.log(board);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
