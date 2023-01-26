import assert from 'assert';

function addToArrayForm(num: number[], k: number): number[] {
    if (num.length < 6) {
        let n = 0;
        num.forEach((v) => (n = n * 10 + v));
        const sumStr = (n + k).toString();
        const result: number[] = [];
        for (let i = 0; i < sumStr.length; i++) result.push(sumStr.charCodeAt(i) - 48);
        return result;
    } else {
        const result = num.slice();
        let currDigit = result.length - 1;
        while (k > 0) {
            result[currDigit] += k % 10;
            currDigit--;
            k = Math.floor(k / 10);
        }
        for (let i = result.length - 1; i >= 1; i--) {
            if (result[i] >= 10) {
                result[i] -= 10;
                result[i - 1]++;
            } else if (i <= result.length - 6) {
                break;
            }
        }
        if (result[0] >= 10) {
            result[0] -= 10;
            result.splice(0, 0, 1);
        }
        return result;
    }
}
