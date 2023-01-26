import assert from 'assert';

const funcs = [
    function findErrorNums(nums: number[]): number[] {
        const n = nums.length;
        let x = (n * (n + 1)) / 2;
        let y = (n * (n + 1) * (2 * n + 1)) / 6;
        for (let i = 0; i < n; i++) {
            x -= nums[i];
            y -= nums[i] ** 2;
        }
        const b = (x + y / x) / 2;
        return [b - x, b];
    },
    function findErrorNums(nums: number[]): number[] {
        const n = nums.length;
        let x_xor_y = n;
        for (let i = 0; i < nums.length; i++) x_xor_y ^= nums[i] ^ i;
        let rightMostMask = 1;
        while ((x_xor_y & rightMostMask) === 0) rightMostMask <<= 1;
        let x_xor_y_0 = 0;
        let x_xor_y_1 = 0;
        for (let i = 0; i < nums.length; i++) {
            const num = nums[i];
            if ((num & rightMostMask) === 0) x_xor_y_0 ^= num;
            else x_xor_y_1 ^= num;
            if (((i + 1) & rightMostMask) === 0) x_xor_y_0 ^= i + 1;
            else x_xor_y_1 ^= i + 1;
        }
        return nums.includes(x_xor_y_0) ? [x_xor_y_0, x_xor_y_1] : [x_xor_y_1, x_xor_y_0];
    }
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
