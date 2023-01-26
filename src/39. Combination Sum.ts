import assert from 'assert';

const funcs = [
    function combinationSum(candidates: number[], target: number): number[][] {
        candidates.sort((a, b) => a - b);
        const result: number[][] = [];
        const stack: number[] = [];
        function combinationSumEx(target: number, startInd: number): void {
            if (target < 0 || stack.length > 150) return;
            if (target === 0) {
                result.push(stack.slice());
                return;
            }
            for (let i = startInd; i < candidates.length; i++) {
                if (candidates[i] > target) break;
                stack.push(candidates[i]);
                combinationSumEx(target - candidates[i], i);
                stack.pop();
            }
        }
        combinationSumEx(target, 0);
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
