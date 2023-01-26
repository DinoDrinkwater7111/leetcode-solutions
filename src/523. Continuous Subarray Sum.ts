import assert from 'assert';

const funcs = [
    function checkSubarraySum(nums: number[], k: number): boolean {
        if (nums.length === 1) return false;
        let sum = nums[0] % k;
        const remainders = new Set([0]);
        for (let i = 1; i < nums.length; i++) {
            const _sum = sum;
            sum = (sum + nums[i]) % k;
            if (remainders.has(sum)) return true;
            remainders.add(_sum);
        }
        return false;
    },
    function checkSubarraySum(nums: number[], k: number): boolean {
        const prefixSums: number[] = [0];
        for (let i = 0; i < nums.length; i++) prefixSums[i + 1] = prefixSums[i] + nums[i];
        for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
                if ((prefixSums[j + 1] - prefixSums[i]) % k === 0) return true;
            }
        }
        return false;
    },
];

type TestCase = Parameters<typeof funcs[number]>;
function* testCaseIterator(): Generator<TestCase> {
    for (let n = 0; n < 10000; n++) {
        const nums = Array(Math.ceil(Math.random() * 1000))
            .fill(0)
            .map(() => Math.floor(Math.random() * 1e3));
        const k = Math.floor(Math.random() * (1 << 10)) + 1;
        yield [nums, k];
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
