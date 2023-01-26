import assert from 'assert';

const funcs = [
    function numRollsToTarget(n: number, k: number, target: number): number {
        if (target < n || target > n * k) return 0;
        const mod = 1e9 + 7;
        let dp: number[] = Array(k + 1).fill(1);
        for (let i = 2; i <= n; i++) {
            const dp_: number[] = Array(i * k + 1).fill(0);
            for (let j = 1; j <= k; j++) {
                for (let l = i - 1; l < dp.length; l++) {
                    dp_[l + j] += dp[l];
                }
            }
            for (let j = i; j < dp_.length; j++) dp_[j] %= mod;
            dp = dp_;
        }
        return dp[target];
    },
    function numRollsToTarget(n: number, k: number, target: number): number {
        const mod = 1e9 + 7;
        // dp[n, target]
        const dp: number[][] = Array(n + 1)
            .fill(undefined)
            .map(() => []);
        function numRollsToTargetEx(n: number, target: number): number {
            if (n < 0 || target < 0) return 0;
            if (dp[n][target] === undefined) {
                if (n === 1 && 1 <= target && target <= k) return 1;
                let sum = 0;
                for (let i = 1; i <= k; i++) {
                    sum += numRollsToTargetEx(n - 1, target - i);
                }
                dp[n][target] = sum % mod;
            }
            return dp[n][target];
        }

        return numRollsToTargetEx(n, target);
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
