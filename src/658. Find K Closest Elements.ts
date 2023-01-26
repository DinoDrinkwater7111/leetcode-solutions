import assert from 'assert';

const funcs = [
    function findClosestElements(arr: number[], k: number, x: number): number[] {
        let minInd = 0;
        let min = Math.abs(x - arr[0]);
        for (let i = 1; i < arr.length; i++) {
            const metric = Math.abs(x - arr[i]);
            if (metric < min) {
                minInd = i;
                min = metric;
            }
        }
        let start = minInd;
        let end = minInd;
        while (end - start + 1 < k) {
            const _metric = arr[start - 1] === undefined ? Number.POSITIVE_INFINITY : Math.abs(x - arr[start - 1]);
            const metric_ = arr[end + 1] === undefined ? Number.POSITIVE_INFINITY : Math.abs(x - arr[end + 1]);
            if (_metric > metric_) end++;
            else start--;
        }
        return arr.slice(start, end + 1);
    },
    function findClosestElements(arr: number[], k: number, x: number): number[] {
        return arr
            .sort((a, b) => {
                const diff = Math.abs(a - x) - Math.abs(b - x);
                if (diff === 0) return a - b;
                else return diff;
            })
            .slice(0, k)
            .sort((a, b) => a - b);
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
