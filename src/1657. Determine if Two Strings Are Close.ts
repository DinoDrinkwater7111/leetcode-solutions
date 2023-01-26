import assert from 'assert';

const funcs = [
    function closeStrings(word1: string, word2: string): boolean {
        if (word1.length !== word2.length) return false;
        function getSortedCharCount(w: string): number[] {
            const charCode2count = Array(26).fill(0);
            for (let i = 0; i < w.length; i++) charCode2count[w.charCodeAt(i) - 97]++;
            const sorted = charCode2count.filter((c) => c !== 0).sort((a, b) => a - b);
            for (let i = 25; i >= 0; i--) if (charCode2count[i] !== 0) charCode2count[i] = sorted.pop()!;
            return charCode2count;
        }
        let c1 = getSortedCharCount(word1);
        let c2 = getSortedCharCount(word2);
        for (let i = 0; i < c1.length; i++) if (c1[i] !== c2[i]) return false;
        return true;
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
