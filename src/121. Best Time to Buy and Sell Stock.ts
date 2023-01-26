import assert from 'assert';

function maxProfit(prices: number[]): number {
    let max = 0;
    let min_i = prices[0];
    for (const price of prices) {
        min_i = Math.min(min_i, price);
        max = Math.max(price - min_i, max);
    }
    return max;
}

function _maxProfit(prices: number[]): number {
    let max = 0;
    for (let i = 0; i < prices.length - 1; i++) {
        for (let j = i; j < prices.length; j++) {
            max = Math.max(max, prices[j] - prices[i]);
        }
    }
    return max;
}

function test() {
    let nums: number[] = [];
    try {
        for (let i = 2; i < 1000; i++) {
            nums = Array(i)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * 1000) - 500);
            assert.deepStrictEqual(maxProfit(nums), _maxProfit(nums));
        }
    } catch (e) {
        console.log(nums);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
