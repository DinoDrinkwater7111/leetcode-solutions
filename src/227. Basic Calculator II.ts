import assert from 'assert';

const funcs = [
    function calculate(s: string): number {
        let result = 0;
        let num = 0;
        let n = 0;
        let operator = 43;
        for (let i = 0; i < s.length; i++) {
            const charCode = s.charCodeAt(i);
            if (charCode === 32 && i !== s.length - 1) continue;
            if (48 <= charCode && charCode <= 57) {
                n = n * 10 + charCode - 48;
                if (i !== s.length - 1) continue;
            }
            switch (operator) {
                case 43:
                    result += num;
                    num = n;
                    break;
                case 45:
                    result += num;
                    num = -n;
                    break;
                case 42:
                    num *= n;
                    break;
                case 47:
                    num = Math.trunc(num / n);
                    break;
            }
            operator = charCode;
            n = 0;
        }
        return result + num;
    },
    function calculate(s: string): number {
        const numberStack: number[] = [];
        const operatorStack: number[] = [];
        let n = 0;
        for (let i = 0; i < s.length; i++) {
            const charCode = s.charCodeAt(i);
            if (charCode === 32) continue;
            if (48 <= charCode && charCode <= 57) {
                n = n * 10 + charCode - 48;
                continue;
            } else {
                numberStack.push(n);
                n = 0;
                if (numberStack.length > 1) {
                    switch (operatorStack[operatorStack.length - 1]) {
                        case 42:
                            numberStack.push(numberStack.pop()! * numberStack.pop()!);
                            operatorStack.pop();
                            break;
                        case 47:
                            const last = numberStack.pop()!;
                            const _last = numberStack.pop()!;
                            numberStack.push(Math.trunc(_last / last));
                            operatorStack.pop();
                            break;
                    }
                }
                operatorStack.push(charCode);
            }
        }
        numberStack.push(n);
        switch (operatorStack[operatorStack.length - 1]) {
            case 42:
                numberStack.push(numberStack.pop()! * numberStack.pop()!);
                operatorStack.pop();
                break;
            case 47:
                const last = numberStack.pop()!;
                const _last = numberStack.pop()!;
                numberStack.push(Math.trunc(_last / last));
                operatorStack.pop();
                break;
        }
        for (let i = 0; i < operatorStack.length; i++) {
            const operator = operatorStack[i];
            switch (operator) {
                case 43:
                    numberStack[i + 1] = numberStack[i] + numberStack[i + 1];
                    break;
                case 45:
                    numberStack[i + 1] = numberStack[i] - numberStack[i + 1];
                    break;
            }
        }
        return numberStack[numberStack.length - 1];
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
