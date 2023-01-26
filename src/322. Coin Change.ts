import assert from 'assert';

function coinChange(coins: number[], amount: number): number {
    coins = coins.filter((c) => c <= amount);
    let dp: number[] = [0];
    let count = 0;
    const calculated: null[] = [];
    while (dp.length > 0) {
        const dp_: number[] = [];
        for (const amt of dp) {
            if (amt === amount) return count;
            for (const coin of coins) {
                const amt_ = amt + coin;
                if (calculated[amt_] === undefined && amt_ <= amount) {
                    dp_.push(amt_);
                    calculated[amt_] = null;
                }
            }
        }
        dp = dp_;
        count++;
    }
    return -1;
}

function _coinChange(coins: number[], amount: number): number {
    coins = coins.filter((c) => c <= amount);
    const dp: number[] = [];
    function coinChangeEx(amt: number): number {
        if (amt === 0) return 0;
        if (amt < 0) return Number.POSITIVE_INFINITY;
        if (dp[amt] === undefined) {
            let min = Number.POSITIVE_INFINITY;
            for (let c of coins) {
                min = Math.min(min, coinChangeEx(amt - c));
            }
            dp[amt] = min + 1;
        }
        return dp[amt];
    }
    const result = coinChangeEx(amount);
    if (Number.isFinite(result)) {
        return result;
    } else {
        return -1;
    }
}

function test() {
    let coins: number[] = [];
    let amount: number = 0;
    try {
        for (let i = 2; i < 1000; i++) {
            coins = Array(12)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * 10000) + 1);
            amount = Math.random() * 10 ** 4;
            coins = [3, 7, 405, 436];
            amount = 8839;
            assert.deepStrictEqual(coinChange(coins, amount), _coinChange(coins, amount));
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
