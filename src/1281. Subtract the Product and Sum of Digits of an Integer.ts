import assert from "assert";

function subtractProductAndSum(n: number): number {
    let sum = 0;
    let product = 1;
    let _n = n;
    while (_n > 0) {
        const digit = _n % 10;
        sum += digit;
        product *= digit;
        _n = Math.floor(_n / 10);
    }
    return product - sum;
}

//TODO