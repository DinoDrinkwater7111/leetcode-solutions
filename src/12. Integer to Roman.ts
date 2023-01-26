import assert from 'assert';
import { toRoman } from 'roman-numerals';

function intToRoman(num: number): string {
    type ValueSymbolPair = { value: number; Symbol: string };
    const sortedPairs: ValueSymbolPair[] = [];
    sortedPairs.push({ value: 1, Symbol: 'I' });
    sortedPairs.push({ value: 4, Symbol: 'IV' });
    sortedPairs.push({ value: 5, Symbol: 'V' });
    sortedPairs.push({ value: 9, Symbol: 'IX' });
    sortedPairs.push({ value: 10, Symbol: 'X' });
    sortedPairs.push({ value: 40, Symbol: 'XL' });
    sortedPairs.push({ value: 50, Symbol: 'L' });
    sortedPairs.push({ value: 90, Symbol: 'XC' });
    sortedPairs.push({ value: 100, Symbol: 'C' });
    sortedPairs.push({ value: 400, Symbol: 'CD' });
    sortedPairs.push({ value: 500, Symbol: 'D' });
    sortedPairs.push({ value: 900, Symbol: 'CM' });
    sortedPairs.push({ value: 1000, Symbol: 'M' });
    let i = sortedPairs.length - 1;
    let remain = num;
    let resultStrArr: string[] = [];
    while (remain > 0) {
        if (sortedPairs[i].value <= remain) {
            remain -= sortedPairs[i].value;
            resultStrArr.push(sortedPairs[i].Symbol);
        } else {
            i--;
        }
    }
    return resultStrArr.join('');
}

function _intToRoman(num: number): string {
    return toRoman(num);
}

function test() {
    let num: number = 0;
    try {
        for (let i = 1; i < 4000; i++) {
            num = i;
            assert.equal(intToRoman(num), _intToRoman(num));
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(num);
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
