import assert from 'assert';

const funcs = [
    function findWinners(matches: number[][]): number[][] {
        const player2lose = new Map<number, number>();
        for (let i = 0; i < matches.length; i++) {
            const match = matches[i];
            player2lose.set(match[0], player2lose.get(match[0]) ?? 0);
            player2lose.set(match[1], (player2lose.get(match[1]) ?? 0) + 1);
        }
        const a1: number[] = [];
        const a2: number[] = [];
        player2lose.forEach((lose, player) => {
            if (lose === 0) a1.push(player);
            if (lose === 1) a2.push(player);
        });
        a1.sort((a, b) => a - b);
        a2.sort((a, b) => a - b);
        return [a1, a2];
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
