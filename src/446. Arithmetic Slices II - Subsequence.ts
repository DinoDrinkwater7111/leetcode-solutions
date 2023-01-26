import assert from 'assert';

const funcs = [
    function numberOfArithmeticSlices(nums: number[]): number {
        /** dp[endInd][d] = number of all sequences(len>=2) with diff d and end with endInd */
        const dp: Map<number, number>[] = Array(nums.length)
            .fill(undefined)
            .map(() => new Map());
        let result = 0;
        for (let i = 1; i < nums.length; i++) {
            for (let j = i - 1; j >= 0; j--) {
                const d = nums[i] - nums[j];
                let dp_i_d = dp[i].get(d) ?? 0;
                let dp_j_d = dp[j].get(d) ?? 0;
                dp_i_d += dp_j_d + 1;
                result += dp_j_d;
                dp[i].set(d, dp_i_d);
            }
        }
        return result;
    },
    function numberOfArithmeticSlices(nums: number[]): number {
        /** dp[endInd][d] = number of all sequences(len>=2) with diff d and end with endInd */
        const dp: number[][] = Array(nums.length)
            .fill(undefined)
            .map(() => []);
        function numberOfArithmeticSlicesEx(endInd: number, d: number): number {
            if (dp[endInd][d] === undefined) {
                const num = nums[endInd];
                dp[endInd][d] = 0;
                for (let i = endInd - 1; i >= 0; i--) {
                    if (nums[i] + d === num) dp[endInd][d] += numberOfArithmeticSlicesEx(i, d) + 1;
                }
            }
            return dp[endInd][d];
        }

        let result = 0;
        for (let i = 1; i < nums.length; i++) {
            for (let j = i - 1; j >= 0; j--) {
                const d = nums[i] - nums[j];
                result += numberOfArithmeticSlicesEx(j, d);
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
        const json = JSON.stringify(testCase);
        assert.deepStrictEqual(
            funcs[actualFuncInd](...(JSON.parse(json) as TestCase)),
            funcs[expectedFuncInd](...(JSON.parse(json) as TestCase))
        );
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
