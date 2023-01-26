import assert from 'assert';

function hammingWeight(n: number): number {
    let count = 0;
    while (n > 0) {
        count += n & 1;
        n >>>= 1;
    }
    return count;
}

function _hammingWeight(n: number): number {
    let count = 0;
    while (n > 0) {
        if (n % 2 === 1) count++;
        n = Math.floor(n / 2);
    }
    return count;
}

function test() {
    let n: number = 0;
    try {
        for (n = 0; n <= 1024; n++) {
            assert.deepStrictEqual(hammingWeight(n), _hammingWeight(n));
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
