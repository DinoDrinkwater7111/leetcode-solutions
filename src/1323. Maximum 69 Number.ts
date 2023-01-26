import assert from 'assert';

const funcs = [
    function maximum69Number(num: number): number {
        if (num === 6) return 9;
        if (num === 9) return 9;
        if (num === 66) return 96;
        if (num === 69) return 99;
        if (num === 96) return 99;
        if (num === 99) return 99;
        if (num === 666) return 966;
        if (num === 669) return 969;
        if (num === 696) return 996;
        if (num === 699) return 999;
        if (num === 966) return 996;
        if (num === 969) return 999;
        if (num === 996) return 999;
        if (num === 999) return 999;
        if (num === 6666) return 9666;
        if (num === 6669) return 9669;
        if (num === 6696) return 9696;
        if (num === 6699) return 9699;
        if (num === 6966) return 9966;
        if (num === 6969) return 9969;
        if (num === 6996) return 9996;
        if (num === 6999) return 9999;
        if (num === 9666) return 9966;
        if (num === 9669) return 9969;
        if (num === 9696) return 9996;
        if (num === 9699) return 9999;
        if (num === 9966) return 9996;
        if (num === 9969) return 9999;
        if (num === 9996) return 9999;
        if (num === 9999) return 9999;
        throw new Error();
    },
];

type TestCase = Parameters<typeof funcs[number]>;
function* testCaseIterator(): Generator<TestCase> {
    //TODO
}

function test(testCase: TestCase, actualFuncInd: number, expectedFuncInd: number): boolean {
    try {
        const json = JSON.stringify(testCase);
        assert.deepStrictEqual(
            funcs[actualFuncInd](...(JSON.parse(json) as TestCase)),
            funcs[expectedFuncInd](...(JSON.parse(json) as TestCase))
        );
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
