import assert from 'assert';

var solution = function (isBadVersion: any) {
    return function (n: number): number {
        let start = 1;
        let end = n;
        while (start < end) {
            const middle = Math.floor((start + end) / 2);
            if (isBadVersion(middle)) {
                end = middle;
            } else {
                start = middle + 1;
            }
        }

        return start;
    };
};

var _solution = function (isBadVersion: any) {
    return function (n: number): number {
        for (let i = 1; i <= n; i++) {
            if (isBadVersion(i)) {
                return i;
            }
        }
        throw new Error();
    };
};

function test() {
    let n: number = 0;
    let bad: number = 0;
    try {
        for (let i = 1; i < 1000; i++) {
            n = i;
            bad = Math.floor(Math.random() * n) + 1;
            const isBadVersion = (num: number) => num >= bad;
            assert.deepStrictEqual(solution(isBadVersion)(n), _solution(isBadVersion)(n));
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(n);
            console.log(bad);
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
