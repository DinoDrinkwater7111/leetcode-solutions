import assert from 'assert';

function eraseOverlapIntervals(intervals: number[][]): number {
    intervals.sort((i1, i2) => i1[0] - i2[0]);
    let result = 0;
    let max = intervals[0][1];
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < max) {
            max = Math.min(max, intervals[i][1]);
            result++;
        } else {
            max = intervals[i][1];
        }
    }
    return result;
}

//TODO
