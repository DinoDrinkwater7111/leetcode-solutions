import assert from 'assert';

const funcs = [
    function subarraySum(nums: number[], k: number): number {
        const dp: number[] = [nums[0]];
        for (let i = 1; i < nums.length; i++) dp[i] = dp[i - 1] + nums[i];
        const sum2Count = new Map([[0, 1]]);
        let result = 0;
        for (const sum of dp) {
            result += sum2Count.get(sum - k) ?? 0;
            sum2Count.set(sum, (sum2Count.get(sum) ?? 0) + 1);
        }
        return result;
    },
    function subarraySum(nums: number[], k: number): number {
        const dp: number[] = [0];
        for (let i = 0; i < nums.length; i++) dp[i + 1] = dp[i] + nums[i];

        let result = 0;
        for (let start = 0; start < nums.length; start++) {
            for (let end = start; end < nums.length; end++) {
                if (dp[end + 1] - dp[start] === k) result++;
            }
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
