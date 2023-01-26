import * as assert from 'assert';

function wiggleMaxLength(nums: number[]): number {
    //[maxLen, lastDiffSign]
    let dp: [[number, number], [number, number]] = [
        [1, 0],
        [1, 0],
    ];
    if (nums.length >= 2) {
        const diffSign = Math.sign(nums[1] - nums[0]);
        if (diffSign !== 0) dp[1] = [2, diffSign];
    }
    let result = dp[1][0];
    for (let end = 2; end < nums.length; end++) {
        let dp_end_maxLength = 0;
        let dp_end_lastDiffSign = 0;
        for (let i = 0; i < dp.length; i++) {
            const [dp_prev_maxLength, dp_prev1_lastDiffSign] = dp[i];
            const diffSign = Math.sign(nums[end] - nums[end - 2 + i]);
            if (diffSign !== 0 && diffSign !== dp_prev1_lastDiffSign) {
                if (dp_end_maxLength < dp_prev_maxLength + 1) {
                    dp_end_maxLength = dp_prev_maxLength + 1;
                    dp_end_lastDiffSign = diffSign;
                }
            } else {
                if (dp_end_maxLength < dp_prev_maxLength) {
                    dp_end_maxLength = dp_prev_maxLength;
                    dp_end_lastDiffSign = dp_prev1_lastDiffSign;
                }
            }
        }
        dp = [dp[1], [dp_end_maxLength, dp_end_lastDiffSign]];
        result = Math.max(result, dp_end_maxLength);
    }
    return result;
}

function _wiggleMaxLength(nums: number[]): number {
    //[maxLen, lastDiffSign]
    const dp: [[number, number]] = [[1, 0]];
    let result = 1;
    if (nums.length >= 2) {
        const diff = nums[1] - nums[0];
        if (diff === 0) dp.push([1, 0]);
        else {
            result = 2;
            dp.push([2, Math.sign(diff)]);
        }
    }

    for (let end = 2; end < nums.length; end++) {
        let dp_end_maxLength: number = 1;
        let dp_end_lastDiffSign: number = 0;
        for (let previousEnd = end - 1; previousEnd >= 0; previousEnd--) {
            const [dp_prev_maxLength, dp_prev_lastDiffSign] = dp[previousEnd];
            const diffSign = Math.sign(nums[end] - nums[previousEnd]);
            if (diffSign !== 0 && diffSign !== dp_prev_lastDiffSign) {
                if (dp_end_maxLength < dp_prev_maxLength + 1) {
                    dp_end_maxLength = dp_prev_maxLength + 1;
                    dp_end_lastDiffSign = diffSign;
                }
            } else {
                if (dp_end_maxLength < dp_prev_maxLength) {
                    dp_end_maxLength = dp_prev_maxLength;
                    dp_end_lastDiffSign = dp_prev_lastDiffSign;
                }
            }
        }
        dp.push([dp_end_maxLength, dp_end_lastDiffSign]);
        result = Math.max(result, dp_end_maxLength);
    }
    return result;
}

function test() {
    let nums: number[] = [];
    try {
        for (let i = 1; i < 1000; i++) {
            nums = Array(i)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * 1000));
            nums = [329, 526, 752];
            const result = wiggleMaxLength(nums);
            const _result = _wiggleMaxLength(nums);
            assert.strictEqual(result, _result);
        }
    } catch (e) {
        console.log(nums);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
