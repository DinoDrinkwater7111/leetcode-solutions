import assert from 'assert';

function divide(dividend: number, divisor: number): number {
    const resultPositive = (dividend ^ divisor) >= 0;
    dividend = dividend = dividend <= 0 ? dividend : ~dividend + 1;
    divisor = divisor = divisor < 0 ? divisor : ~divisor + 1;
    let result = 0;
    const cache = [divisor];
    while (
        cache[cache.length - 1] > dividend &&
        cache[cache.length - 1] >= 0b1100_0000_0000_0000_0000_0000_0000_0000 >> 0
    ) {
        cache[cache.length] = cache[cache.length - 1] << 1;
    }
    for (let i = cache.length - 1; i >= 0; i--) {
        if (dividend <= cache[i]) {
            result |= 1 << i;
            dividend -= cache[i];
        }
    }

    // dividen === - 2^31
    if (result < 0) return resultPositive ? 0b0111_1111_1111_1111_1111_1111_1111_1111 : result;
    else return resultPositive ? result : -result;
}

function _divide(dividend: number, divisor: number): number {
    return Math.trunc(dividend / divisor);
}

function test() {
    let dividend: number = 0;
    let divisor: number = 0;
    try {
        for (let i = 2; i < 10000; i++) {
            dividend = Math.floor(Math.random() * 1000000 - 500000);
            divisor = Math.floor(Math.random() * 1000000 - 500000);
            if (divisor === 0) continue;
            const result = divide(dividend, divisor);
            const _result = _divide(dividend, divisor);
            assert.deepStrictEqual(result, _result);
        }
    } catch (e) {
        console.log(dividend);
        console.log(divisor);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
