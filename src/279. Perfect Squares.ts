import assert from 'assert';

function numSquares(n: number): number {
    const squares = Array(101)
        .fill(0)
        .map((v, i) => i ** 2);
    const calulated: null[] = [];
    let dp: number[] = [0];
    for (let count = 1; true; count++) {
        const dp_: number[] = [];
        for (const num of dp) {
            for (let i = 1; i < squares.length; i++) {
                const num_ = num + squares[i];
                if (num_ > n) break;
                if (num_ === n) return count;
                if (calulated[num_] !== null) {
                    calulated[num_] = null;
                    dp_.push(num_);
                }
            }
        }
        dp = dp_;
    }
}

function _numSquares(n: number): number {
    if (Number.isInteger(Math.sqrt(n))) return 1;
    const squares = Array(100)
        .fill(0)
        .map((v, i) => (i + 1) ** 2);
    let min = 4;
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] > n) break;
        for (let j = i; j < squares.length; j++) {
            const sum_2 = squares[i] + squares[j];
            if (sum_2 > n) break;
            if (sum_2 === n) return 2;
            if (Number.isInteger(Math.sqrt(n - sum_2))) min = 3;
        }
    }
    return min;
}

function test() {
    let n: number = 0;
    try {
        for (n = 1; n <= 10000; n++) {
            assert.deepStrictEqual(numSquares(n), _numSquares(n));
        }
    } catch (e) {
        console.log(n);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
