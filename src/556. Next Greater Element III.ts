import assert from 'assert';

const funcs = [
    function nextGreaterElement(n: number): number {
        const digits: string[] = Array.from(n.toString());
        for (let i = digits.length - 1; i >= 1; i--) {
            if (digits[i - 1] < digits[i]) {
                for (let j = digits.length - 1; j >= i; j--) {
                    if (digits[i - 1] < digits[j]) {
                        const temp = digits[i - 1];
                        digits[i - 1] = digits[j];
                        digits[j] = temp;
                        const n = Number(digits.slice(0, i).join('') + digits.slice(i).reverse().join(''));
                        if (n <= 2 ** 31 - 1) return n;
                        else return -1;
                    }
                }
            }
        }
        return -1;
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
