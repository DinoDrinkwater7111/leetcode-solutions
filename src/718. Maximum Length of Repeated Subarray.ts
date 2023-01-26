import assert from 'assert';

const funcs = [
    function findLength(nums1: number[], nums2: number[]): number {
        let result = 0;
        for (let i = nums1.length - 1; i >= 0; i--) {
            let start1 = i;
            let start2 = nums2.length - 1;
            let max = 0;
            while (start1 >= 0 && start2 >= 0) {
                if (nums1[start1] === nums2[start2]) {
                    max++;
                    result = Math.max(result, max);
                } else {
                    max = 0;
                }
                start1--;
                start2--;
            }
        }
        for (let j = nums2.length - 2; j >= 0; j--) {
            let start1 = nums1.length - 1;
            let start2 = j;
            let max = 0;
            while (start1 >= 0 && start2 >= 0) {
                if (nums1[start1] === nums2[start2]) {
                    max++;
                    result = Math.max(result, max);
                } else {
                    max = 0;
                }
                start1--;
                start2--;
            }
        }
        return result;
    },
    function findLength(nums1: number[], nums2: number[]): number {
        const dp: number[][] = [];
        function findLengthEx(start1: number, start2: number): number {
            if (start1 === nums1.length || start2 === nums2.length) return 0;
            if (dp[start1]?.[start2] === undefined) {
                dp[start1] ??= [];
                if (nums1[start1] === nums2[start2]) dp[start1][start2] = findLengthEx(start1 + 1, start2 + 1) + 1;
                else dp[start1][start2] = 0;
            }
            return dp[start1][start2];
        }
        let result = 0;
        for (let i = 0; i < nums1.length; i++) {
            for (let j = 0; j < nums2.length; j++) {
                result = Math.max(result, findLengthEx(i, j));
            }
        }
        return result;
    },
];

type TestCase = Parameters<typeof funcs[number]>;
function* testCaseIterator(): Generator<TestCase> {
    for (let n = 0; n < 1000; n++) {
        const num1 = Array(Math.floor(Math.random() * 1000) + 1)
            .fill(0)
            .map(() => Math.floor(Math.random() * 101));
        const num2 = Array(Math.floor(Math.random() * 1000) + 1)
            .fill(0)
            .map(() => Math.floor(Math.random() * 101));
        yield [num1, num2];
    }
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
