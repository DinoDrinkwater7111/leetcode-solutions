import assert from 'assert';

const funcs = [
    function removeStones(stones: number[][]): number {
        let nGroup = 0;
        const x2stones = new Map<number, number[][]>();
        const y2stones = new Map<number, number[][]>();
        for (const stone of stones) {
            const stones_x = x2stones.get(stone[0]) ?? [];
            stones_x.push(stone);
            x2stones.set(stone[0], stones_x);
            const stones_y = y2stones.get(stone[1]) ?? [];
            stones_y.push(stone);
            y2stones.set(stone[1], stones_y);
        }
        for (const x of x2stones.keys()) {
            nGroup++;
            let next_x = [x];
            let next_y: number[] = [];
            while (next_x.length > 0 || next_y.length > 0) {
                const next_x_: number[] = [];
                const next_y_: number[] = [];
                for (const x of next_x) {
                    const stones = x2stones.get(x) ?? [];
                    for (const stone of stones) next_y_.push(stone[1]);
                    x2stones.delete(x);
                }
                for (const y of next_y) {
                    const stones = y2stones.get(y) ?? [];
                    for (const stone of stones) next_x_.push(stone[0]);
                    y2stones.delete(y);
                }
                next_x = next_x_;
                next_y = next_y_;
            }
        }
        return stones.length - nGroup;
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
