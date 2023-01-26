import assert from 'assert';

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
}

function _longestCommonSubsequence(text1: string, text2: string): number {
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
}

function test() {
    let text1: string = '';
    let text2: string = '';
    try {
        for (let i = 1; i < 100; i++) {
            text1 = Array(i)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * 10))
                .join('');
            text2 = Array(i)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * 10))
                .join('');
            const result = longestCommonSubsequence(text1, text2);
            const _result = _longestCommonSubsequence(text1, text2);
            assert.deepStrictEqual(result, _result);
        }
    } catch (e) {
        console.log(text1);
        console.log(text2);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
