import assert from 'assert';

function scoreOfParentheses(s: string): number {
    let sum = 0;
    let power = 0;
    for (let i = 0; i < s.length; i++) {
        switch (s[i]) {
            case '(': {
                power++;
                break;
            }
            case ')': {
                power--;
                if (s[i - 1] == '(') sum += 1 << power;
                break;
            }
            default:
                throw new Error();
        }
    }
    return sum;
}

function _scoreOfParentheses(s: string): number {
    const evaluationStack: (string | number)[] = [];
    for (let i = 0; i < s.length; i++) {
        switch (s[i]) {
            case '(': {
                evaluationStack.push('(');
                break;
            }
            case ')': {
                let top = evaluationStack.pop();
                let sum = 0;
                while (typeof top === 'number') {
                    sum += top;
                    top = evaluationStack.pop();
                }
                evaluationStack.push(sum === 0 ? 1 : 2 * sum);
                break;
            }
            default:
                throw new Error();
        }
    }

    let sum = 0;
    for (const num of evaluationStack) {
        sum += num as number;
    }
    return sum as number;
}

function __scoreOfParentheses(s: string): number {
    if (s.length === 0) return 0.5;
    const groups: string[] = [];
    let count = 0;
    let start = 0;
    for (let i = start; i < s.length; i++) {
        switch (s[i]) {
            case '(': {
                count++;
                break;
            }
            case ')': {
                count--;
                if (count === 0) {
                    groups.push(s.slice(start + 1, i));
                    start = i + 1;
                }
                break;
            }
            default:
                throw new Error();
        }
    }

    let sum = 0;
    for (const g of groups) {
        sum += 2 * __scoreOfParentheses(g);
    }
    return sum;
}

function test() {
    function generate(s: string): string {
        const r = Math.floor(Math.random() * 2);
        if (r === 0) {
            return '(' + s + ')';
        } else {
            return s + '()';
        }
    }

    let s: string = '';
    try {
        for (let i = 1; i <= 25; i++) {
            s = '';
            for (let j = 0; j < i; j++) {
                s = generate(s);
            }
            assert.deepStrictEqual(scoreOfParentheses(s), _scoreOfParentheses(s));
            assert.deepStrictEqual(scoreOfParentheses(s), __scoreOfParentheses(s));
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(s);
            console.log(e.message);
        } else {
            console.log(s);
            console.error(e);
        }
    }
}
test();
