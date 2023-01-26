import assert from 'assert';

function hasAllCodes_(s: string, k: number): boolean {
    const N = 1 << k;
    const mask = (N >> 1) - 1;
    const existSet: null[] = [];
    let count = 0;
    let subNum = parseInt(s.substring(0, k), 2);
    existSet[subNum] = null;
    count++;
    for (let i = 1; i <= s.length - k; i++) {
        subNum = ((subNum & mask) << 1) | (s.charCodeAt(i + k - 1) - 48);
        if (existSet[subNum] === undefined) {
            existSet[subNum] = null;
            count++;
        }
        if (count === N) return true;
    }
    return false;
}

function hasAllCodes(s: string, k: number): boolean {
    const existSet: null[] = [];
    let count = 0;
    let N = 2 ** k;
    for (let i = 0; i <= s.length - k; i++) {
        const sub = parseInt(s.substring(i, i + k), 2);
        if (existSet[sub] === undefined) {
            count++;
            existSet[sub] = null;
        }
        if (count === N) return true;
    }
    return false;
}

function _hasAllCodes(s: string, k: number): boolean {
    for (let i = 2 ** k - 1; i >= 0; i--) {
        if (!s.includes(i.toString(2).padStart(k, '0'))) return false;
    }
    return true;
}

//TODO
function test() {
    let s: string = '';
    let k: number = 0;
    try {
        for (let i = 1; i <= 8; i++) {
            const result_ = hasAllCodes_(s, k);
            const result = hasAllCodes(s, k);
            assert.deepStrictEqual(result_, result);
            const _result = _hasAllCodes(s, k);
            assert.deepStrictEqual(result, _result);
        }
    } catch (e) {
        console.log(k);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
