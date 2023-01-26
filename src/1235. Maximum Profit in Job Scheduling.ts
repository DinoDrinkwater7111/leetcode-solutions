import assert from 'assert';

const funcs = [
    function jobScheduling(startTime: number[], endTime: number[], profit: number[]): number {
        const indexs_asc_startTime = Array(startTime.length)
            .fill(undefined)
            .map((v, i) => i)
            .sort((a, b) => startTime[a] - startTime[b]);

        function findSupInd(indStart: number, targetSt: number): number {
            let indEnd = indexs_asc_startTime.length;
            while (indStart < indEnd) {
                const mid = (indStart + indEnd) >> 1;
                if (targetSt <= startTime[indexs_asc_startTime[mid]]) indEnd = mid;
                else indStart = mid + 1;
            }
            return indEnd;
        }
        //** start to maxProfit */
        const dp = new Map<number, number>();
        // last
        let i = indexs_asc_startTime.length - 1;
        {
            let maxProfit = Number.NEGATIVE_INFINITY;
            const lastSt = startTime[indexs_asc_startTime[indexs_asc_startTime.length - 1]];
            for (; lastSt === startTime[indexs_asc_startTime[i]]; i--) {
                maxProfit = Math.max(maxProfit, profit[indexs_asc_startTime[i]]);
            }
            dp.set(lastSt, maxProfit);
        }
        for (; i >= 0; i--) {
            const ind = indexs_asc_startTime[i];
            const st = startTime[ind];
            const et = endTime[ind];
            const p = profit[ind];
            let max = dp.get(st) ?? Number.NEGATIVE_INFINITY;
            const stSupInd = findSupInd(i, st + 1);
            max = Math.max(max, dp.get(startTime[indexs_asc_startTime[stSupInd]])!);
            const etSupInd = findSupInd(i, et);
            if (etSupInd !== indexs_asc_startTime.length) {
                max = Math.max(max, p + dp.get(startTime[indexs_asc_startTime[etSupInd]])!);
            } else {
                max = Math.max(max, p);
            }
            dp.set(st, max);
        }
        return dp.get(startTime[indexs_asc_startTime[0]])!;
    },
    function jobScheduling(startTime: number[], endTime: number[], profit: number[]): number {
        const indexs_asc_startTime = Array(startTime.length)
            .fill(undefined)
            .map((v, i) => i)
            .sort((a, b) => startTime[a] - startTime[b]);

        function findSupInd(indStart: number, targetSt: number): number {
            let indEnd = indexs_asc_startTime.length;
            while (indStart < indEnd) {
                const mid = (indStart + indEnd) >> 1;
                if (targetSt <= startTime[indexs_asc_startTime[mid]]) indEnd = mid;
                else indStart = mid + 1;
            }
            return indEnd;
        }
        //** start to maxProfit */
        const dp = new Map<number, number>();
        function jobSchedulingEx(indStart: number): number {
            const st = startTime[indexs_asc_startTime[indStart]];
            let result = dp.get(st);
            if (result === undefined) {
                result = 0;
                while (startTime[indexs_asc_startTime[indStart]] === st) {
                    const stInd = indexs_asc_startTime[indStart];
                    const p = profit[stInd];
                    const et = endTime[stInd];
                    const supInd = findSupInd(indStart, et);
                    result = Math.max(result, p);
                    for (let i = supInd; i < indexs_asc_startTime.length; i++) {
                        result = Math.max(result, p + jobSchedulingEx(i));
                    }
                    indStart++;
                }
                dp.set(st, result);
            }
            return result;
        }

        for (let i = 0; i < indexs_asc_startTime.length; i++) jobSchedulingEx(i);
        let result = Number.NEGATIVE_INFINITY;
        for (const val of dp.values()) result = Math.max(result, val);
        return result;
    },
];

type TestCase = Parameters<typeof funcs[number]>;
function* testCaseIterator(): Generator<TestCase> {
    yield [];
}

function test(testCase: TestCase, actualFuncInd: number, expectedFuncInd: number): boolean {
    try {
        assert.deepStrictEqual(funcs[actualFuncInd](...testCase), funcs[expectedFuncInd](...testCase));
        return true;
    } catch (e) {
        console.log('❌'.repeat(32));
        console.log(`actualFuncInd: ${actualFuncInd}`);
        console.log(`expectedFuncInd: ${expectedFuncInd}`);
        //console.log(`testCase: ${JSON.stringify(testCase)}`);
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
            // console.log('----------------------------------------------------');
            // console.log(`Testcase ${count}:`);
            // console.log(JSON.stringify(testCase, undefined, 2));
        }
        for (let i = 0; i < funcs.length - 1; i++) {
            if (!test(testCase, i, i + 1)) break outer;
        }
    }
}
