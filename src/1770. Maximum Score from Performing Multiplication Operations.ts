import assert from 'assert';

const funcs = [
    function maximumScore(nums: number[], multipliers: number[]): number {
        const dp: number[] = Array(multipliers.length + 1).fill(0);
        for (let i = multipliers.length - 1; i >= 0; i--) {
            for (let j = 0; j <= i; j++) {
                dp[j] = Math.max(
                    dp[j] + nums[i - j] * multipliers[i],
                    dp[j + 1] + nums[nums.length - 1 - j] * multipliers[i]
                );
            }
        }
        return dp[0];
    },
    function maximumScore(nums: number[], multipliers: number[]): number {
        const dp: number[][] = Array(multipliers.length)
            .fill(undefined)
            .map(() => []);
        function maximumScoreEx(lCount: number, rCount: number): number {
            if (lCount + rCount === multipliers.length) return 0;
            if (dp[lCount][rCount] === undefined) {
                const multiplier = multipliers[lCount + rCount];
                dp[lCount][rCount] = Math.max(
                    maximumScoreEx(lCount + 1, rCount) + nums[lCount] * multiplier,
                    maximumScoreEx(lCount, rCount + 1) + nums[nums.length - 1 - rCount] * multiplier
                );
            }
            return dp[lCount][rCount];
        }
        return maximumScoreEx(0, 0);
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
