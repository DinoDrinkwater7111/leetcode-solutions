import assert from 'assert';

function isValidSudoku(board: string[][]): boolean {
    let row = 0;
    let boxs: [number, number, number];
    let columns: number[] = Array(9).fill(0);
    for (let i = 0; i < board.length; i++) {
        row = 0;
        if (i % 3 === 0) boxs = [0, 0, 0];
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === '.') continue;
            const num = Number(board[i][j]);
            const p = 1 << num;
            if ((row & p) === 0) row |= p;
            else return false;
            const boxCol = Math.floor(j / 3)
            if ((boxs![boxCol] & p) === 0) boxs![boxCol] |= p;
            else return false;
            if ((columns[j] & p) === 0) columns[j] |= p;
            else return false;
        }
    }

    return true;
}

function _isValidSudoku(board: string[][]): boolean {}

//TODO
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
