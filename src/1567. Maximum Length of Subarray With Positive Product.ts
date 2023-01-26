import assert from 'assert';

function getMaxLen(nums: number[]): number {
    let result = 0;
    let negMaxLen = 0;
    let posMaxLen = 0;
    for (const num of nums) {
        switch (Math.sign(num)) {
            case -1: {
                const _negMaxLen = negMaxLen;
                negMaxLen = posMaxLen + 1;
                if (_negMaxLen > 0) {
                    posMaxLen = _negMaxLen + 1;
                } else {
                    posMaxLen = 0;
                }
                break;
            }
            case 0: {
                negMaxLen = 0;
                posMaxLen = 0;
                break;
            }
            case 1: {
                if (negMaxLen !== 0) {
                    negMaxLen++;
                }
                posMaxLen++;
                break;
            }
            default:
                throw new Error();
        }
        result = Math.max(result, posMaxLen);
    }

    return result;
}

function _getMaxLen(nums: number[]): number {
    let max = 0;
    for (const num of nums) {
        if (Math.sign(num) === 1) {
            max = 1;
            break;
        }
    }
    const cache = nums.map((num) => Math.sign(num));
    for (let n = 2; n <= nums.length; n++) {
        for (let i = 0; i <= nums.length - n; i++) {
            if (cache[i] === 0) continue;
            switch (Math.sign(nums[i + n - 1])) {
                case -1: {
                    cache[i] *= -1;
                    cache[i] += Math.sign(cache[i]);
                    break;
                }
                case 0: {
                    cache[i] = 0;
                    break;
                }
                case 1: {
                    cache[i] += Math.sign(cache[i]);
                    break;
                }
            }
            max = Math.max(cache[i], max);
        }
    }
    return max;
}

function test() {
    let nums: number[] = [];
    try {
        for (let n = 0; n < 10; n++) {
            for (let i = 0; i < 100; i++) {
                nums = Array(i)
                    .fill(undefined)
                    .map(() => Math.floor(Math.random() * 10) - 5);
                assert.strictEqual(getMaxLen(nums.slice()), _getMaxLen(nums.slice()));
            }
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
