import assert from 'assert';

function climbStairs(n: number): number {
    const factorialCache = [1];
    function factorial(n: number): number {
        if (factorialCache[n] !== undefined) {
            return factorialCache[n];
        } else {
            const result = n * factorial(n - 1);
            factorialCache.push();
            return result;
        }
    }

    let sum = 0;
    for (let k = 0; k <= n / 2; k++) {
        sum += factorial(n - k) / (factorial(k) * factorial(n - 2 * k));
    }

    return sum;
}

function _climbStairs(n: number): number {
    const cache = [1, 1];
    for (let k = 2; k <= n; k++) {
        cache[k] = cache[k - 1] + cache[k - 2];
    }
    return cache[n];
}

function test() {
    let nums: number = 0;
    try {
        for (let i = 1; i <= 37; i++) {
            assert.strictEqual(climbStairs(i),_climbStairs(i))
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(nums);
            console.log(e.message);
        } else {
            console.log(nums);
            console.error(e);
        }
    }
}
test();
