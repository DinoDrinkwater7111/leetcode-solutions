import assert from 'assert';

function change(amount: number, coins: number[]): number {
    const dp: number[] = Array(amount + 1).fill(0);
    dp[0] = 1;
    for (const coin of coins) {
        for (let amt = coin; amt < dp.length; amt++) {
            dp[amt] += dp[amt - coin];
        }
    }
    return dp[amount];
}

function _change(amount: number, coins: number[]): number {
    coins = coins.filter((c) => c <= amount);
    if (coins.length === 0) return amount === 0 ? 1 : 0;
    let dp: number[][] = [];
    for (let amt = 0; amt <= amount; amt++) {
        dp[amt] = [1];
    }
    function changeEx(amt: number, maxCoinInd: number) {
        if (maxCoinInd === 0) return amt % coins[0] === 0 ? 1 : 0;
        if (dp[amt][maxCoinInd] === undefined) {
            let count = 0;
            const coin = coins[maxCoinInd];
            const maxCoinCanUsed = Math.floor(amt / coin);
            for (let i = 0; i <= maxCoinCanUsed; i++) {
                count += changeEx(amt - coin * i, maxCoinInd - 1);
            }
            dp[amt][maxCoinInd] = count;
        }
        return dp[amt][maxCoinInd];
    }

    return changeEx(amount, coins.length - 1);
}

function test() {
    let coins: number[] = [];
    let amount: number = 0;
    try {
        for (let i = 2; i < 1000; i++) {
            coins = Array(100)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * 10000) + 1);
            amount = Math.random() * 100;
            assert.deepStrictEqual(change(amount, coins), _change(amount, coins));
            break;
        }
    } catch (e) {
        console.log(coins);
        console.log(amount);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
