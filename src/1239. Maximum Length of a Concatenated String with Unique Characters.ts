import assert from 'assert';

const funcs = [
    function maxLength(arr: string[]): number {
        const bitsArr: (number | undefined)[] = [];
        for (let i = 0; i < arr.length; i++) {
            let bits: number | undefined = 0;
            for (let j = 0; j < arr[i].length; j++) {
                const bit = 1 << (arr[i].charCodeAt(j) - 97);
                if ((bits & bit) === 0) {
                    bits |= bit;
                } else {
                    bits = undefined;
                    break;
                }
            }
            bitsArr[i] = bits;
        }
        let sum = 0;
        let bits = 0;
        function maxLengthEx(curr: number): number {
            if (curr === arr.length) return sum;
            let max = maxLengthEx(curr + 1);
            const currBits = bitsArr[curr];
            if (currBits !== undefined && (currBits & bits) === 0) {
                sum += arr[curr].length;
                max = Math.max(max, maxLengthEx(curr + 1));
                sum -= arr[curr].length;
            }
            return max;
        }

        return maxLengthEx(0);
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
