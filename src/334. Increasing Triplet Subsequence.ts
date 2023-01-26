import assert from 'assert';
const funcs = [
    function increasingTriplet(nums: number[]): boolean {
        let candidate: number[] = [nums[0], Number.POSITIVE_INFINITY];
        for (let i = 1; i < nums.length; i++) {
            const num = nums[i];
            if (candidate[1] < num) return true;
            else if (candidate[0] < num) candidate[1] = Math.min(candidate[1], num);
            else candidate[0] = Math.min(candidate[0], num);
        }
        return false;
    },
    function increasingTriplet(nums: number[]): boolean {
        let resultArr: number[] = [nums[0]];
        let i = 0;
        for (; i < nums.length; i++) {
            const num = nums[i];
            if (num <= resultArr[0]) {
                resultArr[0] = num;
            } else {
                resultArr[1] = num;
                break;
            }
        }
        for (; i < nums.length; i++) {
            const num = nums[i];
            if (num <= resultArr[0]) {
                resultArr[0] = num;
            } else {
                if (num <= resultArr[1]) {
                    resultArr[1] = num;
                } else {
                    return true;
                }
            }
        }
        return false;
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
