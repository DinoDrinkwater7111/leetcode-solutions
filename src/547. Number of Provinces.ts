import assert from 'assert';

const funcs = [
    function findCircleNum(isConnected: number[][]): number {
        let result = 0;
        const connectedRows = new Set<number>();
        for (let i = 0; i < isConnected.length; i++) {
            if (connectedRows.has(i)) continue;
            let nextToBeConnect = [i];
            while (nextToBeConnect.length > 0) {
                const nextToBeConnect_: number[] = [];
                for (const rowInd of nextToBeConnect) {
                    if (connectedRows.has(rowInd)) continue;
                    connectedRows.add(rowInd);
                    isConnected[rowInd].forEach((v, j) => {
                        if (v === 1) nextToBeConnect_.push(j);
                    });
                    for (let j = 0; j < isConnected[rowInd].length; j++) {
                        if (isConnected[rowInd][j] === 1) nextToBeConnect_.push(j);
                    }
                }
                nextToBeConnect = nextToBeConnect_;
            }
            result++;
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
