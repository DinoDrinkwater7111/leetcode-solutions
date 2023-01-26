import assert from 'assert';

const funcs = [
    function multiply(num1: string, num2: string): string {
        if (num1 === '0' || num2 === '0') return '0';
        let resultArr: number[] = Array(num1.length + num2.length).fill(0);
        function addToResult(num: number, shift: number): void {
            const numStr = num.toString();
            let j = shift;
            for (let i = numStr.length - 1; i >= 0; i--) {
                resultArr[j] += numStr.charCodeAt(i) - 48;
                j++;
            }
        }
        let shift1 = -1;
        //Math.floor(Math.log10(Math.sqrt(Number.MAX_SAFE_INTEGER))) = 7
        for (let i1 = num1.length; i1 > 0; i1 -= 7) {
            const n1 = Number(num1.substring(i1 - 7, i1));
            shift1++;
            let shift2 = -1;
            for (let i2 = num2.length; i2 > 0; i2 -= 7) {
                const n2 = Number(num2.substring(i2 - 7, i2));
                shift2++;
                addToResult(n1 * n2, (shift1 + shift2) * 7);
            }
        }
        for (let i = 0; i < resultArr.length - 1; i++) {
            resultArr[i + 1] += Math.floor(resultArr[i] / 10);
            resultArr[i] = resultArr[i] % 10;
        }
        while (resultArr[resultArr.length - 1] === 0) resultArr.pop();
        for (let i = 0; i < resultArr.length; i++) resultArr[i] += 48;
        return String.fromCharCode(...resultArr.reverse());
    },
    function multiply(num1: string, num2: string): string {
        function getNumArr(numStr: string): number[] {
            const result: number[] = [];
            for (let i = numStr.length - 1; i >= 0; i--) {
                result.push(numStr.charCodeAt(i) - 48);
            }
            return result;
        }

        const num1Arr: number[] = getNumArr(num1);
        const num2Arr: number[] = getNumArr(num2);

        // cache[i] = num1 * i;
        const cache: number[][] = [];
        function mul(n: number): number[] {
            if (cache[n] === undefined) {
                cache[n] = [];
                for (let i = 0; i < num1Arr.length; i++) {
                    cache[n][i] = num1Arr[i] * n;
                }
                for (let i = 0; i < num1Arr.length - 1; i++) {
                    if (cache[n][i] >= 10) {
                        cache[n][i + 1] += Math.floor(cache[n][i] / 10);
                        cache[n][i] %= 10;
                    }
                }
                {
                    const last = num1Arr.length - 1;
                    if (cache[n][last] >= 10) {
                        cache[n][last + 1] = Math.floor(cache[n][last] / 10);
                        cache[n][last] %= 10;
                    }
                }
            }
            return cache[n];
        }

        function add(num: number[], shift: number, to: number[]): void {
            for (let i = to.length; i < num.length + shift; i++) to[i] = 0;
            for (let i = 0; i < num.length; i++) to[i + shift] += num[i];
            for (let i = shift; i < to.length - 1; i++) {
                if (to[i] >= 10) {
                    to[i + 1] += 1;
                    to[i] -= 10;
                }
            }
            {
                const last = to.length - 1;
                if (to[last] >= 10) {
                    to[last + 1] = 1;
                    to[last] -= 10;
                }
            }
        }

        const resultArr: number[] = [];
        for (let i = 0; i < num2Arr.length; i++) {
            add(mul(num2Arr[i]), i, resultArr);
        }

        for (let i = resultArr.length - 1; i >= 1; i--) {
            if (resultArr[i] === 0) resultArr.pop();
            else break;
        }

        return resultArr.reverse().join('');
    },
];

type TestCase = Parameters<typeof funcs[number]>;
function* testCaseIterator(): Generator<TestCase> {
    function genNum(): string {
        const N = Math.floor(Math.random() * 200) + 1;
        const digits: string[] = [];
        for (let i = 0; i < N; i++) digits[i] = Math.floor(Math.random() * 10).toString();
        if (digits[0] === '0') digits[0] = '1';
        return digits.join('');
    }
    yield ['15307468', '91'];
    for (let i = 0; i < 10000; i++) {
        yield [genNum(), genNum()];
    }
    yield ['999999999', '0'];
    yield ['0', '999999999'];
    yield ['0', '0'];
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
