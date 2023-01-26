import assert from 'assert';

function combine(n: number, k: number): number[][] {
    const result: number[][] = [];

    function genCombination(start: number, combination: number[]): void {
        if (combination.length === k) {
            result.push(combination);
            return;
        }
        for (let i = start; i <= n - (k - combination.length) + 1; i++) {
            const _combination = combination.slice();
            _combination.push(i);
            genCombination(i + 1, _combination);
        }
    }

    genCombination(1, []);

    return result;
}

function _combine(n: number, k: number): number[][] {
    const result: number[][] = [];

    function genCombination(start: number, combination: number[]): void {
        if (combination.length === k) {
            result.push(combination);
            return;
        }
        for (let i = start; i <= n; i++) {
            const _combination = combination.slice();
            _combination.push(i);
            genCombination(i + 1, _combination);
        }
    }

    genCombination(1, []);

    return result;
}

function test() {
    let n: number = 0;
    let k: number = 0;
    try {
        for (n = 1; n <= 10; n++) {
            for (k = 1; k <= n; k++) {
                assert.deepStrictEqual(combine(n, k), _combine(n, k));
            }
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(n);
            console.log(k);
            console.log(e.message);
        } else {
            console.log(n);
            console.log(k);
            console.error(e);
        }
    }
}
test();
