import assert from 'assert';

const funcs = [
    function dailyTemperatures(temperatures: number[]): number[] {
        const temperature2index: number[] = Array(71).fill(Number.POSITIVE_INFINITY);
        const result = Array(temperatures.length).fill(Number.POSITIVE_INFINITY);
        for (let i = temperatures.length - 1; i >= 0; i--) {
            const temperature = temperatures[i];
            for (let t = temperature - 29; t < temperature2index.length; t++) {
                result[i] = Math.min(result[i], temperature2index[t]);
            }
            result[i] = result[i] === Number.POSITIVE_INFINITY ? 0 : result[i] - i;
            temperature2index[temperature - 30] = i;
        }
        return result;
    },
    function dailyTemperatures(temperatures: number[]): number[] {
        const temperature2Indexs: number[][] = [];
        for (let i = temperatures.length - 1; i >= 1; i--) {
            temperature2Indexs[temperatures[i]] ??= [];
            temperature2Indexs[temperatures[i]].push(i);
        }
        const result = Array(temperatures.length).fill(Number.POSITIVE_INFINITY);
        for (let i = 0; i < result.length; i++) {
            temperature2Indexs.forEach((indexs, temperature) => {
                while (indexs[indexs.length - 1] <= i) indexs.pop();
                if (temperature > temperatures[i]) {
                    result[i] = Math.min(result[i], indexs[indexs.length - 1] ?? Number.POSITIVE_INFINITY);
                }
            });
        }
        for (let i = 0; i < result.length; i++) {
            if (result[i] === Number.POSITIVE_INFINITY) result[i] = 0;
            else result[i] -= i;
        }
        return result;
    },
    function dailyTemperatures(temperatures: number[]): number[] {
        let result: number[] = Array(temperatures.length).fill(0);
        for (let i = 0; i < temperatures.length; i++) {
            for (let j = i + 1; j < temperatures.length; j++) {
                if (temperatures[j] > temperatures[i]) {
                    result[i] = j - i;
                    break;
                }
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
