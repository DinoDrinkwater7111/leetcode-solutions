import assert from 'assert';

function findMaxLength(nums: number[]): number {
    let result = 0;
    let balance = 0;
    const balance2minInd = new Map<number, number>();
    balance2minInd.set(0, -1);
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            balance--;
        } else {
            balance++;
        }
        if (!balance2minInd.has(balance)) {
            balance2minInd.set(balance, i);
        } else {
            result = Math.max(result, i - balance2minInd.get(balance)!);
        }
    }

    return result;
}

function _findMaxLength(nums: number[]): number {
    let result = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            const length = j - i + 1;
            if (length % 2 !== 0 || length <= result) continue;
            let sum = 0;
            for (let ind = i; ind <= j; ind++) {
                sum += nums[ind];
            }
            if (sum * 2 === length) result = length;
        }
    }
    return result;
}

function test() {
    let nums: number[] = [];
    try {
        for (let n = 0; n < 10; n++) {
            for (let i = 0; i < 100; i++) {
                nums = Array(i)
                    .fill(undefined)
                    .map(() => Math.floor(Math.random() * 2));
                assert.strictEqual(findMaxLength(nums.slice()), _findMaxLength(nums.slice()));
            }
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(nums);
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
