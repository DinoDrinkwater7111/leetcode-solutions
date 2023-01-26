import assert from "assert";

function toLowerCase(s: string): string {
    const resultCharCodeArr: number[] = [];
    for (let i = 0; i < s.length; i++) {
        const charCode = s.charCodeAt(i);
        if (65 <= charCode && charCode <= 90) {
            resultCharCodeArr.push(charCode + 32);
        } else {
            resultCharCodeArr.push(charCode);
        }
    }
    return String.fromCharCode(...resultCharCodeArr);
}

//TODO