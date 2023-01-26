import assert from 'assert';

function letterCombinations(digits: string): string[] {
    if (digits.length === 0) return [];

    const digit2chars = new Map<string, string[]>();
    digit2chars.set('2', ['a', 'b', 'c']);
    digit2chars.set('3', ['d', 'e', 'f']);
    digit2chars.set('4', ['g', 'h', 'i']);
    digit2chars.set('5', ['j', 'k', 'l']);
    digit2chars.set('6', ['m', 'n', 'o']);
    digit2chars.set('7', ['p', 'q', 'r', 's']);
    digit2chars.set('8', ['t', 'u', 'v']);
    digit2chars.set('9', ['w', 'x', 'y', 'z']);

    const result: string[] = digit2chars.get(digits.charAt(0))!.slice();
    for (let n = 1; n < digits.length; n++) {
        const chars = digit2chars.get(digits.charAt(n))!;
        const currentLength = result.length;
        for (let i = 0; i < currentLength; i++) {
            const previous = result[i];
            for (let j = 0; j < chars.length; j++) {
                result[j * currentLength + i] = previous + chars[j];
            }
        }
    }

    return result;
}

function _letterCombinations(digits: string): string[] {
    if (digits.length === 0) return [];

    const digit2chars = new Map<string, string[]>();
    digit2chars.set('2', ['a', 'b', 'c']);
    digit2chars.set('3', ['d', 'e', 'f']);
    digit2chars.set('4', ['g', 'h', 'i']);
    digit2chars.set('5', ['j', 'k', 'l']);
    digit2chars.set('6', ['m', 'n', 'o']);
    digit2chars.set('7', ['p', 'q', 'r', 's']);
    digit2chars.set('8', ['t', 'u', 'v']);
    digit2chars.set('9', ['w', 'x', 'y', 'z']);

    function getResult(index: number, result: string[]): string[] {
        if (index === digits.length) return result;
        return getResult(
            index + 1,
            result
                .map((r) => {
                    const chars = digit2chars.get(digits.charAt(index))!;
                    return chars.map((c) => c + r);
                })
                .flat()
        );
    }

    return getResult(1, digit2chars.get(digits.charAt(0))!);
}

function test() {
    let s: string = '';
    const charPool = ['2', '3', '4', '5', '6', '7', '8', '9'];
    try {
        for (let n = 0; n < 100; n++) {
            for (let i = 0; i <= 4; i++) {
                s = Array(i)
                    .fill(undefined)
                    .map(() => charPool[Math.floor(Math.random() * charPool.length)])
                    .join('');
                const actual = letterCombinations(s)
                    .map((str) => Array.from(str).sort().join())
                    .sort();
                const expected = _letterCombinations(s)
                    .map((str) => Array.from(str).sort().join())
                    .sort();
                assert.deepStrictEqual(actual, expected);
            }
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
