import assert from 'assert';

const funcs = [
    //TODO Piority Queue
    function minRefuelStops(target: number, startFuel: number, stations: number[][]): number {
        stations.sort((a, b) => a[0] - b[0]);
        stations.push([target, 0]);
        const reachableRefills: number[] = [];
        function insert(fuel: number): void {
            let start = 0;
            let end = reachableRefills.length;
            while (start < end) {
                const mid = (start + end) >> 1;
                if (fuel <= reachableRefills[mid]) end = mid;
                else start = mid + 1;
            }
            reachableRefills.splice(start, 0, fuel);
        }

        let totalFuel = startFuel;
        let result = 0;
        let i = 0;
        while (totalFuel < target) {
            while (stations[i][0] <= totalFuel) {
                insert(stations[i][1]);
                i++;
            }
            while (totalFuel < stations[i][0]) {
                if (reachableRefills.length === 0) return -1;
                totalFuel += reachableRefills.pop()!;
                result++;
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
