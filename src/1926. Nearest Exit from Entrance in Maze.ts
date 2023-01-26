import assert from 'assert';

const funcs = [
    function nearestExit(maze: string[][], entrance: number[]): number {
        let n = maze[0].length;
        let nexts = new Set([entrance[0] * n + entrance[1]]);
        const steps = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
        ];
        let count = 0;
        while (nexts.size > 0) {
            const nexts_ = new Set<number>();
            for (const next of nexts) {
                const i = Math.floor(next / n);
                const j = next % n;
                for (const step of steps) {
                    const i_ = i + step[0];
                    const j_ = j + step[1];
                    switch (maze[i_]?.[j_]) {
                        case undefined:
                            if (count > 0) return count;
                            break;
                        case '.':
                            nexts_.add(i_ * n + j_);
                            break;
                    }
                }
                maze[i][j] = '+';
            }
            nexts = nexts_;
            count++;
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
