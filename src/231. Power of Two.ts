import assert from 'assert';

function isPowerOfTwo(n: number): boolean {
    return n > 0 && (n & (n - 1)) === 0;
}

function _isPowerOfTwo(n: number): boolean {
    if (n <= 0) return false;
    return Number.isInteger(Math.log2(n));
}

function test() {
    let n: number = 0;
    try {
        for (n = -1024; n <= 1024; n++) {
            assert.deepStrictEqual(isPowerOfTwo(n), _isPowerOfTwo(n));
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
