import assert from 'assert';

const funcs = [
    function reverseWords(s: string): string {
        return s.split(/ +/).reverse().join(' ').trim();
    },
    function reverseWords(s: string): string {
        const resultCharArr: string[] = [];
        const temp: string[] = [];
        for (let i = s.length - 1; i >= 0; i--) {
            if (s[i] === ' ') {
                if (temp.length > 0) {
                    while (temp.length > 0) resultCharArr.push(temp.pop()!);
                    resultCharArr.push(' ');
                }
            } else {
                temp.push(s[i]);
            }
        }
        if (temp.length > 0) {
            while (temp.length > 0) resultCharArr.push(temp.pop()!);
        } else {
            resultCharArr.pop();
        }
        return resultCharArr.join('');
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
