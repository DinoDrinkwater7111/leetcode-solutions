import assert from 'assert';

function myAtoi(s: string): number {
    let charArr = Array.from(s.trim());
    let isNegative = false;
    if (charArr[0] < '0' || '9' < charArr[0]) {
        if (charArr[0] === '-') {
            isNegative = true;
            charArr.shift();
        } else if (charArr[0] === '+') {
            charArr.shift();
        } else {
            return 0;
        }
    }

    while (charArr[0] === '0') {
        charArr.shift();
    }

    if (charArr.length === 0) return 0;

    const endInd = charArr.findIndex((char) => char > '9' || char < '0');
    if (endInd === 0) return 0;
    if (endInd + 1 > 11) {
        return isNegative ? -2147483648 : 2147483647;
    }

    let result = parseInt(charArr.slice(0, endInd === -1 ? undefined : endInd).join(''));
    if (isNegative) result *= -1;
    if (result > 2147483647) {
        return 2147483647;
    } else if (result < -2147483648) {
        return -2147483648;
    } else {
        return result;
    }
}

function _myAtoi(s: string): number {
    const result = parseInt(s);
    if (Number.isNaN(result)) return 0;

    if (result > 2147483647) {
        return 2147483647;
    } else if (result < -2147483648) {
        return -2147483648;
    } else {
        return result;
    }
}

function test() {
    let s: string = '';
    const charPool = ['1', '2', '3', '4', 'a', '+', '-'];
    try {
        for (let i = 1; i < 10000; i++) {
            s = Array(i)
                .fill(undefined)
                .map(() => charPool[Math.floor(Math.random() * charPool.length)])
                .join('');
            assert.equal(myAtoi(s), _myAtoi(s));
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(s);
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
