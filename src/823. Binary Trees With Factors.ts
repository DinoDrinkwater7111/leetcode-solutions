import assert from 'assert';

const funcs = [
    function numFactoredBinaryTrees(arr: number[]): number {
        const mod = 10 ** 9 + 7;
        arr.sort((a, b) => a - b);
        const num2Ind: number[] = [];
        for (let i = 0; i < arr.length; i++) num2Ind[arr[i]] = i;
        /** root is arr[i] */
        const resultEx: number[] = [];
        for (let i = 0; i < arr.length; i++) {
            resultEx[i] = 1;
            for (let j = 0; j < i; j++) {
                if (arr[j] * arr[j] > arr[i]) break;
                const q = arr[i] / arr[j];
                if (!Number.isInteger(q)) continue;
                if (q * q === arr[i]) {
                    resultEx[i] += (resultEx[j] * resultEx[j]) % mod;
                    continue;
                }
                if (num2Ind[q] === undefined) continue;
                resultEx[i] += (resultEx[j] * resultEx[num2Ind[q]] * 2) % mod;
            }
            resultEx[i] %= mod;
        }

        let result = 0;
        for (const r of resultEx) result = (r + result) % mod;

        return result;
    },
    function numFactoredBinaryTrees(arr: number[]): number {
        const mod = 10 ** 9 + 7;
        arr.sort((a, b) => a - b);
        /** root is arr[i] */
        const resultEx: number[] = [];
        for (let i = 0; i < arr.length; i++) {
            resultEx[i] = 1;
            for (let j = 0; j < i; j++) {
                if (arr[j] * arr[j] > arr[i]) break;
                const q = arr[i] / arr[j];
                if (!Number.isInteger(q)) continue;
                if (q * q === arr[i]) {
                    resultEx[i] += (resultEx[j] * resultEx[j]) % mod;
                    continue;
                }
                const supInd = findSupInd(0, i, q);
                if (arr[supInd] !== q) continue;
                resultEx[i] += (resultEx[j] * resultEx[supInd] * 2) % mod;
            }
            resultEx[i] %= mod;
        }

        let result = 0;
        for (const r of resultEx) result = (r + result) % mod;

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
