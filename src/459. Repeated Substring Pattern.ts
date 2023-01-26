import assert from 'assert';

function repeatedSubstringPattern_(s: string): boolean {
    return (s + s).substring(1, 2 * s.length - 1).includes(s);
}

function repeatedSubstringPattern(s: string): boolean {
    function check(len: number): boolean {
        let count = 0;
        for (let i = len; i < s.length; i++) {
            if (s[i] !== s[count]) return false;
            count++;
            if (count === len) count = 0;
        }
        return true;
    }

    if (s.length === 1) return false;
    if (check(1)) return true;
    for (let len = Math.floor(Math.sqrt(s.length)); len >= 2; len--) {
        if (s.length % len !== 0) continue;
        if (check(len) || check(s.length / len)) return true;
    }
    return false;
}

function _repeatedSubstringPattern(s: string): boolean {
    for (let len = s.length >> 1; len >= 1; len--) {
        if (s.length % len !== 0) continue;
        if (s.substring(0, len).repeat(s.length / len) === s) return true;
    }
    return false;
}

//TODO
