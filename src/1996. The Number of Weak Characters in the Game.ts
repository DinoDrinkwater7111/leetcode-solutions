import assert from 'assert';

const funcs = [
    function numberOfWeakCharacters(properties: number[][]): number {
        properties.sort((a, b) => (b[0] === a[0] ? b[1] - a[1] : a[0] - b[0]));
        const maxDefStack = [properties[properties.length - 1][1]];
        for (let i = properties.length - 2; i >= 0; i--) {
            if (properties[i][1] >= maxDefStack[maxDefStack.length - 1]) {
                maxDefStack.push(properties[i][1]);
            }
        }
        let result = 0;
        let maxDefStackCurr = maxDefStack.length - 1;
        for (let i = 0; i < properties.length; i++) {
            const [atk, def] = properties[i];
            if (maxDefStack[maxDefStackCurr] === def) maxDefStackCurr--;
            else result++;
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
