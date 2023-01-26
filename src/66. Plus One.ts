import assert from 'assert';

const funcs = [
    function plusOne(digits: number[]): number[] {
        let result = digits.slice();
        result[result.length - 1]++;
        for (let i = result.length - 1; i >= 1; i--) {
            if (result[i] === 10) {
                result[i] = 0;
                result[i - 1]++;
            } else {
                break;
            }
        }
        if (result[0] === 10) {
            result[0] = 0;
            result.splice(0, 0, 1);
        }

        return result;
    },
    function plusOne(digits: number[]): number[] {
        return Array.from((BigInt(digits.map((d) => String.fromCharCode(48 + d)).join('')) + BigInt(1)).toString()).map(
            (d) => d.charCodeAt(0) - 48
        );
    },
];

type TestCase = Parameters<typeof funcs[number]>;
function* testCaseIterator(): Generator<TestCase> {
    for (let i = 0; i < 100000; i++) {
        const nDigit = Math.floor(Math.random() * 100) + 1;
        const digits: TestCase[0] = [];
        for (let i = 0; i < nDigit; i++) digits.push(Math.floor(Math.random() * 10));
        if (digits[0] === 0) digits[0] = 1;
        yield [digits];
    }
    yield [Array(79).fill(9)];
}

function test(testCase: TestCase, actualFuncInd: number, expectedFuncInd: number): boolean {
    try {
        assert.deepStrictEqual(funcs[actualFuncInd](...testCase), funcs[expectedFuncInd](...testCase));
        return true;
    } catch (e) {
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

outer: for (const testCase of testCaseIterator()) {
    for (let i = 0; i < funcs.length - 1; i++) {
        if (!test(testCase, i, i + 1)) break outer;
    }
}
