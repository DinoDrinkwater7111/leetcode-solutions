import assert from 'assert';

function increasingTriplet(nums: number[]): boolean {
    let resultArr: number[] = [nums[0]];
    let i = 0;
    for (; i < nums.length; i++) {
        const num = nums[i];
        if (num <= resultArr[0]) {
            resultArr[0] = num;
        } else {
            resultArr[1] = num;
            break;
        }
    }
    for (; i < nums.length; i++) {
        const num = nums[i];
        if (num <= resultArr[0]) {
            resultArr[0] = num;
        } else {
            if (num <= resultArr[1]) {
                resultArr[1] = num;
            } else {
                return true;
            }
        }
    }
    return false;
}
