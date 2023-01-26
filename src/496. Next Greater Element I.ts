import assert from 'assert';

function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
    const result: number[] = [];
    const num_to_greaterNum: number[] = [];
    const stack: number[] = [];
    for (const num2 of nums2) {
        while (num2 > stack[stack.length - 1]) {
            num_to_greaterNum[stack.pop()!] = num2;
        }
        stack.push(num2);
    }
    for (const num1 of nums1) {
        result.push(num_to_greaterNum[num1] ?? -1);
    }
    return result;
}

function _nextGreaterElement(nums1: number[], nums2: number[]): number[] {
    const dp: number[] = [];
    const num2_to_ind: number[] = [];
    dp[nums2.length - 1] = -1;
    num2_to_ind[nums2[nums2.length - 1]] = nums2.length - 1;
    for (let i = nums2.length - 2; i >= 0; i--) {
        let j = i + 1;
        const num2 = nums2[i];
        num2_to_ind[num2] = i;
        while (true) {
            console.log(j);
            if (j === -1) {
                dp[i] = -1;
                break;
            } else if (num2 < nums2[j]) {
                dp[i] = j;
                break;
            } else {
                j = dp[j];
            }
        }
    }

    const result: number[] = [];
    for (const num1 of nums1) {
        const num2Ind = num2_to_ind[num1];
        const greaterNumInd = dp[num2Ind];
        if (greaterNumInd === -1) {
            result.push(-1);
        } else {
            result.push(nums2[greaterNumInd]);
        }
    }
    return result;
}

//TODO
