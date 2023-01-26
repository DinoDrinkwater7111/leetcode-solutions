import assert from 'assert';

function longestCommonPrefix(strs: string[]): string {
    let resultCharArr: string[] = [];

    if (strs[0].length === 0) return '';

    let currentCharInd = 0;
    while (currentCharInd < strs[0].length) {
        const currentChar = strs[0].charAt(currentCharInd);
        for (let i = 1; i < strs.length; i++) {
            if (currentChar !== strs[i].charAt(currentCharInd)) {
                return resultCharArr.join('');
            }
        }
        resultCharArr.push(currentChar);
        currentCharInd++;
    }
    return resultCharArr.join('');
}
