import assert from 'assert';

function jump(nums: number[]): number {
    const cache: number[] = [0];
    function jumpEx(to: number): number {
        if (cache[to] !== undefined) return cache[to];
        for (let i = 0; i < to; i++) {
            if (i + nums[i] >= to) {
                const result = jumpEx(i) + 1;
                cache[to] = result;
                return result;
            }
        }
        throw new Error();
    }

    return jumpEx(nums.length - 1);
}

function _jump(nums: number[]): number {
    function jumpEx(to: number): number {
        if (to === 0) return 0;
        let min = Number.MAX_SAFE_INTEGER;
        for (let i = 0; i < to; i++) {
            if (i + nums[i] >= to) {
                min = Math.min(min, jumpEx(i) + 1);
            }
        }
        return min;
    }

    return jumpEx(nums.length - 1);
}

function test() {
    let nums: number[] = [];
    try {
        for (let n = 0; n < 100; n++) {
            for (let i = 1; i <= 10; i++) {
                nums = Array(i)
                    .fill(undefined)
                    .map(() => Math.floor(Math.random() * 5) + 1);
                assert.deepStrictEqual(jump(nums), _jump(nums));
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
