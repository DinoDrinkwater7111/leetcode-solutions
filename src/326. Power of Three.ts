import assert from 'assert';
import { performance } from 'perf_hooks';

const funcs = [
    function isPowerOfThree(n: number): boolean {
        return n > 0 && 1162261467 % n == 0;
    },
    function isPowerOfThree(n: number): boolean {
        return [
            1, 3, 9, 27, 81, 243, 729, 2187, 6561, 19683, 59049, 177147, 531441, 1594323, 4782969, 14348907, 43046721,
            129140163, 387420489, 1162261467,
        ].includes(n);
    },
    function isPowerOfThree(n: number): boolean {
        if (n < 1) return false;
        const x = Math.log(n) / Math.log(3);
        return 3 ** Math.round(x) === n;
    },
];

type TestCase = Parameters<typeof funcs[number]>;
function* testCaseIterator(): Generator<TestCase> {
    for (let i = 0; i < 268435456; i++) {
        yield [i];
    }
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
