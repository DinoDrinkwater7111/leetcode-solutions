import assert from 'assert';

function intersect(nums1: number[], nums2: number[]): number[] {
    const num2count1: number[] = [];
    for (let i = 0; i < nums1.length; i++) {
        num2count1[nums1[i]] = (num2count1[nums1[i]] ?? 0) + 1;
    }
    const result: number[] = [];
    for (const num2 of nums2) {
        if (num2count1[num2] !== undefined && num2count1[num2] > 0) {
            result.push(num2);
            num2count1[num2]--;
        }
    }
    return result;
}

function _intersect(nums1: number[], nums2: number[]): number[] {}


//TODO
function test() {
    let coins: number[] = [];
    let amount: number = 0;
    try {
        for (let i = 2; i < 1000; i++) {
            coins = Array(12)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * 10000) + 1);
            amount = Math.random() * 10 ** 4;
            coins = [3, 7, 405, 436];
            amount = 8839;
            assert.deepStrictEqual(coinChange(coins, amount), _coinChange(coins, amount));
            break;
        }
    } catch (e) {
        console.log(coins);
        console.log(amount);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
