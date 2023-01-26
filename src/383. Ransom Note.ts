import assert from 'assert';

function canConstruct(ransomNote: string, magazine: string): boolean {
    const codePoint2Count: number[] = [];
    for (let i = 97; i < 123; i++) codePoint2Count[i] = 0;
    for (const char of magazine) {
        const codePoint = char.codePointAt(0)!;
        codePoint2Count[codePoint]++;
    }
    for (const char of ransomNote) {
        const codePoint = char.codePointAt(0)!;
        if (codePoint2Count[codePoint] === 0) return false;
        else codePoint2Count[codePoint]--;
    }

    return true;
}

function _canConstruct(ransomNote: string, magazine: string): boolean {}

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
