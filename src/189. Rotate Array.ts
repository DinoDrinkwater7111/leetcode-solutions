import assert from 'assert';

/**
 * f(i) = i-k (mod n)
 * r(i) = n-i (mod n)
 * r_k(i) = (k-i) (mod n) if 1<=i<=k, (n-k-(i-k)) + k
 */
function rotate(nums: number[], k: number): void {
    function reverse(start: number, end: number) {
        for (let i = start; i <= Math.floor((start + end) / 2); i++) {
            const temp = nums[i];
            nums[i] = nums[end - i + start];
            nums[end - i + start] = temp;
        }
    }
    k %= nums.length;
    if (k === 0) return;
    reverse(0, nums.length - 1);
    reverse(0, k - 1);
    reverse(k, nums.length - 1);
}

function _rotate(nums: number[], k: number): void {
    k %= nums.length;
    if (k < nums.length / 2) {
        for (let i = 0; i < k; i++) {
            nums.unshift(nums.pop()!);
        }
    } else {
        for (let i = 0; i < nums.length - k; i++) {
            nums.push(nums.shift()!);
        }
    }
}

function __rotate(nums: number[], k: number): void {
    function swap(i: number, j: number) {
        const temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
    k %= nums.length;
    for (let i = 0; i < k; i++) {
        for (let j = nums.length - 1; j > 0; j--) {
            swap(j, j - 1);
        }
    }
}

function ___rotate(nums: number[], k: number): void {
    const result: number[] = [];

    for (let i = 0; i < nums.length; i++) {
        result[(i + k) % nums.length] = nums[i];
    }

    for (let i = 0; i < nums.length; i++) {
        nums[i] = result[i];
    }
}

function test() {
    let nums: number[] = [];
    let k: number = 0;
    try {
        for (let i = 1; i < 1000; i++) {
            nums = Array(i)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * 1000) - 500)
                .sort((a, b) => a - b);
            k = Math.floor(Math.random() * 10000) + 1;
            const result = nums.slice();
            rotate(result, k);
            const _result = nums.slice();
            _rotate(_result, k);
            const __result = nums.slice();
            __rotate(__result, k);
            const ___result = nums.slice();
            ___rotate(___result, k);
            assert.deepStrictEqual(result, _result);
            assert.deepStrictEqual(result, __result);
            assert.deepStrictEqual(result, ___result);
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log('------');
            console.log(nums);
            console.log(k);
            console.log(e.message);
        } else {
            console.log(nums);
            console.log(k);
            console.error(e);
        }
    }
}
test();
