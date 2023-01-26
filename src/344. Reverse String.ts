import assert from 'assert';

function reverseString(s: string[]): void {
    for (let i = 0; i <= Math.floor((s.length - 1) / 2); i++) {
        const temp = s[i];
        s[i] = s[s.length - 1 - i];
        s[s.length - 1 - i] = temp;
    }
}

function _reverseString(s: string[]): void {
    s.reverse();
}

function test() {
    let s: string[] = [];
    const pool = Array(10)
        .fill(undefined)
        .map((v, i) => i.toString());
    try {
        for (let i = 2; i < 1000; i++) {
            s = Array(i)
                .fill(undefined)
                .map(() => pool[Math.floor(Math.random() * pool.length)]);
            const result = s.slice();
            reverseString(result);
            const _result = s.slice();
            _reverseString(_result);
            assert.deepStrictEqual(result, _result);
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
