import assert from 'assert';

function longestPalindrome(s: string): number {
    const charCode2Count: number[] = [];
    for (let i = 0; i < s.length; i++) {
        const charCode = s.charCodeAt(i);
        charCode2Count[charCode] = (charCode2Count[charCode] ?? 0) + 1;
    }
    let result = 0;
    let hasOdd = false;
    for (const count of charCode2Count) {
        hasOdd ||= (count & 1) !== 0;
        result += (count >> 1) << 1;
    }
    return result + (hasOdd ? 1 : 0);
}

function _longestPalindrome(s: string): number {}

//TODO
