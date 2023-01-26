import assert from 'assert';

function numDecodings(s: string): number {
    const codeSet = new Set<string>([
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
    ]);
    let n_last1Char = s.charAt(0) === '0' ? 0 : 1;
    let n_last2Char = 0;
    for (let n = 2; n <= s.length; n++) {
        const _n_last1Char = n_last1Char;
        const _n_last2Char = n_last2Char;
        const codeVaild_1 = codeSet.has(s.substring(n - 1, n));
        const codeVaild_2 = codeSet.has(s.substring(n - 2, n));
        if (codeVaild_1) {
            n_last1Char = _n_last2Char + _n_last1Char;
        } else {
            n_last1Char = 0;
        }
        if (codeVaild_2) {
            n_last2Char = _n_last1Char;
        } else {
            n_last2Char = 0;
        }
    }

    return n_last1Char + n_last2Char;
}

function _numDecodings(s: string): number {
    const codeSet = new Set<string>([
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
    ]);
    let result = 0;
    function numDecodingsEx(s: string): void {
        if (s.length === 0) result++;
        if (codeSet.has(s.substring(0, 1))) numDecodingsEx(s.substring(1));
        if (s.length >= 2 && codeSet.has(s.substring(0, 2))) numDecodingsEx(s.substring(2));
    }
    numDecodingsEx(s);
    return result;
}

function test() {
    let s: string = '';
    try {
        for (let i = 2; i < 1000; i++) {
            s = Array(i)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * 10).toString())
                .join('');
            assert.deepStrictEqual(numDecodings(s), _numDecodings(s));
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
