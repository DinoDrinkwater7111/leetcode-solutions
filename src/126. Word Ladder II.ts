import assert from 'assert';

const funcs = [
    function findLadders(beginWord: string, endWord: string, wordList: string[]): string[][] {
        const N = beginWord.length;
        const words = new Set(wordList);
        words.delete(beginWord);
        if (!words.has(endWord)) return [];

        function isTransformable(curr: string, next: string): boolean {
            let nMismatch = 0;
            for (let i = 0; i < N; i++) if (curr[i] !== next[i]) nMismatch++;
            return nMismatch === 1;
        }

        const level2words: Set<string>[] = [new Set([beginWord])];
        while (level2words[level2words.length - 1].size > 0) {
            const level = level2words[level2words.length - 1];
            const level_ = new Set<string>();
            level.forEach((curr) => {
                words.forEach((next) => {
                    if (isTransformable(curr, next)) {
                        level_.add(next);
                        words.delete(next);
                    }
                });
            });
            level2words.push(level_);
            if (level_.has(endWord)) break;
        }
        if (!level2words[level2words.length - 1].has(endWord)) return [];

        const result: string[][] = [];
        const stack: string[] = [];
        function dfs(curr: string): boolean {
            stack.push(curr);
            let found = false;
            if (curr === endWord) {
                result.push(stack.slice());
                found = true;
            } else {
                const words = level2words[stack.length] ?? new Set<string>();
                words.forEach((next) => {
                    if (isTransformable(curr, next)) {
                        if (dfs(next)) found = true;
                        else words.delete(next);
                    }
                });
            }
            stack.pop();
            return found;
        }
        dfs(beginWord);
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
