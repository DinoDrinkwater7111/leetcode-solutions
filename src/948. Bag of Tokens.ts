import assert from 'assert';

const funcs = [
    function bagOfTokensScore(tokens: number[], power: number): number {
        tokens.sort((a, b) => a - b);
        let upCount = 0;
        for (let i = 0; i < tokens.length; i++) {
            if (power < tokens[i]) break;
            upCount++;
            power -= tokens[i];
        }
        if (upCount === 0) return 0;
        let result = upCount;
        let downCount = 0;
        while (upCount + downCount < tokens.length) {
            downCount++;
            power += tokens[tokens.length - downCount];
            while (power >= tokens[upCount]) {
                power -= tokens[upCount];
                upCount++;
            }
            result = Math.max(result, upCount - downCount);
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
