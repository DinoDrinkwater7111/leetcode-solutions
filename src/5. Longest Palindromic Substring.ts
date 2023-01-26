import assert from 'assert';

export {};

function longestPalindrome(s: string): string {
    const charArr = Array.from(s);
    let candidateStart = 0;
    let candidateEnd = 0;

    function findPalindromeFromCenter(centerIndex: number, isEven: boolean): void {
        const evenOffset = isEven ? 1 : 0;
        let i = 1;
        while ((charArr[centerIndex - i] ?? 'LO') === (charArr[centerIndex + i + evenOffset] ?? 'HI')) {
            i++;
        }
        if ((i - 1) * 2 + 1 + evenOffset > candidateEnd - candidateStart + 1) {
            candidateStart = centerIndex - (i - 1);
            candidateEnd = centerIndex + (i - 1) + evenOffset;
        }
    }

    for (let i = 0; i < charArr.length - 1; i++) {
        if (charArr[i - 1] === charArr[i + 1]) {
            findPalindromeFromCenter(i, false);
        }
        if (charArr[i] === charArr[i + 1]) {
            findPalindromeFromCenter(i, true);
        }
    }

    return charArr.slice(candidateStart, candidateEnd + 1).join('');
}

function _longestPalindrome(s: string): string {
    const charArr = Array.from(s);
    let candidate: string = charArr[0];

    function checkPalindrome(s: string): boolean {
        if (s.length % 2 === 0) {
            for (let i = 0; i < s.length / 2; i++) {
                if (s.charAt(i) !== s.charAt(s.length - 1 - i)) return false;
            }
        } else {
            for (let i = 0; i < s.length - 1 / 2; i++) {
                if (s.charAt(i) !== s.charAt(s.length - 1 - i)) return false;
            }
        }
        return true;
    }

    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length; j++) {
            const str = s.substring(i, j + 1);
            if (str.length > candidate.length && checkPalindrome(str)) {
                candidate = str;
            }
        }
    }

    return candidate;
}

function test() {
    let s: string = '';
    const charPool = ['1', '2', '3', '4', '5'];
    try {
        for (let i = 1; i < 1000; i++) {
            s = Array(i)
                .fill(undefined)
                .map(() => charPool[Math.floor(Math.random() * 3)])
                .join('');
            assert.equal(longestPalindrome(s), _longestPalindrome(s));
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(s);
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
