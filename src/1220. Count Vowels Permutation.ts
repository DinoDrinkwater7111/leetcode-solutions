import assert from 'assert';

const funcs = [
    function countVowelPermutation(n: number): number {
        const mod = 10 ** 9 + 7;
        //a,e,i,o,u
        let dp = [1, 1, 1, 1, 1];
        for (let i = 2; i <= n; i++) {
            const dp_ = [0, 0, 0, 0, 0];
            dp_[0] = (dp[1] + dp[2] + dp[4]) % mod;
            dp_[1] = (dp[0] + dp[2]) % mod;
            dp_[2] = (dp[1] + dp[3]) % mod;
            dp_[3] = dp[2] % mod;
            dp_[4] = (dp[2] + dp[3]) % mod;
            dp = dp_;
        }
        return (dp[0] + dp[1] + dp[2] + dp[3] + dp[4]) % mod;
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
