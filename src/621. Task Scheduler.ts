import assert from 'assert';

const funcs = [
    /**
     * A->ideal->...->A->ideal->...->A
     * A->B->...->A->B->...->A(->B)
     * A->B->C...->A->B->D...->A(->B)
     * As we need number only so the ordering can be ignore once we known there is a possible ordering with that number
     */
    function leastInterval(tasks: string[], n: number): number {
        const task2count = new Map<string, number>();
        for (const task of tasks) task2count.set(task, (task2count.get(task) ?? 0) + 1);
        let taskMaxCount: number = Number.NEGATIVE_INFINITY;
        for (const count of task2count.values()) taskMaxCount = Math.max(taskMaxCount, count);
        const nInterval = taskMaxCount - 1;
        let nTaskMaxCount = 0;
        for (const count of task2count.values()) if (count === taskMaxCount) nTaskMaxCount++;
        const nTaskToFillInterval = tasks.length - nTaskMaxCount * taskMaxCount;
        const intervalMinLen = nTaskMaxCount + Math.floor(nTaskToFillInterval / nInterval);
        if (intervalMinLen >= n + 1) return tasks.length;
        else return nInterval * (n + 1) + nTaskMaxCount;
    }
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
