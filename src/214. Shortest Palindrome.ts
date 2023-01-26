import assert from 'assert';

function shortestPalindrome(s: string): string {
    {
        const reversedCharArr = Array.from(s).reverse();

        //KMP
        function findIndex(): number {
            const table: number[] = [-1];
            {
                let cnd = 0;
                for (let pos = 1; pos < s.length; pos++) {
                    if (s.charAt(pos) === s.charAt(cnd)) {
                        table[pos] = table[cnd];
                    } else {
                        table[pos] = cnd;
                        while (cnd >= 0 && s.charAt(pos) !== s.charAt(cnd)) {
                            cnd = table[cnd];
                        }
                    }
                    cnd++;
                }
            }

            let m = 0;
            let skip = 0;
            outerLoop: while (m < reversedCharArr.length) {
                for (let i = skip; i < s.length; i++) {
                    if (reversedCharArr[m + i] === undefined) break;
                    if (reversedCharArr[m + i] !== s.charAt(i)) {
                        m = m + i - table[i];
                        skip = Math.max(0, table[i]);
                        continue outerLoop;
                    }
                }
                return m;
            }
            return -1;
        }

        const startIndex = findIndex();
        if (startIndex === -1) {
            return reversedCharArr.join('') + s.substring(1);
        } else {
            const prefix: string[] = [];
            for (let i = 0; i < startIndex; i++) {
                prefix.push(reversedCharArr[i]);
            }
            return prefix.join('') + s;
        }
    }
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
    let s: string = '';
    const charPool = ['1', '2', '3', '4'];
    try {
        for (let i = 1; i < 1000; i++) {
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
