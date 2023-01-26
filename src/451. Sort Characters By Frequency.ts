import assert from 'assert';

function frequencySort(s: string): string {
    const charCode2Freq: number[] = [];
    for (let i = 0; i < s.length; i++) {
        const charCode = s.charCodeAt(i);
        charCode2Freq[charCode] = (charCode2Freq[charCode] ?? 0) + 1;
    }
    const sortedCharCodes = Object.keys(charCode2Freq)
        .map((c) => Number(c))
        .sort((a, b) => charCode2Freq[b] - charCode2Freq[a]);
    const resultArr: string[] = [];
    for (const charCode of sortedCharCodes) {
        resultArr.push(String.fromCharCode(charCode).repeat(charCode2Freq[charCode]));
    }
    return resultArr.join('');
}

function _frequencySort(s: string): string {

}

//TODO
