import assert from 'assert';

function numMatchingSubseq(s: string, words: string[]): number {
    const char2indexs = new Map<string, number[]>();
    for (let i = 0; i < 26; i++) char2indexs.set(String.fromCharCode(i + 97), []);
    for (let i = 0; i < s.length; i++) char2indexs.get(s[i])!.push(i);

    function findSubInd(sortedArr: number[], start: number, end: number, target: number): number {
        if (sortedArr.length === 0 || sortedArr[end] < target) return -1;
        while (start < end) {
            const mid = (start + end) >> 1;
            if (sortedArr[mid] >= target) {
                end = mid;
            } else {
                start = mid + 1;
            }
        }
        return start;
    }

    function isSubSeq(word: string): boolean {
        let minSearchInd = 0;
        for (let i = 0; i < word.length; i++) {
            const indexs = char2indexs.get(word[i])!;
            const supInd = findSubInd(indexs, 0, indexs.length - 1, minSearchInd);
            if (supInd === -1) return false;
            minSearchInd = indexs[supInd] + 1;
        }
        return true;
    }

    let result = 0;
    for (const word of words) result += isSubSeq(word) ? 1 : 0;
    return result;
}

function _numMatchingSubseq(s: string, words: string[]): number {}

//TODO