import assert from 'assert';

function shortestPalindrome(s: string): string {
    let candidateAppendChars: string[] | undefined = undefined;

    function findPalindromeFromCenter(centerIndex: number, isEven: boolean): void {
        const evenOffset = isEven ? 1 : 0;
        const _candidateAppendChars: string[] = [];
        for (let i = 1; centerIndex + i - evenOffset < s.length; i++) {
            const rightChar = s.charAt(centerIndex + i - evenOffset);
            const leftChar = s.charAt(centerIndex - i);
            if (rightChar === leftChar) {
                continue;
            }
            if (leftChar === '') {
                _candidateAppendChars.push(rightChar);
                continue;
            }
            return;
        }
        if (candidateAppendChars === undefined || candidateAppendChars.length > _candidateAppendChars.length) {
            candidateAppendChars = _candidateAppendChars;
        }
    }

    const upperCenter = Math.floor(s.length / 2);
    if (s.length % 2 === 0) {
        findPalindromeFromCenter(Math.floor(s.length / 2), true);
    }else{
        findPalindromeFromCenter(upperCenter, true);
        findPalindromeFromCenter(upperCenter, false);
    }

    for (let i = upperCenter - 1; i > 0; i--) {
        findPalindromeFromCenter(i, true);
        findPalindromeFromCenter(i, false);
        if (candidateAppendChars !== undefined) break;
    }

    if (candidateAppendChars === undefined) {
        candidateAppendChars = [];
        for (let j = 1; j < s.length; j++) {
            candidateAppendChars.push(s.charAt(j));
        }
    }

    return candidateAppendChars!.reverse().join('') + s;
}

function _shortestPalindrome(s: string): string {
    const charArr = Array.from(s);
    let candidate: string = s + s;
    for (let i = 0; i < s.length; i++) {
        {
            const _candidate =
                charArr
                    .slice(i + 1)
                    .reverse()
                    .join('') + s.substring(i);
            if (_candidate.length < candidate.length && _candidate.endsWith(s)) candidate = _candidate;
        }
        {
            const _candidate = charArr.slice(i).reverse().join('') + s.substring(i);
            if (_candidate.length < candidate.length && _candidate.endsWith(s)) candidate = _candidate;
        }
    }

    return candidate;
}

function test() {
    shortestPalindrome("111");
    let s: string = '';
    const charPool = ['1', '2', '3'];
    try {
        for (let i = 1; i < 2000; i++) {
            s = Array(i)
                .fill(undefined)
                .map(() => charPool[Math.floor(Math.random() * charPool.length)])
                .join('');
            assert.equal(shortestPalindrome(s), _shortestPalindrome(s));
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
