import assert from 'assert';

const funcs = [
    function reverseWords(s: string): string {
        const resultArr: string[] = [];
        let reverseCharArr: string[] = [];
        for (let i = s.length - 1; i >= 0; i--) {
            if (s[i] === ' ') {
                resultArr.push(reverseCharArr.join(''), ' ');
                reverseCharArr = [];
            } else {
                reverseCharArr.push(s[i]);
            }
        }
        if (reverseCharArr.length > 0) resultArr.push(reverseCharArr.join(''));
        return resultArr.reverse().join('');
    },
    function reverseWords(s: string): string {
        function reverse(arr: unknown[], start: number, end: number) {
            if (start >= end) return;
            for (let i = start; i <= Math.floor((start + end) / 2); i++) {
                const temp = arr[i];
                arr[i] = arr[end - i + start];
                arr[end - i + start] = temp;
            }
        }

        let charArr: string[] = Array.from(s);
        let currentWordInd = 0;
        while (currentWordInd < charArr.length) {
            while (charArr[currentWordInd] === ' ') {
                currentWordInd++;
            }
            let i = currentWordInd + 1;
            while (i < charArr.length && charArr[i] !== ' ') {
                i++;
            }
            reverse(charArr, currentWordInd, i - 1);
            currentWordInd = i + 1;
        }

        return charArr.join('');
    },
    function reverseWords(s: string): string {
        return s
            .split(' ')
            .map((w) => Array.from(w).reverse().join(''))
            .join(' ');
    },
];

type TestCase = Parameters<typeof funcs[number]>;
function* testCaseIterator(): Generator<TestCase> {
    const pool = Array(10)
        .fill(undefined)
        .map((v, i) => i.toString());
    pool.push(' ');
    for (let n = 0; n < 1000; n++) {
        yield [
            Array(n)
                .fill(undefined)
                .map(() => pool[Math.floor(Math.random() * pool.length)])
                .join(''),
        ];
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
