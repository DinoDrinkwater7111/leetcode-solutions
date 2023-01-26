import assert from 'assert';

const funcs = [
    function longestCommonSubsequence(text1: string, text2: string): number {
        let dp: number[] = [];
        {
            let hasText1FirstChar = false;
            for (let end2 = 0; end2 < text2.length; end2++) {
                if (text1[0] === text2[end2]) hasText1FirstChar = true;
                dp[end2] = hasText1FirstChar ? 1 : 0;
            }
        }
        for (let end1 = 1; end1 < text1.length; end1++) {
            const _dp: number[] = [];
            _dp[0] = dp[0] === 1 || text1[end1] === text2[0] ? 1 : 0;
            for (let end2 = 1; end2 < text2.length; end2++) {
                if (text1[end1] === text2[end2]) _dp[end2] = dp[end2 - 1] + 1;
                else _dp[end2] = Math.max(dp[end2], _dp[end2 - 1]);
            }
            dp = _dp;
        }

        return dp[text2.length - 1];
    },
    function longestCommonSubsequence(text1: string, text2: string): number {
        const dp: number[][] = Array(text1.length)
            .fill(undefined)
            .map(() => []);
        function longestCommonSubsequenceEx(i1: number, i2: number): number {
            if (i1 === text1.length || i2 === text2.length) return 0;
            if (dp[i1][i2] === undefined) {
                if (text1[i1] === text2[i2]) dp[i1][i2] = 1 + longestCommonSubsequenceEx(i1 + 1, i2 + 1);
                else dp[i1][i2] = Math.max(longestCommonSubsequenceEx(i1 + 1, i2), longestCommonSubsequenceEx(i1, i2 + 1));
            }
            return dp[i1][i2];
        }
        return longestCommonSubsequenceEx(0, 0);
    },
    function longestCommonSubsequence(text1: string, text2: string): number {
        const text2_char2Indexs = new Map<string, number[]>();
        for (let i = 0; i < text2.length; i++) {
            const char = text2[i];
            const indexs = text2_char2Indexs.get(char) ?? [];
            indexs.push(i);
            text2_char2Indexs.set(char, indexs);
        }
        const dp: number[][] = [];
        for (let end1 = 0; end1 < text1.length; end1++) {
            dp[end1] ??= [];
            for (let end2 = 0; end2 < text2.length; end2++) {
                if (end1 === 0) {
                    const indexs = text2_char2Indexs.get(text1[end1]) ?? [Number.POSITIVE_INFINITY];
                    dp[end1][end2] = indexs[0] <= end2 ? 1 : 0;
                    continue;
                }
                if (end2 === 0) {
                    dp[end1][end2] = dp[end1 - 1][end2] === 1 || text1[end1] === text2[end2] ? 1 : 0;
                    continue;
                }
                if (text1[end1] === text2[end2]) {
                    dp[end1][end2] = dp[end1 - 1][end2 - 1] + 1;
                    continue;
                }
                //else
                {
                    dp[end1][end2] = Math.max(dp[end1 - 1][end2], dp[end1][end2 - 1]);
                }
            }
        }

        return dp[text1.length - 1][text2.length - 1];
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
