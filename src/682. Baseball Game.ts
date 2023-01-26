import assert from 'assert';

function calPoints(ops: string[]): number {
    const evStack: number[] = [];
    for (let op of ops) {
        const opAsNum = Number(op);
        if (!Number.isNaN(opAsNum)) {
            evStack.push(opAsNum);
        } else {
            switch (op) {
                case 'C':
                    evStack.pop();
                    break;
                case 'D':
                    evStack.push(evStack[evStack.length - 1] * 2);
                    break;
                case '+':
                    evStack.push(evStack[evStack.length - 1] + evStack[evStack.length - 2]);
                    break;
                default:
                    throw new Error();
            }
        }
    }
    let sum = 0;
    for (const num of evStack) {
        sum += num;
    }
    return sum;
}

function _calPoints(ops: string[]): number {
    //TODO
}

function test() {
    let ops: string[] = [];
    const testCases = [['5', '2', 'C', 'D', '+'], ['5', '-2', '4', 'C', 'D', '9', '+', '+'], ['1']];
    try {
        for (const testCase of testCases) {
            ops = testCase;
            assert.deepStrictEqual(calPoints(ops), _calPoints(ops));
        }
    } catch (e) {
        console.log(ops);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
