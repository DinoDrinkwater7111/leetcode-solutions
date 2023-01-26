import assert from 'assert';

const funcs = [
    function minSetSize(arr: number[]): number {
        const num2freq = new Map<number, number>();
        for (const num of arr) {
            num2freq.set(num, (num2freq.get(num) ?? 0) + 1);
        }
        const numSortByFreqDesc = Array.from(num2freq.keys()).sort((a, b) => num2freq.get(b)! - num2freq.get(a)!);
        let total = 0;
        for (let i = 0; i < numSortByFreqDesc.length; i++) {
            total += num2freq.get(numSortByFreqDesc[i])!;
            if (total >= arr.length >> 1) return i + 1;
        }

        throw new Error();
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
