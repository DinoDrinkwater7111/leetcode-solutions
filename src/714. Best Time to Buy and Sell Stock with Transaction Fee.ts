import assert from 'assert';

function maxProfit(prices: number[], fee: number): number {
    let max = 0;
    let maxWithStock = -prices[0];
    let maxWithoutStock = 0;
    for (let i = 1; i < prices.length; i++) {
        const currentPrice = prices[i];
        const _maxWithStock = maxWithStock;
        maxWithStock = Math.max(maxWithStock, maxWithoutStock - currentPrice);
        maxWithoutStock = Math.max(maxWithoutStock, _maxWithStock + currentPrice - fee);
        max = Math.max(max, maxWithoutStock);
    }
    return max;
}

function _maxProfit(prices: number[], fee: number): number {
    //TODO
}

function test() {
    let prices: number[] = [];
    let fee: number = 0;
    try {
        for (let i = 2; i < 1000; i++) {
            prices = Array(i)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * 1000));
            fee = Math.floor(Math.random() * 1000);
            assert.deepStrictEqual(maxProfit(prices.slice(), fee), _maxProfit(prices.slice(), fee));
        }
    } catch (e) {
        console.log(prices);
        console.log(fee);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
