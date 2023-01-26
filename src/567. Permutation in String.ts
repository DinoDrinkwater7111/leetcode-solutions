import assert from 'assert';

function checkInclusion(s1: string, s2: string): boolean {
    if (s1.length > s2.length) return false;
    const _char2n = new Map<string, number>();
    for (let i = 0; i < s1.length; i++) {
        _char2n.set(s1[i], (_char2n.get(s1[i]) ?? 0) + 1);
    }

    let start = 0;
    let end = 0;
    let char2n = new Map(_char2n);
    while (end < s2.length) {
        const _char = s2[end];
        const _n = char2n.get(_char);
        if (_n === undefined) {
            start = ++end;
            char2n = new Map(_char2n);
        } else {
            if (_n === 0) {
                let char = s2[start];
                while (char !== _char) {
                    if (char === undefined) throw new Error();
                    char2n.set(char, _char2n.get(char)! + 1);
                    char = s2[++start];
                }
                start++;
            } else if (end - start + 1 === s1.length) {
                return true;
            } else {
                char2n.set(_char, _n - 1);
            }
            end++;
        }
    }
    return false;
}

function _checkInclusion(s1: string, s2: string): boolean {
    if (s1.length > s2.length) return false;
    const sortedS1 = Array.from(s1).sort().join('');
    for (let start = 0; start <= s2.length - s1.length; start++) {
        const sortedSubstr = Array.from(s2.substring(start, start + s1.length))
            .sort()
            .join('');
        if (sortedS1 === sortedSubstr) return true;
    }

    return false;
}

function test() {
    let s1: string = '';
    let s2: string = '';
    const pool = Array(10)
        .fill(undefined)
        .map((v, i) => i.toString());
    try {
        for (let i = 1; i <= 10000; i++) {
            s1 = Array(i)
                .fill(undefined)
                .map(() => pool[Math.floor(Math.random() * pool.length)])
                .join('');
            s2 = Array(Math.floor(Math.random() * i) + 1)
                .fill(undefined)
                .map(() => pool[Math.floor(Math.random() * pool.length)])
                .join('');
            assert.strictEqual(checkInclusion(s1, s2), _checkInclusion(s1, s2));
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(s1);
            console.log(s2);
            console.log(e.message);
        } else {
            console.log(s1);
            console.log(s2);
            console.error(e);
        }
    }
}
test();
