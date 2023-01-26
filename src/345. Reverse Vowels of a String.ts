import assert from 'assert';

const funcs = [
    function reverseVowels(s: string): string {
        function isVowel(char: string): boolean {
            return (
                char === 'a' ||
                char === 'e' ||
                char === 'i' ||
                char === 'o' ||
                char === 'u' ||
                char === 'A' ||
                char === 'E' ||
                char === 'I' ||
                char === 'O' ||
                char === 'U'
            );
        }
        let resultCharArr = Array.from(s);
        let l = 0;
        let r = resultCharArr.length - 1;
        while (l < r) {
            if (isVowel(resultCharArr[l])) {
                while (!isVowel(resultCharArr[r])) r--;
                const temp = resultCharArr[r];
                resultCharArr[r] = resultCharArr[l];
                resultCharArr[l] = temp;
                r--;
            }
            l++;
        }
        return resultCharArr.join('');
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
