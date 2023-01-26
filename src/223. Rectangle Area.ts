import assert from 'assert';

const funcs = [
    function computeArea(
        ax1: number,
        ay1: number,
        ax2: number,
        ay2: number,
        bx1: number,
        by1: number,
        bx2: number,
        by2: number
    ): number {
        const area_a = (ax2 - ax1) * (ay2 - ay1);
        const area_b = (bx2 - bx1) * (by2 - by1);
        const area_c =
            Math.max(0, Math.min(bx2, ax2) - Math.max(bx1, ax1)) * Math.max(0, Math.min(by2, ay2) - Math.max(by1, ay1));
        return area_a + area_b - area_c;
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
