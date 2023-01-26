import assert from 'assert';

function removePalindromeSub(s: string): number {
    for (let i = s.length >> 1; i >= 0; i--) {
        if (s.charCodeAt(i) !== s.charCodeAt(s.length - 1 - i)) return 2;
    }
    return 1;
}

function _removePalindromeSub(s: string): number {}

//TODO
