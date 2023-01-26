import assert from 'assert';

const funcs = [
    function movesToStamp(stamp: string, target: string): number[] {
        const targetCharArr = Array.from(target);
        enum Match {
            OK,
            NOT,
            FULLQ,
        }
        function match(start: number): Match {
            let qCount = 0;
            for (let i = 0; i < stamp.length; i++) {
                if (targetCharArr[start + i] === '?') qCount++;
                else if (targetCharArr[start + i] !== stamp[i]) return Match.NOT;
            }
            return qCount === stamp.length ? Match.FULLQ : Match.OK;
        }
        const result: number[] = [];
        let startCandidates = new Set<number>();
        for (let i = 0; i <= target.length - stamp.length; i++) startCandidates.add(i);
        outer: while (startCandidates.size > 0) {
            for (const start of startCandidates.values()) {
                switch (match(start)) {
                    case Match.OK: {
                        for (let i = 0; i < stamp.length; i++) targetCharArr[start + i] = '?';
                        startCandidates.delete(start);
                        result.push(start);
                        continue outer;
                    }
                    case Match.NOT: {
                        break;
                    }
                    case Match.FULLQ: {
                        startCandidates.delete(start);
                        continue outer;
                    }
                }
            }
            return [];
        }

        return result.length <= 10 * target.length ? result.reverse() : [];
    },
];

type TestCase = Parameters<typeof funcs[number]>;
function* testCaseIterator(): Generator<TestCase> {
    //TODO
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
