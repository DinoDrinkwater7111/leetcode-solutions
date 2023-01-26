import assert from 'assert';

const funcs = [
    function minMutation(start: string, end: string, bank: string[]): number {
        function isNext(from: string, to: string): boolean {
            let hasChanged = false;
            for (let i = 0; i < 8; i++) {
                if (from[i] !== to[i]) {
                    if (hasChanged) return false;
                    else hasChanged = true;
                }
            }
            return hasChanged;
        }
        let count = 0;
        let variances = [start];
        while (variances.length > 0) {
            count++;
            const variances_: string[] = [];
            for (let i = 0; i < variances.length; i++) {
                const variance = variances[i];
                for (let j = 0; j < bank.length; j++) {
                    const candidate = bank[j];
                    if (isNext(variance, candidate)) {
                        if (candidate === end) return count;
                        variances_.push(candidate);
                        bank[j] = bank[bank.length - 1];
                        bank.pop();
                        j--;
                    }
                }
            }
            variances = variances_;
        }
        return -1;
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
