import assert from "assert";

function freqAlphabets(s: string): string {
    const resultCharCodeArr: number[] = [];
    let i = s.length - 1;
    while (i >= 0) {
        const char = s[i];
        if (char === '#') {
            resultCharCodeArr.push(Number(s[i - 2] + s[i - 1]) + 96);
            i -= 3;
        } else {
            resultCharCodeArr.push(Number(char) + 96);
            i--;
        }
    }
    resultCharCodeArr.reverse();
    return String.fromCharCode(...resultCharCodeArr);
}

//TODO