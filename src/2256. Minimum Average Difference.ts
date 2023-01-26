import assert from 'assert';

const funcs = [
    function minimumAverageDifference(nums: number[]): number {
        const prefixSums = [0];
        for (let i = 0; i < nums.length; i++) prefixSums.push(prefixSums[i] + nums[i]);
        let min = Number.POSITIVE_INFINITY;
        let result = Number.NaN;
        for (let i = 0; i < nums.length - 1; i++) {
            const diff = Math.abs(
                Math.floor(prefixSums[i + 1] / (i + 1)) -
                    Math.floor((prefixSums[nums.length] - prefixSums[i + 1]) / (nums.length - i - 1))
            );
            if (diff < min) {
                min = diff;
                result = i;
            }
        }
        if (Math.floor(prefixSums[nums.length] / nums.length) < min) result = nums.length - 1;
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
