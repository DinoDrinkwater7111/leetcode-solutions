import assert from 'assert';

const funcs = [
    function calculate(s: string): number {
        const evStack: (string | number)[] = ['('];
        function push(p: string | number): void {
            switch (p) {
                case '(': {
                    evStack.push('(');
                    break;
                }
                case ')': {
                    const num = evStack.pop() as number;
                    evStack.pop();
                    push(num);
                    break;
                }
                case '+':
                case '-': {
                    evStack.push(p);
                    break;
                }
                default: {
                    if (evStack[evStack.length - 1] === '(') {
                        evStack.push(p);
                    } else {
                        if (evStack[evStack.length - 1] === '-' && evStack[evStack.length - 2] === '(') {
                            evStack.pop();
                            evStack.push(-p);
                        } else {
                            const op = evStack.pop() as string;
                            const num1 = evStack.pop() as number;
                            if (op === '-') evStack.push(num1 - (p as number));
                            else evStack.push(num1 + (p as number));
                        }
                    }
                }
            }
        }
        let i = 0;
        while (i < s.length) {
            const c = s[i];
            switch (c) {
                case ' ':
                    i++;
                    break;
                case '(':
                case ')':
                case '+':
                case '-':
                    push(c);
                    i++;
                    break;
                default:
                    const numCharCodeArr: number[] = [];
                    while (true) {
                        const charCode = s.charCodeAt(i);
                        if (48 <= charCode && charCode <= 57) {
                            numCharCodeArr.push(charCode);
                            i++;
                        } else {
                            push(Number(String.fromCharCode(...numCharCodeArr)));
                            break;
                        }
                    }
            }
        }
        return evStack[1] as number;
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
