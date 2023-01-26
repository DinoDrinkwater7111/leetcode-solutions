import assert from 'assert';

function evalRPN(tokens: string[]): number {
    let evStack: ('+' | '-' | '*' | '/' | number)[] = [];
    for (let i = tokens.length - 1; i >= 0; i--) {
        let num = Number(tokens[i]);
        if (Number.isNaN(num)) {
            evStack.push(tokens[i] as never);
        } else {
            evStack.push(num);
        }
        while (typeof evStack[evStack.length - 1] === 'number' && typeof evStack[evStack.length - 2] === 'number') {
            const num__ = evStack.pop() as number;
            const num_ = evStack.pop() as number;
            switch (evStack.pop()) {
                case '+':
                    evStack.push(num__ + num_);
                    break;
                case '-':
                    evStack.push(num__ - num_);
                    break;
                case '*':
                    evStack.push(num__ * num_);
                    break;
                case '/':
                    evStack.push(Math.trunc(num__ / num_));
                    break;
                default:
                    throw new Error();
            }
        }
    }
    return evStack[0] as number;
}

function _evalRPN(tokens: string[]): number {}

//TODO
