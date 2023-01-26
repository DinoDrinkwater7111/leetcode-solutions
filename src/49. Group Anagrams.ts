import assert from 'assert';

const funcs = [
    function groupAnagrams(strs: string[]): string[][] {
        const charSortedStrs = strs.map((s) => Array.from(s).sort().join(''));
        const charSortedStr2group = new Map<string, string[]>();
        charSortedStrs.forEach((s, i) => {
            const group = charSortedStr2group.get(s) ?? [];
            group.push(strs[i]);
            charSortedStr2group.set(s, group);
        });

        return [...charSortedStr2group.values()];
    },
    function groupAnagrams(strs: string[]): string[][] {
        const sortedStrs: string[] = [];
        for (const s of strs) {
            sortedStrs.push(Array.from(s).sort().join(''));
        }

        const result: string[][] = [];
        const str2Group = new Map<string, number>();
        for (let i = 0; i < strs.length; i++) {
            const str = strs[i];
            const sortedStr = sortedStrs[i];
            let group = str2Group.get(sortedStr);
            if (group === undefined) {
                group = str2Group.size;
                str2Group.set(sortedStr, group);
                result[group] = [];
            }
            result[group].push(str);
        }

        return result;
    },
];

type TestCase = Parameters<typeof funcs[number]>;
function* testCaseIterator(): Generator<TestCase> {}

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
