import assert from 'assert';

const funcs = [
    function canPartition(nums: number[]): boolean {
        const sum = nums.reduce((p, c) => p + c, 0);
        if ((sum & 1) === 1) return false;
        const target = sum >> 1;
        const dp = new Set<number>([0]);
        for (let i = 0; i < nums.length; i++) {
            if (dp.has(target - nums[i])) return true;
            const temp: number[] = [];
            for (const num of dp) temp.push(num + nums[i]);
            for (const num of temp) dp.add(num);
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
