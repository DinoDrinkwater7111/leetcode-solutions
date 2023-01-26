import assert from "assert";

function mergeAlternately(word1: string, word2: string): string {
    let resultCharCodeArr: number[] = [];
    let minLen = Math.min(word1.length, word2.length);
    for (let i = 0; i < minLen; i++) {
        resultCharCodeArr.push(word1.charCodeAt(i));
        resultCharCodeArr.push(word2.charCodeAt(i));
    }
    return String.fromCharCode(...resultCharCodeArr)+ word1.substring(minLen) + word2.substring(minLen);
}

//TODO
