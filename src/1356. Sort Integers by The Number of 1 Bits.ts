import assert from "assert";

function sortByBits(arr: number[]): number[] {
    const num2bitCounts: number[] = [];
    for (const num of arr) {
        let _num = num;
        let count = 0;
        while (_num > 0) {
            count += _num & 1;
            _num >>= 1;
        }
        num2bitCounts[num] = count;
    }
    arr.sort((a, b) => {
        if (num2bitCounts[a] !== num2bitCounts[b]) return num2bitCounts[a] - num2bitCounts[b];
        else return a - b;
    });
    return arr;
}

function _sortByBits(arr: number[]): number[] {
    arr.sort((a, b) => {
        const diff = a - b;
        let count_a = 0;
        while (a > 0) {
            count_a += a & 1;
            a >>= 1;
        }
        let count_b = 0;
        while (b > 0) {
            count_b += b & 1;
            b >>= 1;
        }
        const countDiff = count_a - count_b;
        if (countDiff !== 0) return countDiff;
        else return diff;
    });
    return arr;
}

//TODO