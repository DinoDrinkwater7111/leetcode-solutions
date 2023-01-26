import assert from 'assert';

const funcs = [
    function climbStairs(n: number): number {
        let _dp = 1;
        let dp = 1;
        for (let i = 2; i <= n; i++) {
            const temp = dp;
            dp += _dp;
            _dp = temp;
        }
        return dp;
    },
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
    },
    function climbStairs(n: number): number {
        const cache = [1, 1];
        for (let k = 2; k <= n; k++) {
            cache[k] = cache[k - 1] + cache[k - 2];
        }
        return cache[n];
    },
];

type TestCase = Parameters<typeof funcs[number]>;
function* testCaseIterator(): Generator<TestCase> {
    //TODO
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
