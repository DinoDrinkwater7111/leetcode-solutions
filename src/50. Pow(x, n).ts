import assert from 'assert';

function myPow_(x: number, n: number): number {
    let result = 1;
    let x_pow2k = Math.sign(n) === 1 ? x : 1 / x;
    n = Math.abs(n);
    while (n > 0) {
        if ((n & 1) === 1) result *= x_pow2k;
        x_pow2k *= x_pow2k;
        n >>>= 1;
    }
    return result;
}

function myPow(x: number, n: number): number {
    const sign = Math.sign(n);
    n = Math.abs(n);
    const nInBinary: boolean[] = [];
    while (n > 0) {
        nInBinary.push((n & 1) === 1);
        n >>>= 1;
    }
    const cache = [sign === 1 ? x : 1 / x];
    for (let i = 1; i < nInBinary.length; i++) {
        cache[i] = cache[i - 1] * cache[i - 1];
    }
    let result = 1;
    for (let i = 0; i < nInBinary.length; i++) {
        if (nInBinary[i]) result *= cache[i];
    }
    return result;
}

function _myPow(x: number, n: number): number {
    return x ** n;
}

//TODO
