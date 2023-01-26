import assert from 'assert';

function kInversePairs(n: number, k: number): number {
    const mod = 10 ** 9 + 7;
    let dp: number[] = Array(k + 1).fill(0);
    dp[0] = 1;
    for (let i = 1; i <= n; i++) {
        const dp_: number[] = [1];
        for (let j = 1; j <= k; j++) {
            dp_[j] = (dp_[j - 1] + dp[j] - (dp[j - i] ?? 0)) % mod;
        }
        dp = dp_;
    }

    return dp[k];
}

function _kInversePairs(n: number, k: number): number {
    const mod = 10 ** 9 + 7;
    const dp: number[][] = Array(n)
        .fill(undefined)
        .map(() => []);
    function kInversePairsEx(n: number, k: number): number {
        if (k === 0) return 1;
        if (n < 2) return 0;
        let count = 0;
        for (let i = 0; i < n && i <= k; i++) count += dp[n - 1][k - i] ??= kInversePairsEx(n - 1, k - i);
        return count % mod;
    }

    return kInversePairsEx(n, k);
}

//TODO
