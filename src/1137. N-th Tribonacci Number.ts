import assert from 'assert';

function tribonacci(n: number): number {
    const cache = [0, 1, 1];
    function tribonacciEx(n: number) {
        if (cache[n] !== undefined) {
            return cache[n];
        } else {
            cache[n] = tribonacciEx(n - 1) + tribonacciEx(n - 2) + tribonacciEx(n - 3);
            return cache[n];
        }
    }

    return tribonacciEx(n);
}

function _tribonacci(n: number): number {
    if (n === 0) return 0;
    if (n === 1) return 1;
    if (n === 2) return 1;
    return _tribonacci(n - 1) + _tribonacci(n - 2) + _tribonacci(n - 3);
}

function test() {
    let n: number = 0;
    try {
        for (let i = 0; i <= 37; i++) {
            assert.deepStrictEqual(tribonacci(n), _tribonacci(n));
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(n);
            console.log(e.message);
        } else {
            console.log(n);
            console.error(e);
        }
    }
}
test();
