import assert from 'assert';

const funcs = [
    function mirrorReflection(p: number, q: number): number {
        function GCD(a: number, b: number): number {
            while (a > 0) {
                const r = b % a;
                b = a;
                a = r;
            }
            return b;
        }
        const lcm = (p * q) / GCD(p, q);
        if (((lcm / p) & 1) === 0) return  0;
        else return ((lcm / q) & 1) === 0 ? 2 : 1;
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
