import assert from 'assert';

function letterCasePermutation(s: string): string[] {
    const charArr_lower = Array.from(s).map((s) => s.toUpperCase());
    const charArr_upper = Array.from(s).map((s) => s.toLowerCase());
    let result: string[][] = [[charArr_lower[0]]];
    if (charArr_lower[0] !== charArr_upper[0]) {
        result.push([charArr_upper[0]]);
    }
    for (let i = 1; i < s.length; i++) {
        let N = result.length;
        if (charArr_lower[i] === charArr_upper[i]) {
            for (let j = 0; j < N; j++) {
                result[j].push(charArr_lower[i]);
            }
        } else {
            for (let j = 0; j < N; j++) {
                result.push([...result[j], charArr_upper[i]]);
                result[j].push(charArr_lower[i]);
            }
        }
    }

    return result.map((charArr) => charArr.join(''));
}

function _letterCasePermutation(s: string): string[] {
    const charArr = Array.from(s);
    let result: string[] = [charArr[0].toUpperCase(), charArr[0].toLowerCase()];
    for (let i = 1; i < charArr.length; i++) {
        result = result.map((s) => [s + charArr[i].toLowerCase(), s + charArr[i].toUpperCase()]).flat();
    }
    return Array.from(new Set(result));
}

function test() {
    let s: string = '';
    try {
        for (let j = 1; j <= 9; j++) {
            s =
                'k' +
                new Array(j)
                    .fill(undefined)
                    .map((v, i) => i.toString())
                    .join('') +
                'i';
            assert.deepStrictEqual(letterCasePermutation(s).sort(), _letterCasePermutation(s).sort());
        }
    } catch (e) {
        console.log(s);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
