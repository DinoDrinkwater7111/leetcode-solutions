import assert from 'assert';

const funcs = [
    function insert(intervals: number[][], newInterval: number[]): number[][] {
        if (intervals.length === 0) {
            intervals.push(newInterval);
            return intervals;
        }
        if (newInterval[1] < intervals[0][0]) {
            intervals.splice(0, 0, newInterval);
            return intervals;
        }
        if (intervals[intervals.length - 1][1] < newInterval[0]) {
            intervals.push(newInterval);
            return intervals;
        }
        function findEndSupInd(target: number): number {
            let start = 0;
            let end = intervals.length - 1;
            while (start < end) {
                const mid = (start + end) >> 1;
                if (target <= intervals[mid][1]) end = mid;
                else start = mid + 1;
            }
            return start;
        }

        function findStartInfInd(target: number): number {
            let start = 0;
            let end = intervals.length - 1;
            while (start < end) {
                const mid = Math.ceil((start + end) / 2);
                if (intervals[mid][0] <= target) start = mid;
                else end = mid - 1;
            }
            return start;
        }

        const endSupInd = findEndSupInd(newInterval[0]);
        const startInfInd = findStartInfInd(newInterval[1]);
        intervals.splice(endSupInd, startInfInd - endSupInd + 1, [
            Math.min(intervals[endSupInd][0], newInterval[0]),
            Math.max(intervals[startInfInd][1], newInterval[1]),
        ]);
        return intervals;
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
