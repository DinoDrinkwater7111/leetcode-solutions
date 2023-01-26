import assert from 'assert';

function maxProfit(prices: number[]): number {
    let max = 0;
    let maxWithStock = -prices[0];
    let maxWithoutStock_noCooldown = 0;
    let maxWithoutStock_cooldown = 0;
    for (let i = 1; i < prices.length; i++) {
        const currentPrice = prices[i];
        const _maxWithStock = maxWithStock;
        const _maxWithoutStock_noCooldown = maxWithoutStock_noCooldown;
        const _maxWithoutStock_cooldown = maxWithoutStock_cooldown;
        maxWithStock = Math.max(_maxWithStock, _maxWithoutStock_noCooldown - currentPrice);
        maxWithoutStock_cooldown = _maxWithStock + currentPrice;
        maxWithoutStock_noCooldown = Math.max(_maxWithoutStock_cooldown, _maxWithoutStock_noCooldown);
        max = Math.max(max, maxWithoutStock_cooldown, maxWithoutStock_noCooldown);
    }
    return max;
}

function _maxProfit(prices: number[]): number {
    function maxProfitEx(day: number, money: number, hasStock: boolean): number {
        if (day >= prices.length) return hasStock ? 0 : money;
        if (hasStock) {
            return Math.max(maxProfitEx(day + 1, money, true), maxProfitEx(day + 2, money + prices[day], false));
        } else {
            return Math.max(maxProfitEx(day + 1, money, false), maxProfitEx(day + 1, money - prices[day], true));
        }
    }
    return maxProfitEx(0, 0, false);
}

function test() {
    let nums: number[] = [];
    try {
        for (let n = 0; n < 100; n++) {
            for (let i = 1; i < 10; i++) {
                nums = Array(i)
                    .fill(undefined)
                    .map(() => Math.floor(Math.random() * 1000));
                assert.deepStrictEqual(maxProfit(nums), _maxProfit(nums));
            }
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
