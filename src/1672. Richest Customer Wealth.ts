import assert from "assert";

function maximumWealth(accounts: number[][]): number {
    let result = Number.NEGATIVE_INFINITY;
    for (const customer of accounts) {
        let sum = 0;
        for (const money of customer) {
            sum += money;
        }
        result = Math.max(result, sum);
    }
    return result;
}

//TODO