import assert from 'assert';

function mySqrt(x: number): number {
    let end = Math.min(46340, Math.ceil(x / 2));
    if (x > end * end) return end;
    let start = 0;
    while (start < end) {
        const mid = Math.ceil((start + end) / 2);
        const square = mid * mid;
        if (x < square) {
            end = mid - 1;
        } else {
            start = mid;
        }
    }
    return start;
}

function _mySqrt(x: number): number {

}

//TODO
