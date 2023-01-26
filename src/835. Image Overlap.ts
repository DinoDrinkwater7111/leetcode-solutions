import assert from 'assert';

const funcs = [
    function largestOverlap(img1: number[][], img2: number[][]): number {
        const n = img1.length;
        function getOverlap(offsetX: number, offsetY: number): number {
            const topLeftX = Math.max(offsetX, 0);
            const topLeftY = Math.max(offsetY, 0);
            const bottomRightX = Math.min(n + offsetX, n);
            const bottomRightY = Math.min(n + offsetY, n);
            let count = 0;
            for (let x1 = topLeftX; x1 < bottomRightX; x1++) {
                for (let y1 = topLeftY; y1 < bottomRightY; y1++) {
                    const x2 = x1 - offsetX;
                    const y2 = y1 - offsetY;
                    if (img1[x1][y1] === 1 && img2[x2][y2] === 1) count++;
                }
            }
            return count;
        }

        let result = 0;
        for (let offsetX = -n + 1; offsetX < n; offsetX++) {
            for (let offsetY = -n + 1; offsetY < n; offsetY++) {
                result = Math.max(result, getOverlap(offsetX, offsetY));
            }
        }
        return result;
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
