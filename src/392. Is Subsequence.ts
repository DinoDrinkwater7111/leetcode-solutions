import * as assert from 'assert';

function isSubsequence(s: string, t: string): boolean {
    let sStart = 0;
    let tStart = 0;
    while (true) {
        if (sStart === s.length) return true;
        if (tStart === t.length) return false;
        if (t[tStart] === s[sStart]) {
            sStart++;
        }
        tStart++;
    }
}

function _isSubsequence(s: string, t: string): boolean {
    function isSubsequenceEx(sStart: number, tStart: number): boolean {
        if (sStart === s.length) return true;
        if (tStart === t.length) return false;
        if (t[tStart] !== s[sStart]) {
            return isSubsequenceEx(sStart, tStart + 1);
        } else {
            return isSubsequenceEx(sStart + 1, tStart + 1);
        }
    }

    return isSubsequenceEx(0, 0);
}

function test() {
    let s: string = '';
    let t: string = '';
    const charPool = Array(26)
        .fill(65)
        .map((v, i) => String.fromCharCode(v + i));
    try {
        for (let i = 1; i <= 100; i++) {
            s = Array(i)
                .fill(undefined)
                .map(() => charPool[Math.floor(Math.random() * charPool.length)])
                .join();
            t = Array(10000)
                .fill(undefined)
                .map(() => charPool[Math.floor(Math.random() * charPool.length)])
                .join();
            const result = isSubsequence(s, t);
            const _result = _isSubsequence(s, t);
            assert.strictEqual(result, _result);
        }
    } catch (e) {
        console.log(s);
        console.log(t);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
