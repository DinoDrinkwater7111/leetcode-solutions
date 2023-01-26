import assert from 'assert';

function minOperations(nums: number[], numsDivide: number[]): number {
    //TODO
    return 0;
}

function _minOperations(nums: number[], numsDivide: number[]): number {
    function findGCD(a: number, b: number): number {
        while (a > 0) {
            const r = b % a;
            b = a;
            a = r;
        }
        return b;
    }

    let GCD = numsDivide[0];
    for (let i = 1; i < numsDivide.length; i++) GCD = findGCD(GCD, numsDivide[i]);
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length; i++) {
        if (GCD % nums[i] === 0) return i;
    }
    return -1;
}

console.log(_minOperations([2, 3, 2, 4, 3], [9, 6, 9, 3, 15]));
console.log(_minOperations([2, 3, 2, 4, 6, 5], [15, 20, 60]));
console.log(_minOperations([4, 3, 6], [8, 2, 6, 10]));
