import assert from 'assert';

const funcs = [
    function addBinary(a: string, b: string): string {
        if (a === '0' && b === '0') return '0';
        let resultArr: number[] = Array(Math.max(a.length, b.length) + 2).fill(0);
        for (let i = a.length - 1; i >= 0; i--) resultArr[a.length - 1 - i] += a[i] === '0' ? 0 : 1;
        for (let i = b.length - 1; i >= 0; i--) resultArr[b.length - 1 - i] += b[i] === '0' ? 0 : 1;
        for (let i = 0; i < resultArr.length - 1; i++) {
            resultArr[i + 1] += resultArr[i] >> 1;
            resultArr[i] &= 1;
        }
        while (resultArr[resultArr.length - 1] === 0) resultArr.pop();
        for (let i = 0; i < resultArr.length; i++) resultArr[i] += 48;
        return String.fromCharCode(...resultArr.reverse());
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
