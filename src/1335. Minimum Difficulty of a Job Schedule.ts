import assert from 'assert';

const funcs = [
    function minDifficulty(jobDifficulty: number[], d: number): number {
        if (jobDifficulty.length < d) return -1;

        let dp = [jobDifficulty[0]];
        for (let i = 1; i <= jobDifficulty.length - d; i++) dp[i] = Math.max(dp[i - 1], jobDifficulty[i]);
        for (let day = 1; day < d; day++) {
            const maxEnd = jobDifficulty.length - (d - day);
            const dp_: number[] = Array(maxEnd + 1).fill(Number.POSITIVE_INFINITY);
            for (let i = day; i <= maxEnd; i++) {
                let max = Number.NEGATIVE_INFINITY;
                for (let j = i; j >= day; j--) {
                    max = Math.max(max, jobDifficulty[j]);
                    dp_[i] = Math.min(dp_[i], max + dp[j - 1]);
                }
            }
            dp = dp_;
        }

        return dp[jobDifficulty.length - 1];
    },
    function minDifficulty(jobDifficulty: number[], d: number): number {
        function max(start: number, end: number): number {
            let max = Number.NEGATIVE_INFINITY;
            for (let i = start; i < end; i++) max = Math.max(max, jobDifficulty[i]);
            return max;
        }

        // [day, start]
        const dp: number[][] = Array(d + 1)
            .fill(undefined)
            .map(() => []);
        function minDifficultyEx(day: number, start: number): number {
            if (jobDifficulty.length - start < d - day + 1) return Number.POSITIVE_INFINITY;
            if (day === d) return max(start, jobDifficulty.length);
            if (dp[day][start] === undefined) {
                let min = Number.POSITIVE_INFINITY;
                for (let i = 1; start + i < jobDifficulty.length; i++) {
                    min = Math.min(min, minDifficultyEx(day + 1, start + i) + max(start, start + i));
                }
                dp[day][start] = min;
            }
            return dp[day][start];
        }

        const result = minDifficultyEx(1, 0);
        return result === Number.POSITIVE_INFINITY ? -1 : result;
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
