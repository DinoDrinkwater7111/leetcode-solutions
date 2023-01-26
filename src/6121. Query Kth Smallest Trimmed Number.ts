import assert from 'assert';

function smallestTrimmedNumbers(nums: string[], queries: number[][]): number[] {
    //TODO
    return [];
}

function _smallestTrimmedNumbers(nums: string[], queries: number[][]): number[] {
    const numLength = nums[0].length;
    const trimmAndSortedNumInds: number[][] = [];
    const result: number[] = [];
    for (const query of queries) {
        const k = query[0];
        const trim = query[1];
        if (trimmAndSortedNumInds[trim] === undefined) {
            const trimed = nums.map((num) => num.substring(numLength - trim, numLength));
            const indexs = Array(trimed.length)
                .fill(0)
                .map((v, i) => i);
            indexs.sort((a, b) => {
                if (trimed[a] > trimed[b]) return 1;
                else if (trimed[a] < trimed[b]) return -1;
                else return a - b;
            });
            trimmAndSortedNumInds[trim] = indexs;
        }
        result.push(trimmAndSortedNumInds[trim][k - 1]);
    }
    return result;
}

console.log(
    _smallestTrimmedNumbers(
        ['102', '473', '251', '814'],
        [
            [1, 1],
            [2, 3],
            [4, 2],
            [1, 2],
        ]
    )
);
console.log(
    _smallestTrimmedNumbers(
        ['24', '37', '96', '04'],
        [
            [2, 1],
            [2, 2],
        ]
    )
);
