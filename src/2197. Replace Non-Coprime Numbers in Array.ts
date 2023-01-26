import assert from 'assert';

function replaceNonCoprimes(nums: number[]): number[] {
    function findGCD(a: number, b: number): number {
        const r = Math.min(Math.abs(b - a * Math.floor(b / a)), Math.abs(b - a * Math.ceil(b / a)));
        if (r === 0) return a;
        return findGCD(r, a);
    }

    const result: number[] = [];

    function process(num: number) {
        const top = result.pop();
        if (top === undefined) {
            result.push(num);
        } else {
            const GCD = findGCD(top, num);
            if (GCD !== 1) {
                const LCM = (top * num) / GCD;
                process(LCM);
            } else {
                result.push(top, num);
            }
        }
    }

    for (let i = 0; i < nums.length; i++) {
        process(nums[i]);
    }
    return result;
}

function _replaceNonCoprimes(nums: number[]): number[] {
    if (nums.length === 1) return nums;

    function findGCD(a: number, b: number): number {
        const r = b - a * Math.floor(b / a);
        if (r === 0) return a;
        return findGCD(r, a);
    }

    let result = nums;

    for (let j = 0; j < nums.length + 1; j++) {
        for (let i = 0; i < result.length - 1; i++) {
            const GCD = findGCD(result[i], result[i + 1]);
            if (GCD !== 1) {
                const LCM = (result[i] * result[i + 1]) / GCD;
                result = [...result.slice(0, i), LCM, ...result.slice(i + 2)];
                break;
            }
        }
    }

    return result;
}

function test() {
    let nums: number[] = [];
    try {
        for (let i = 0; i < 100000; i++) {
            for (let n = 1; n < 10; n++) {
                nums = Array(n)
                    .fill(undefined)
                    .map(() => Math.floor(Math.random() * 100) + 1);
                assert.deepStrictEqual(replaceNonCoprimes(nums.slice()), _replaceNonCoprimes(nums.slice()));
            }
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(nums);
            console.log(e.message);
        } else {
            console.log(nums);
            console.error(e);
        }
    }
}
test();
