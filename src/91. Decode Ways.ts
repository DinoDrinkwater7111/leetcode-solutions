import assert from 'assert';

const funcs = [
    function numDecodings(s: string): number {
        function canDecode(start: number, end: number): boolean {
            if (start === end) return s[start] !== '0';
            else {
                switch (s[start]) {
                    case '1':
                        return true;
                    case '2':
                        const charCode = s.charCodeAt(end);
                        return 0 <= charCode && charCode <= 6;
                    default:
                        return false;
                }
            }
        }
        if (s[0] === '0') return 0;
        let dp_: number = 1;
        let dp: number = s[s.length - 1] === '0' ? 0 : 1;
        for (let i = s.length - 2; i >= 0; i--) {
            let _dp = 0;
            if (canDecode(i, i)) _dp += dp;
            if (canDecode(i, i + 1)) _dp += dp_;
            dp_ = dp;
            dp = _dp;
        }
        return dp;
    },
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
    },
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
        let result = 0;
        function numDecodingsEx(s: string): void {
            if (s.length === 0) result++;
            if (codeSet.has(s.substring(0, 1))) numDecodingsEx(s.substring(1));
            if (s.length >= 2 && codeSet.has(s.substring(0, 2))) numDecodingsEx(s.substring(2));
        }
        numDecodingsEx(s);
        return result;
    },
];

type TestCase = Parameters<typeof funcs[number]>;
function* testCaseIterator(): Generator<TestCase> {
    for (let i = 2; i < 1000; i++) {
        const s = Array(i)
            .fill(undefined)
            .map(() => Math.floor(Math.random() * 10).toString())
            .join('');
        yield [s];
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
