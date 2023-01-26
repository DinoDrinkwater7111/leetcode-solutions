import assert from 'assert';

function numberOfSteps(num: number): number {
    let result = 0;
    while (num > 0) {
        result += num & 1;
        if (num === 1) return result;
        num >>= 1;
        result++;
    }
    return result;
}

function _numberOfSteps(num: number): number {}

//TODO
