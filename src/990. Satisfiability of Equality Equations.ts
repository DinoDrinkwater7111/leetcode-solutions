import assert from 'assert';

const funcs = [
    function equationsPossible(equations: string[]): boolean {
        let letter2group = new Map<string, number>();
        let group = 0;
        for (const [a, op, _, b] of equations) {
            const group_a = letter2group.get(a);
            const group_b = letter2group.get(b);
            if (op === '=') {
                if (group_a === undefined && group_b === undefined) {
                    letter2group.set(a, group);
                    letter2group.set(b, group);
                    group++;
                } else if (group_a !== undefined && group_b !== undefined) {
                    if (group_a !== group_b) {
                        for (const [letter, group] of letter2group) {
                            if (group === group_a) letter2group.set(letter, group_b);
                        }
                    }
                } else {
                    letter2group.set(a, group_a ?? group_b!);
                    letter2group.set(b, group_a ?? group_b!);
                }
            }
        }
        for (let i = 0; i < 26; i++) {
            const letter = String.fromCharCode(97 + i);
            if (!letter2group.has(letter)) letter2group.set(letter, group);
            group++;
        }
        for (const [a, op, _, b] of equations) {
            const group_a = letter2group.get(a);
            const group_b = letter2group.get(b);
            if (op === '!' && group_a !== undefined && group_b !== undefined && group_a === group_b) {
                return false;
            }
        }
        return true;
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
