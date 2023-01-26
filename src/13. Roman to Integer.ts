import assert from 'assert';
import { toArabic, toRoman } from 'roman-numerals';

const funcs = [
    function romanToInt(s: string): number {
        const symbol2val = new Map<string, number>([
            ['I', 1],
            ['V', 5],
            ['X', 10],
            ['L', 50],
            ['C', 100],
            ['D', 500],
            ['M', 1000],
        ]);

        let result = symbol2val.get(s[s.length - 1])!;
        let lastVal = result;
        for (let i = s.length - 2; i >= 0; i--) {
            const val = symbol2val.get(s[i])!;
            const isIncreasing = val >= lastVal;
            if (isIncreasing) result += val;
            else result -= val;
            lastVal = val;
        }
        return result;
    },
    function romanToInt(s: string): number {
        type ValueSymbolPair = { value: number; symbol: string };
        const sortedPairs: ValueSymbolPair[] = [];
        sortedPairs.push(
            { value: 1, symbol: 'I' },
            { value: 4, symbol: 'IV' },
            { value: 5, symbol: 'V' },
            { value: 9, symbol: 'IX' },
            { value: 10, symbol: 'X' },
            { value: 40, symbol: 'XL' },
            { value: 50, symbol: 'L' },
            { value: 90, symbol: 'XC' },
            { value: 100, symbol: 'C' },
            { value: 400, symbol: 'CD' },
            { value: 500, symbol: 'D' },
            { value: 900, symbol: 'CM' },
            { value: 1000, symbol: 'M' }
        );

        const charArr = Array.from(s);
        let i = sortedPairs.length - 1;
        let start = 0;
        let result = 0;
        while (start < charArr.length) {
            let isStartWith = true;
            const valueSymbolPair = sortedPairs[i];
            for (let k = 0; k < valueSymbolPair.symbol.length; k++) {
                if (valueSymbolPair.symbol.charAt(k) !== charArr[start + k]) {
                    isStartWith = false;
                    break;
                }
            }
            if (isStartWith) {
                result += valueSymbolPair.value;
                start += valueSymbolPair.symbol.length;
            } else {
                i--;
            }
        }
        return result;
    },
    function romanToInt(s: string): number {
        return toArabic(s);
    },
];

type TestCase = Parameters<typeof funcs[number]>;
function* testCaseIterator(): Generator<TestCase> {
    for (let i = 1; i < 4000; i++) {
        yield [toRoman(i)];
    }
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
