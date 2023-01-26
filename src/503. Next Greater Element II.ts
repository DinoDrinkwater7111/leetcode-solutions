import assert from 'assert';

const funcs = [
    function nextGreaterElements(nums: number[]): number[] {
        const result: number[] = [];
        const stack: number[] = [0];
        for (let i = 1; i < nums.length; i++) {
            while (nums[stack[stack.length - 1]] < nums[i]) result[stack.pop()!] = nums[i];
            stack.push(i);
        }
        for (let i = 0; i < nums.length - 1; i++) {
            while (nums[stack[stack.length - 1]] < nums[i]) result[stack.pop()!] = nums[i];
        }
        while (stack.length > 0) result[stack.pop()!] = -1;
        return result;
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
