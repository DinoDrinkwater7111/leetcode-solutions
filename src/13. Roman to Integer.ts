import assert from 'assert';
import { toArabic, toRoman } from 'roman-numerals';

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
}

function _romanToInt(s: string): number {
    return toArabic(s);
}

function test() {
    let s: string = "";
    try {
        for (let i = 1; i < 4000; i++) {
            s = toRoman(i);
            assert.equal(romanToInt(s), _romanToInt(s));
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(s);
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
