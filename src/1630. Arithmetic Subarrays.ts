import assert from 'assert';

function checkArithmeticSubarrays(nums: number[], l: number[], r: number[]): boolean[] {
    function check(left: number, right: number): boolean {
        let max = nums[left];
        let min = nums[right];
        for (let i = left; i <= right; i++) {
            max = Math.max(nums[i], max);
            min = Math.min(nums[i], min);
        }
        const a = min;
        const d = (max - min) / (right - left);
        if (!Number.isInteger(d)) return false;
        const existanceArr: boolean[] = [];
        for (let i = left; i <= right; i++) {
            let n: number;
            if (d === 0) {
                n = nums[i] - a === 0 ? i - left : Number.NaN;
            } else {
                n = (nums[i] - a) / d;
            }
            if (!Number.isInteger(n)) return false;
            existanceArr[n] = true;
        }
        for (let i = 0; i < right - left + 1; i++) {
            if (existanceArr[i] !== true) return false;
        }
        return true;
    }

    const result: boolean[] = [];
    for (let i = 0; i < l.length; i++) {
        result.push(check(l[i], r[i]));
    }

    return result;
}

function _checkArithmeticSubarrays(nums: number[], l: number[], r: number[]): boolean[] {
    function check(left: number, right: number): boolean {
        const subArr = nums.slice(left, right + 1).sort((a, b) => a - b);
        let d = subArr[1] - subArr[0];
        for (let j = 2; j < subArr.length; j++) {
            if (d !== subArr[j] - subArr[j - 1]) {
                return false;
            }
        }
        return true;
    }

    const result: boolean[] = [];
    for (let i = 0; i < l.length; i++) {
        result.push(check(l[i], r[i]));
    }

    return result;
}

function test() {
    let nums: number[] = [];
    let l: number[] = [];
    let r: number[] = [];
    try {
        for (let n = 2; n < 1000; n++) {
            nums = Array(n)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * n));
            l = Array(100)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * (n - 1)));
            r = Array(100)
                .fill(undefined)
                .map((v, index) => Math.min(n - 1, l[index] + Math.floor(Math.random() * (n - 1)) + 1));

            assert.deepStrictEqual(checkArithmeticSubarrays(nums, l, r), _checkArithmeticSubarrays(nums, l, r));
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(nums);
            console.log(l);
            console.log(r);
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
