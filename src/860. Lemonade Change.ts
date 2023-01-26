import assert from 'assert';

const funcs = [
    function lemonadeChange(bills: number[]): boolean {
        let d5 = 0;
        let d10 = 0;
        for (const bill of bills) {
            switch (bill) {
                case 5: {
                    d5++;
                    break;
                }
                case 10: {
                    if (d5 === 0) return false;
                    d5--;
                    d10++;
                    break;
                }
                case 20: {
                    if (d5 > 0 && d10 > 0) {
                        d5--;
                        d10--;
                    } else if (d5 >= 3 && d10 === 0) {
                        d5 -= 3;
                    } else {
                        return false;
                    }
                    break;
                }
                default:
                    throw new Error();
            }
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
