import assert from "assert";

function isHappy(n: number): boolean {
    function sumDigitSquare(k: number): number {
        let sum = 0;
        while (k > 0) {
            sum += (k % 10) ** 2;
            k = Math.floor(k / 10);
        }
        return sum;
    }
    let nextSum = sumDigitSquare(n);
    let histories: null[] = [];
    while (histories[nextSum] === undefined) {
        histories[nextSum] = null;
        nextSum = sumDigitSquare(nextSum);
        if (nextSum === 1) return true;
    }
    return false;
}

function _isHappy(n: number): boolean {

}

//TODO