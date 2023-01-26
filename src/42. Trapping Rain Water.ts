import assert from 'assert';

const funcs = [
    function trap(height: number[]): number {
        let result = 0;
        let leftMax = height[0];
        for (let i = 1; i < height.length - 1; i++) {
            leftMax = Math.max(leftMax, height[i]);
            result += leftMax;
        }
        leftMax = Math.max(leftMax, height[height.length - 1]);
        let rightMax = height[height.length - 1];
        for (let i = height.length - 2; i >= 0; i--) {
            if (rightMax === leftMax) break;
            rightMax = Math.max(rightMax, height[i]);
            result -= leftMax - rightMax;
        }
        for (let i = 1; i < height.length - 1; i++) {
            result -= height[i];
        }

        return result;
    },
    function trap(height: number[]): number {
        const cache: number[] = [];
        for (let i = 0; i < height.length; i++) {
            cache[i] = Math.max(cache[i - 1] ?? 0, height[i], height[i + 1] ?? 0);
        }
        let leftMax = height[0];
        for (let i = 1; i < cache.length; i++) {
            cache[i] = Math.max(Math.min(leftMax, cache[i]), height[i]);
            leftMax = Math.max(leftMax, cache[i]);
        }
        let rightMax = height[height.length - 1];
        for (let i = height.length - 2; i >= 0; i--) {
            cache[i] = Math.max(Math.min(rightMax, cache[i]), height[i]);
            rightMax = Math.max(rightMax, cache[i]);
        }
        let result = 0;
        for (let i = 1; i < height.length - 1; i++) {
            result += cache[i] - height[i];
        }
        return result;
    },
    function trap(height: number[]): number {
        let total_leftOutOnly = 0;
        {
            let maxHeight = 0;
            for (const h of height) {
                maxHeight = Math.max(maxHeight, h);
                total_leftOutOnly += maxHeight;
            }
        }
        let total_rightOutOnly = 0;
        {
            let maxHeight = 0;
            for (let i = height.length - 1; i >= 0; i--) {
                maxHeight = Math.max(maxHeight, height[i]);
                total_rightOutOnly += maxHeight;
            }
        }
        const barTotal = height.reduce((p, c) => p + c, 0);
        return total_leftOutOnly + total_rightOutOnly - Math.max(...height) * height.length - barTotal;
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
