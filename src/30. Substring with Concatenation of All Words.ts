import assert from 'assert';

const funcs = [
    //TODO KMP
    function findSubstring(s: string, words: string[]): number[] {
        const wordLen = words[0].length;
        const wordsLen = words[0].length * words.length;
        const word2count = new Map<string, number>();
        for (const word of words) word2count.set(word, (word2count.get(word) ?? 0) + 1);

        function getNextWord(startInd: number): string | undefined {
            const subStr = s.substring(startInd, startInd + wordLen);
            if ((word2count.get(subStr) ?? 0) > 0) return subStr;
            else return undefined;
        }

        function isSubString(startInd: number, checkedLen: number): boolean {
            if (checkedLen === wordsLen) return true;
            const word = getNextWord(startInd);
            if (word === undefined) return false;
            word2count.set(word, word2count.get(word)! - 1);
            const result = isSubString(startInd + wordLen, checkedLen + wordLen);
            word2count.set(word, word2count.get(word)! + 1);
            return result;
        }

        const result: number[] = [];
        for (let i = 0; i <= s.length - wordsLen; i++) {
            if (isSubString(i, 0)) result.push(i);
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
