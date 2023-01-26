import assert from 'assert';

const funcs = [
    function findOriginalArray(changed: number[]): number[] {
        if ((changed.length & 1) === 1) return [];
        changed.sort((a, b) => a - b);
        function findSupInd(start: number, target: number): number {
            let end = changed.length;
            while (start < end) {
                const mid = (start + end) >> 1;
                if (target <= Math.abs(changed[mid])) {
                    if (changed[mid] === -target) start = mid + 1;
                    else end = mid;
                } else {
                    start = mid + 1;
                }
            }
            return end;
        }
        let i = 0;
        while (changed[i] === 0) i++;
        if ((i & 1) === 1) return [];
        const result: number[] = Array(i >> 1).fill(0);
        for (; i < changed.length; i++) {
            if (changed[i] < 0) continue;
            const supInd = findSupInd(i + 1, changed[i] << 1);
            if (changed[supInd] !== changed[i] << 1) return [];
            result.push(changed[i]);
            changed[supInd] *= -1;
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
