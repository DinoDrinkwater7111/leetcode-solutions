import assert from 'assert';

function permute(nums: number[]): number[][] {
    const result: number[][] = [];

    function permuteEx(p: number[], count: number): void {
        if (count === nums.length) {
            result.push(p);
            return;
        }
        for (let i = count; i < p.length; i++) {
            const _p = p.slice();
            const temp = _p[count];
            _p[count] = _p[i];
            _p[i] = temp;
            permuteEx(_p, count + 1);
        }
    }

    permuteEx(nums, 0);

    return result;
}

function _permute(nums: number[]): number[][] {
    const result: number[][] = [];

    function permuteEx(p: number[], pool: number[]): void {
        if (p.length === nums.length) {
            result.push(p);
            return;
        }
        for (let i = 0; i < nums.length - p.length; i++) {
            const _p = p.slice();
            const _pool = pool.slice();
            _p.push(_pool[i]);
            _pool[i] = _pool[_pool.length - 1];
            _pool.pop();
            permuteEx(_p, _pool);
        }
    }

    permuteEx([], nums);

    return result;
}

function test() {
    let nums: number[] = [];
    try {
        for (let n = 0; n < 6; n++) {
            nums = new Array(n).fill(undefined).map((v, i) => i);
            assert.deepStrictEqual(permute(nums), _permute(nums));
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
