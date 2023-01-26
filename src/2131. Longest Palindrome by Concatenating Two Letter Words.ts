import assert from 'assert';

const funcs = [
    function longestPalindrome(words: string[]): number {
        const word2count = new Map<string, number>();
        for (const word of words) word2count.set(word, (word2count.get(word) ?? 0) + 1);
        let result = 0;
        let isSingleWordCenter = false;
        for (const [word, count] of word2count.entries()) {
            if (word[0] === word[1]) {
                if ((count & 1) === 0) {
                    result += count << 1;
                } else {
                    if (isSingleWordCenter) {
                        result += (count >> 1) << 2;
                    } else {
                        result += count << 1;
                        isSingleWordCenter = true;
                    }
                }
                word2count.delete(word);
            } else {
                const reversedWord = word[1] + word[0];
                const reversedWordCounts = word2count.get(reversedWord) ?? 0;
                result += Math.min(count, reversedWordCounts) << 2;
                word2count.delete(word);
                word2count.delete(reversedWord);
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
