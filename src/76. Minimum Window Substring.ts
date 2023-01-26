import assert from 'assert';

const funcs = [
    function minWindow(s: string, t: string): string {
        const char2count_t = new Map<string, number>();
        for (const char of t) char2count_t.set(char, (char2count_t.get(char) ?? 0) + 1);
        /**
         * DESC
         */
        const char2indexs_s = new Map<string, number[]>();
        for (let i = s.length - 1; i >= 0; i--) {
            const indexs = char2indexs_s.get(s[i]) ?? [];
            indexs.push(i);
            char2indexs_s.set(s[i], indexs);
        }
        let start = 0;
        let end = 0;
        for (const [char_t, count_t] of char2count_t) {
            const indexs = char2indexs_s.get(char_t);
            if (indexs === undefined || indexs.length < count_t) return '';
            let minFilledInd: number;
            for (let i = 0; i < count_t; i++) minFilledInd = indexs.pop()!;
            end = Math.max(end, minFilledInd!);
        }
        let resultRange = [start, end];
        while (start <= end) {
            const char_range = s[start];
            if (char2count_t.has(char_range)) {
                const nextIndex = char2indexs_s.get(char_range)?.pop();
                if (nextIndex === undefined) break;
                end = Math.max(end, nextIndex);
            }
            start++;
            if (end - start < resultRange[1] - resultRange[0]) {
                resultRange[0] = start;
                resultRange[1] = end;
            }
        }

        return s.substring(resultRange[0], resultRange[1] + 1);
    },
    function minWindow(s: string, t: string): string {
        const char2count_t = new Map<string, number>();
        for (const char of t) char2count_t.set(char, (char2count_t.get(char) ?? 0) + 1);
        const char2indexs_s = new Map<string, number[]>();
        for (let i = 0; i < s.length; i++) {
            const indexs = char2indexs_s.get(s[i]) ?? [];
            indexs.push(i);
            char2indexs_s.set(s[i], indexs);
        }
        let start = 0;
        let end = 0;
        for (const [char_t, count_t] of char2count_t) {
            const minFilledInd = char2indexs_s.get(char_t)?.[count_t - 1];
            if (minFilledInd === undefined) return '';
            end = Math.max(end, minFilledInd);
        }
        const char2count_range = new Map<string, number>();
        const char2nextIndexInd_range = new Map<string, number>();
        for (let i = start; i <= end; i++) {
            char2count_range.set(s[i], (char2count_range.get(s[i]) ?? 0) + 1);
            char2nextIndexInd_range.set(s[i], (char2nextIndexInd_range.get(s[i]) ?? 0) + 1);
        }
        let resultRange = [start, end];
        while (start <= end) {
            const char_range = s[start];
            const count_t = char2count_t.get(char_range);
            if (count_t !== undefined) {
                const count_range = char2count_range.get(char_range)!;
                if (count_range > count_t) {
                    char2count_range.set(char_range, count_range - 1);
                } else {
                    const nextIndexInd = char2nextIndexInd_range.get(char_range)!;
                    const nextIndex = char2indexs_s.get(char_range)![nextIndexInd];
                    if (nextIndex === undefined) break;
                    end = Math.max(end, nextIndex);
                    char2nextIndexInd_range.set(char_range, nextIndexInd + 1);
                }
            }
            start++;
            if (end - start < resultRange[1] - resultRange[0]) {
                resultRange[0] = start;
                resultRange[1] = end;
            }
        }

        return s.substring(resultRange[0], resultRange[1] + 1);
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
