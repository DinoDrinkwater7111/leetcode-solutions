import assert from 'assert';

function firstUniqChar(s: string): number {
    const codePoint2isCandidate: boolean[] = [];
    for (const char of s) {
        const codePoint = char.codePointAt(0)!;
        if (codePoint2isCandidate[codePoint] === undefined) {
            codePoint2isCandidate[codePoint] = true;
        } else {
            codePoint2isCandidate[codePoint] = false;
        }
    }
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        const codePoint = char.codePointAt(0)!;
        if (codePoint2isCandidate[codePoint]) return i;
    }

    return -1;
}

function _firstUniqChar(s: string): number {}

//TODO
function test() {
    let nums: number[] = [];
    let target: number = 0;
    try {
        for (let i = 2; i < 1000; i++) {
            nums = Array(i)
                .fill(undefined)
                .map(() => Math.random() - 0.5);
            const i1 = Math.floor(Math.random() * i);
            let i2 = Math.floor(Math.random() * i);
            while (i2 === i1) i2 = Math.floor(Math.random() * i);
            target = nums[i1] + nums[i2];
            assert.deepStrictEqual(twoSum(nums, target), _twoSum(nums, target));
        }
    } catch (e) {
        console.log(nums);
        console.log(target);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
