import assert from 'assert';

const funcs = [
    function coinChange(coins: number[], amount: number): number {
        coins = coins.filter((c) => c <= amount);
        let dp: number[] = [0];
        let count = 0;
        const calculated = new Set<number>();
        while (dp.length > 0) {
            const dp_: number[] = [];
            for (const amt of dp) {
                if (amt === amount) return count;
                for (const coin of coins) {
                    const amt_ = amt + coin;
                    if (!calculated.has(amt_) && amt_ <= amount) {
                        dp_.push(amt_);
                        calculated.add(amt_);
                    }
                }
            }
            dp = dp_;
            count++;
        }
        return -1;
    },
    function coinChange(coins: number[], amount: number): number {
        coins = coins.filter((c) => c <= amount);
        const dp: number[] = [];
        function coinChangeEx(amt: number): number {
            if (amt === 0) return 0;
            if (amt < 0) return Number.POSITIVE_INFINITY;
            if (dp[amt] === undefined) {
                let min = Number.POSITIVE_INFINITY;
                for (let c of coins) {
                    min = Math.min(min, coinChangeEx(amt - c));
                }
                dp[amt] = min + 1;
            }
            return dp[amt];
        }
        const result = coinChangeEx(amount);
        if (Number.isFinite(result)) {
            return result;
        } else {
            return -1;
        }
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
