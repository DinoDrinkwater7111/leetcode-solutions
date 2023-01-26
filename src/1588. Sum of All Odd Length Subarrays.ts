import assert from "assert";

function sumOddLengthSubarrays(arr: number[]): number {
    let sum = 0;
    for (let start = 0; start < arr.length; start++) {
        for (let end = start; end < arr.length; end += 2) {
            for (let i = start; i <= end; i++) {
                sum += arr[i];
            }
        }
    }
    return sum;
}

//TODO
