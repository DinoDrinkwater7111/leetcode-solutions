import assert from 'assert';

function reverse(x: number): number {
    let result = 0;
    let isNegative = x < 0 ? true : false;
    let num = isNegative ? -x : x;
    while (num >= 10) {
        const _num = num % 10;
        result = result * 10 + _num;
        num = Math.floor(num / 10);
    }
    if (result >= 214748365) {
        return 0;
    }
    if (isNegative) {
        return -result * 10 - num;
    } else {
        return result * 10 + num;
    }
}

function _reverse(x: number): number {
    let isNegative = x < 0 ? true : false;
    if (isNegative) x = -x;
    let result = parseInt(Array.from(x.toString()).reverse().join(''));
    if (isNegative) result *= -1;
    if (result < -2147483648 || result > 2147483647) {
        return 0;
    } else {
        return result;
    }
}

function test() {
    let x = 0;

    try {
        for (let i = 1; i < 1000; i++) {
            x = Math.floor(Math.random() * 2147483648 - 2147483648 / 2);
            assert.equal(reverse(x), _reverse(x));
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
