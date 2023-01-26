import assert from 'assert';

const funcs = [
    function pushDominoes(dominoes: string): string {
        const resultCharArr = Array.from(dominoes);
        let start = 0;
        while (start < resultCharArr.length) {
            const curr = resultCharArr[start];
            if (curr === 'L' || curr === 'R') {
                start++;
            } else {
                let count = 1;
                while (resultCharArr[start + count] === '.') count++;
                const left = resultCharArr[start - 1] ?? 'L';
                const right = resultCharArr[start + count] ?? 'R';
                if (left === 'R' && right === 'R') {
                    for (let i = 0; i < count; i++) resultCharArr[start + i] = 'R';
                } else if (left === 'L' && right === 'L') {
                    for (let i = 0; i < count; i++) resultCharArr[start + i] = 'L';
                } else if (left === 'R' && right === 'L') {
                    const half = count >> 1;
                    for (let i = 0; i < half; i++) {
                        resultCharArr[start + i] = 'R';
                        resultCharArr[start + count - 1 - i] = 'L';
                    }
                }
                start += count;
            }
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
