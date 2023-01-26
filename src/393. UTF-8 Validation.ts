import assert from 'assert';

const funcs = [
    function validUtf8(data: number[]): boolean {
        let i = 0;
        while (i < data.length) {
            let end = i;
            if (data[i] >> 5 === 0b110) end = i + 1;
            else if (data[i] >> 4 === 0b1110) end = i + 2;
            else if (data[i] >> 3 === 0b11110) end = i + 3;
            else if (data[i] >> 7 !== 0) return false;
            i++;
            for (; i <= end; i++) if (data[i] === undefined || data[i] >> 6 !== 0b10) return false;
        }
        return true;
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
