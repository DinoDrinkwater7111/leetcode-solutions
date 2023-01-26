import assert from 'assert';

const funcs = [
    function smallestRangeII(nums: number[], k: number): number {
        nums.sort((a, b) => a - b);
        //num-k, num+k -> num, num+2k
        k *= 2;
        let diff = nums[nums.length - 1] - nums[0];
        const minCandidate = nums[0] + k;
        if (minCandidate >= nums[nums.length - 1]) {
            for (let i = 0; i < nums.length - 1; i++) {
                diff = Math.min(diff, nums[i] + k - nums[i + 1]);
            }
        } else {
            for (let i = 0; i < nums.length - 1; i++) {
                if (nums[i + 1] < minCandidate) {
                    diff = Math.min(diff, Math.max(nums[nums.length - 1], nums[i] + k) - nums[i + 1]);
                } else {
                    diff = Math.min(diff, Math.max(nums[nums.length - 1], nums[i] + k) - minCandidate);
                    break;
                }
            }
        }

        return diff;
    },
    function smallestRangeII(nums: number[], k: number): number {
        nums = nums.slice().sort((a, b) => a - b);
        //num-k, num+k -> num, num+2k
        k *= 2;
        let diff = nums[nums.length - 1] - nums[0];
        for (let i = 0; i < nums.length - 1; i++) {
            diff = Math.min(diff, Math.max(nums[nums.length - 1], nums[i] + k) - Math.min(nums[i + 1], nums[0] + k));
        }
        return diff;
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
