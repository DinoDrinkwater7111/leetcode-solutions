import assert from 'assert';

const funcs = [
    function numOfMinutes(n: number, headID: number, manager: number[], informTime: number[]): number {
        const id2reachTime: number[] = [];
        function findReachTime(id: number): number {
            if (manager[id] === -1) return 0;
            if (id2reachTime[manager[id]] === undefined) {
                id2reachTime[manager[id]] = findReachTime(manager[id]) + informTime[manager[id]];
            }
            return id2reachTime[manager[id]];
        }
        for (let i = 0; i < manager.length; i++) findReachTime(i);
        let result = 0;
        id2reachTime.forEach((reachTime) => {result = Math.max(result, reachTime)});
        return result;
    },
    function numOfMinutes(n: number, headID: number, manager: number[], informTime: number[]): number {
        const id2subordinates: number[][] = [];
        for (let i = 0; i < manager.length; i++) {
            id2subordinates[manager[i]] ??= [];
            id2subordinates[manager[i]].push(i);
        }
        function numOfMinutesEx(manager: number): number {
            let maxInformTime = 0;
            for (const subordinate of id2subordinates[manager] ?? []) {
                maxInformTime = Math.max(maxInformTime, numOfMinutesEx(subordinate));
            }
            return informTime[manager] + maxInformTime;
        }

        return numOfMinutesEx(headID);
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
