import assert from 'assert';

const funcs = [
    function minCost(colors: string, neededTime: number[]): number {
        let result = 0;
        let gpStart = 0;
        let gpEnd = 0;
        while (gpStart < colors.length) {
            if (colors[gpStart] === colors[gpEnd + 1]) {
                gpEnd++;
            } else {
                if (gpEnd > gpStart) {
                    let max = neededTime[gpStart];
                    for (let i = gpStart; i <= gpEnd; i++) {
                        max = Math.max(max, neededTime[i]);
                        result += neededTime[i];
                    }
                    result -= max;
                }
                gpEnd++;
                gpStart = gpEnd;
            }
        }
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
