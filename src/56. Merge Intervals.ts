import assert from 'assert';

function merge(intervals: number[][]): number[][] {}

function _merge(intervals: number[][]): number[][] {
    const result: number[][] = [];
    intervals.sort((i1, i2) => i1[0] - i2[0]);
    let min = intervals[0][0];
    let max = intervals[0][1];
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] <= max) {
            max = Math.max(max, intervals[i][1]);
        } else {
            result.push([min, max]);
            min = intervals[i][0];
            max = intervals[i][1];
        }
    }
    result.push([min, max]);
    return result;
}

//TODO
