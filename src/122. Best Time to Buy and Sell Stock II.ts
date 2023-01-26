import assert from 'assert';

function maxProfit(prices: number[]): number {
    let max = 0;
    let maxWithStock = -prices[0];
    let maxWithoutStock = 0;
    for (let i = 1; i < prices.length; i++) {
        const currentPrice = prices[i];
        const _maxWithStock = maxWithStock;
        maxWithStock = Math.max(maxWithStock, maxWithoutStock - currentPrice);
        maxWithoutStock = Math.max(maxWithoutStock, _maxWithStock + currentPrice);
        max = Math.max(max, maxWithoutStock);
    }
    return max;
}

function _maxProfit(prices: number[]): number {
    let result = 0;
    let minPrice = prices[0];
    for (let i = 1; i < prices.length; i++) {
        const currentPrice = prices[i];
        if (currentPrice > minPrice) {
            result += currentPrice - minPrice;
            minPrice = currentPrice;
        } else {
            minPrice = currentPrice;
        }
    }
    return result;
}

function test() {
    let nums: number[] = [];
    try {
        for (let i = 2; i < 1000; i++) {
            nums = Array(i)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * 1000));
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
