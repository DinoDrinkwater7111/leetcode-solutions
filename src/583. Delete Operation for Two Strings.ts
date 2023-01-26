import assert from "assert";

function minDistance(word1: string, word2: string): number {
    // Ref 1143
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
    
    return word1.length + word2.length - longestCommonSubsequence(word1, word2) * 2
};

//TODO