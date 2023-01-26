import assert from 'assert';

function productExceptSelf(nums: number[]): number[] {
    let prod = 1;
    let n0 = 0;
    for (const num of nums) {
        if (num === 0) n0++;
        else prod *= num;
    }
    const result: number[] = [];
    for (const num of nums) {
        if (n0 > 1) {
            result.push(0);
        } else {
            if (num === 0) {
                result.push(prod);
            } else {
                result.push(n0 === 0 ? prod / num : 0);
            }
        }
    }
    return result;
}

//TODO