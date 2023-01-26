import assert from 'assert';

const funcs = [
    function maximumBags(capacity: number[], rocks: number[], additionalRocks: number): number {
        const ind_diff_asc = capacity.map((v, i) => i);
        ind_diff_asc.sort((i1, i2) => capacity[i1] - rocks[i1] - (capacity[i2] - rocks[i2]));
        let result = 0;
        for (let i = 0; i < ind_diff_asc.length; i++) {
            const ind = ind_diff_asc[i];
            const diff = capacity[ind] - rocks[ind];
            if (additionalRocks >= diff) {
                result++;
                additionalRocks -= diff;
            } else {
                break;
            }
        }
        return result;
    },
    function maximumBags(capacity: number[], rocks: number[], additionalRocks: number): number {
        for (let i = 0; i < capacity.length; i++) capacity[i] -= rocks[i];
        capacity.sort((a, b) => a - b);
        let result = 0;
        for (let i = 0; i < capacity.length; i++) {
            if (additionalRocks >= capacity[i]) {
                result++;
                additionalRocks -= capacity[i];
            } else {
                break;
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
