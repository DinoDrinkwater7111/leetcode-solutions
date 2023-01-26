import assert from 'assert';

function isPalindrome(x: number): boolean {
    if (x < 0) return false;
    const digits: number[] = [];
    while (x >= 10) {
        digits.push(x % 10);
        x = Math.floor(x / 10);
    }
    digits.push(x);
    for (let i = 0; i < digits.length; i++) {
        if (digits[i] !== digits[digits.length - 1 - i]) {
            return false;
        }
    }
    return true;
}

function _isPalindrome(x: number): boolean {
    if (x < 0) return false;
    const str = x.toString();
    const charArr = Array.from(str);
    return charArr.reverse().join('') === str;
}

function test() {
    let x: number = 0;
    try {
        for (let i = 1; i < 100000; i++) {
            x = Math.floor(Math.random() * i);
            assert.equal(isPalindrome(x), _isPalindrome(x));
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(x);
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
