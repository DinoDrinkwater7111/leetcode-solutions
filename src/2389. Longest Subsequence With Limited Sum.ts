import assert from 'assert';

const funcs = [
    function answerQueries(nums: number[], queries: number[]): number[] {
        const QUERY_MASK = (1 << 20) - 1;
        const QUERY_INDEX_MASK = ((1 << 10) - 1) << 20;
        for (let i = 0; i < queries.length; i++) queries[i] |= i << 20;
        queries.sort((a, b) => (a & QUERY_MASK) - (b & QUERY_MASK));
        nums.sort((a, b) => a - b);
        let numInd = 0;
        let sum = 0;
        for (let i = 0; i < queries.length; i++) {
            const query = queries[i] & QUERY_MASK;
            while (numInd < nums.length) {
                const num = nums[numInd];
                if (sum + num <= query) {
                    sum += num;
                    numInd++;
                } else {
                    break;
                }
            }
            queries[i] = (queries[i] & QUERY_INDEX_MASK) | numInd;
        }
        queries.sort((a, b) => (a & QUERY_INDEX_MASK) - (b & QUERY_INDEX_MASK));
        for (let i = 0; i < queries.length; i++) queries[i] &= QUERY_MASK;
        return queries;
    },
    function answerQueries(nums: number[], queries: number[]): number[] {
        const queryInd_acs = queries.map((v, i) => i).sort((a, b) => queries[a] - queries[b]);
        nums.sort((a, b) => a - b);
        let numInd = 0;
        let sum = 0;
        const result: number[] = [];
        for (let i = 0; i < queryInd_acs.length; i++) {
            const query = queries[queryInd_acs[i]];
            while (numInd < nums.length) {
                const num = nums[numInd];
                if (sum + num <= query) {
                    sum += num;
                    numInd++;
                } else {
                    break;
                }
            }
            result[queryInd_acs[i]] = numInd;
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
