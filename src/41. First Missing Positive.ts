import assert from 'assert';

const funcs = [
    function firstMissingPositive(nums: number[]): number {
        if (nums.length === 1) return nums[0] === 1 ? 2 : 1;
        function swap(i: number, j: number) {
            const temp = nums[i];
            nums[i] = nums[j];
            nums[j] = temp;
        }
        {
            let i = 0;
            while (i < nums.length) {
                if (
                    nums[i] - 1 !== i && // current is incorrect
                    0 < nums[i] &&
                    nums[i] < nums.length &&
                    nums[nums[i] - 1] - 1 !== nums[i] -1 //nums[i] - 1 is incorrect
                )
                    swap(i, nums[i] - 1);
                else i++;
            }
        }
        {
            let i = 0;
            while (i === nums[i] - 1) i++;
            return i + 1;
        }
    },
    function firstMissingPositive(nums: number[]): number {
        const set = new Set(nums);
        let i = 1;
        while (set.has(i)) i++;
        return i;
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
