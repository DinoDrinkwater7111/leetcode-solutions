import assert from "assert";

function findTheDifference(s: string, t: string): string {
    const charCode2count: number[] = [];
    for (let i = 0; i < s.length; i++) {
        charCode2count[s.charCodeAt(i)] = (charCode2count[s.charCodeAt(i)] ?? 0) + 1;
    }
    for (let i = 0; i < t.length; i++) {
        const charCode = t.charCodeAt(i);
        if (charCode2count[charCode] === undefined || charCode2count[charCode] === 0) {
            return t[i];
        } else {
            charCode2count[charCode]--;
        }
    }
    throw new Error();
}

//TODO