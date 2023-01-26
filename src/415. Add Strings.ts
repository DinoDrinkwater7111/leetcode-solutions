import assert from 'assert';

function addStrings(num1: string, num2: string): string {
    if (num1.length < num2.length) {
        const temp = num1;
        num1 = num2;
        num2 = temp;
    }
    const resultArr: number[] = [];
    for (let i = 0; i < num1.length; i++) {
        resultArr[i] = num1.charCodeAt(i) - 48;
    }
    const lenDiff = num1.length - num2.length;
    for (let i = 0; i < num2.length; i++) {
        resultArr[i + lenDiff] += num2.charCodeAt(i) - 48;
    }
    for (let i = resultArr.length - 1; i >= 1; i--) {
        if (resultArr[i] > 9) {
            resultArr[i] -= 10;
            resultArr[i - 1]++;
        }
    }
    return resultArr.join('');
}

function _addStrings(num1: string, num2: string): string {
    return (BigInt(num1) + BigInt(num2)).toString();
}

//TODO
