import assert from 'assert';

function isValid(s: string): boolean {
    if (s.length % 2 === 1) return false;
    const close2open = {
        ')': '(',
        ']': '[',
        '}': '{',
    };
    const opens = ['(', '[', '{'];
    const chars = Array.from(s);
    const stack: string[] = [];
    for (const char of chars) {
        if (opens.includes(char)) {
            stack.push(char);
        } else {
            const last = stack.pop();
            if (last !== close2open[char as never]) return false;
        }
    }

    return stack.length === 0;
}

function _isValid(s: string): boolean {
    if (s.length % 2 === 1) return false;
    const chars = Array.from(s);
    const stack: string[] = [];
    for (const char of chars) {
        switch (char) {
            case '(':
            case '[':
            case '{':
                stack.push(char);
                break;
            case ')': {
                const last = stack.pop();
                if (last !== '(') return false;
                break;
            }
            case ']': {
                const last = stack.pop();
                if (last !== '[') return false;
                break;
            }
            case '}': {
                const last = stack.pop();
                if (last !== '{') return false;
                break;
            }
        }
    }

    return stack.length === 0;
}

function test() {
    let s: string = '';
    const pool = ['(', '[', '{', ')', ']', '}'];
    try {
        for (let n = 0; n < 1000; n++) {
            for (let i = 1; i < 10; i++) {
                s = Array(i)
                    .fill(undefined)
                    .map(() => pool[Math.floor(Math.random() * pool.length)])
                    .join('');
                assert.strictEqual(isValid(s), _isValid(s));
            }
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(s);
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
