import assert from 'assert';

const funcs = [
    function concatenatedBinary(n: number): number {
        if (n === 1) return 1;
        const mod = 1e9 + 7;
        let result = 1;
        let i = 2;
        let pow = 2;
        while (i < n) {
            let end = Math.min(i << 1, n);
            while (i < end) result = (result * (1 << pow) + i++) % mod;
            pow++;
        }
        result = (result * (1 << (Number.isInteger(Math.log2(n)) ? pow : pow - 1)) + i++) % mod;
        return result;
    },
    function concatenatedBinary(n: number): number {
        const mod = 1e9 + 7;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= 2 << Math.log2(i);
            result += i;
            if (result >= mod) result %= mod;
        }
        return result;
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
