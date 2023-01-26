import assert from 'assert';

function nthUglyNumber(n: number): number {
    const cache = [1];
    let startInd_2 = 0;
    let startInd_3 = 0;
    let startInd_5 = 0;
    while (cache.length < n) {
        cache.push(Math.min(cache[startInd_2] * 2, cache[startInd_3] * 3, cache[startInd_5] * 5));
        if (cache[cache.length - 1] === cache[startInd_2] * 2) startInd_2++;
        if (cache[cache.length - 1] === cache[startInd_3] * 3) startInd_3++;
        if (cache[cache.length - 1] === cache[startInd_5] * 5) startInd_5++;
    }
    return cache[n - 1];
}

function _nthUglyNumber(n: number): number {
    const cache_2 = [2];
    let startInd_2 = 0;
    const cache_3 = [3];
    let startInd_3 = 0;
    const cache_5 = [5];
    let startInd_5 = 0;
    let result = 1;
    let count = 1;
    while (count < n) {
        result = Math.min(cache_2[startInd_2], cache_3[startInd_3], cache_5[startInd_5]);
        count++;
        if (cache_2[startInd_2] === result) startInd_2++;
        if (cache_3[startInd_3] === result) startInd_3++;
        if (cache_5[startInd_5] === result) startInd_5++;
        cache_2.push(result * 2);
        cache_3.push(result * 3);
        cache_5.push(result * 5);
    }
    return result;
}

function __nthUglyNumber(n: number): number {
    if (n <= 5) return n;
    const previousNumbers: number[][] = [[], [5], [10, 6], [15, 9, 6]];
    let result = 4;
    let count = 4;
    let minSearchInd = 1;
    while (count < n) {
        const _minSearchInd = minSearchInd;
        previousNumbers.push([result * 5, result * 3, result * 2]);
        let min = Number.POSITIVE_INFINITY;
        for (let i = _minSearchInd; ; i++) {
            const candidateStack = previousNumbers[i];
            if (candidateStack[candidateStack.length - 1] < min) {
                min = candidateStack[candidateStack.length - 1];
            } else if (candidateStack.length === 3) {
                break;
            }
        }
        for (let i = _minSearchInd; ; i++) {
            const candidateStack = previousNumbers[i];
            if (candidateStack[candidateStack.length - 1] === min) {
                candidateStack.pop();
                if (candidateStack.length === 0) {
                    minSearchInd++;
                }
            } else if (candidateStack.length === 3) {
                break;
            }
        }
        result = min;
        count++;
    }
    return result;
}

function ___nthUglyNumber(n: number): number {
    let result = 1;
    let count = 1;
    let num = 2;
    while (count < n) {
        let currentNum = num;
        while (Number.isInteger(currentNum / 2)) {
            currentNum /= 2;
        }
        while (Number.isInteger(currentNum / 3)) {
            currentNum /= 3;
        }
        while (Number.isInteger(currentNum / 5)) {
            currentNum /= 5;
        }
        if (currentNum === 1) {
            result = num;
            count++;
        }
        num++;
    }
    return result;
}

function test() {
    let n: number = 0;
    try {
        for (n = 1; n <= 500; n++) {
            const result = nthUglyNumber(n);
            const _result = _nthUglyNumber(n);
            const __result = __nthUglyNumber(n);
            const ___result = ___nthUglyNumber(n);
            assert.deepStrictEqual(result, _result);
            assert.deepStrictEqual(_result, __result);
            assert.deepStrictEqual(___result, ___result);
        }
    } catch (e) {
        console.log(n);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
