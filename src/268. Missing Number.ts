import assert from 'assert';

function missingNumber(nums: number[]): number {
    let max = 0;
    let sum = 0;
    let has0 = false;
    for (const num of nums) {
        if (num === 0) has0 = true;
        max = Math.max(max, num);
        sum += num;
    }
    const diff = (max * (max + 1)) / 2 - sum;
    if (diff !== 0) return diff;
    else return has0 ? max + 1 : 0;
}

function _missingNumber(nums: number[]): number {}

//TODO
function test() {
    let dividend: number = 0;
    let divisor: number = 0;
    try {
        for (let i = 2; i < 10000; i++) {
            dividend = Math.floor(Math.random() * 1000000 - 500000);
            divisor = Math.floor(Math.random() * 1000000 - 500000);
            if (divisor === 0) continue;
            const result = missingNumber(dividend, divisor);
            const _result = missingNumber(dividend, divisor);
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
