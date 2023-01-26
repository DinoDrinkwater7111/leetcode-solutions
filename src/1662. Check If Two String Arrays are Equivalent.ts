import assert from 'assert';

const funcs = [
    function arrayStringsAreEqual(word1: string[], word2: string[]): boolean {
        let curr1 = [0, 0];
        let curr2 = [0, 0];
        while (curr1[0] < word1.length || curr2[0] < word2.length) {
            if (word1[curr1[0]]?.[curr1[1]] !== word2[curr2[0]]?.[curr2[1]]) return false;
            curr1[1]++;
            if (curr1[1] === word1[curr1[0]].length) {
                curr1[0]++;
                curr1[1] = 0;
            }
            curr2[1]++;
            if (curr2[1] === word2[curr2[0]].length) {
                curr2[0]++;
                curr2[1] = 0;
            }
        }
        return true;
    },
    function arrayStringsAreEqual(word1: string[], word2: string[]): boolean {
        return word1.join('') === word2.join('');
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
    0;
}
