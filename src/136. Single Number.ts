import assert from 'assert';

function singleNumber(nums: number[]): number {
    let result = nums[0];
    for (let i = 1; i < nums.length; i++) {
        result ^= nums[i];
    }
    return result;
}

function _singleNumber(nums: number[]): number {
    const set = new Set<number>();
    for (const num of nums) {
        if (set.has(num)) {
            set.delete(num);
        } else {
            set.add(num);
        }
    }

    return set.values().next().value;
}

function test() {
    let nums: number[] = [];
    try {
        for (let i = 0; i < 1000; i++) {
            const set = new Set(
                Array(i)
                    .fill(undefined)
                    .map(() => Math.floor(Math.random() * 500))
            );
            let random = Math.floor(Math.random() * 1000);
            while (set.has(random)) random = Math.floor(Math.random() * 1000);
            nums = [...set, random, ...set].sort(() => Math.random() * 1 - 0.5);
            assert.deepStrictEqual(singleNumber(nums.slice()), _singleNumber(nums.slice()));
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
