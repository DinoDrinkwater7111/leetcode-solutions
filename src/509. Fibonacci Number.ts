import assert from 'assert';

function fib(n: number): number {
    const cache = [0, 1];
    function fibEx(n: number) {
        if (cache[n] !== undefined) {
            return cache[n];
        } else {
            cache[n] = fibEx(n - 1) + fibEx(n - 2);
            return cache[n];
        }
    }

    return fibEx(n);
}

function _fib(n: number): number {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return _fib(n - 1) + _fib(n - 2);
}

function test() {
    let n: number = 0;
    try {
        for (let i = 0; i < 30; i++) {
            assert.deepStrictEqual(fib(n), _fib(n));
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
