import assert from 'assert';

//KMP
function strStr(haystack: string, needle: string): number {
    if (needle.length === 0) return 0;
    if (needle.length > haystack.length) return -1;

    const table: number[] = [-1];
    {
        let cnd = 0;
        for (let pos = 1; pos < needle.length; pos++) {
            if (needle.charAt(pos) === needle.charAt(cnd)) {
                table[pos] = table[cnd];
            } else {
                table[pos] = cnd;
                while (cnd >= 0 && needle.charAt(pos) !== needle.charAt(cnd)) {
                    cnd = table[cnd];
                }
            }
            cnd++;
        }
    }

    let m = 0;
    let skip = 0;
    outerLoop: while (m < haystack.length - needle.length + 1) {
        for (let i = skip; i < needle.length; i++) {
            if (haystack.charAt(m + i) !== needle.charAt(i)) {
                m = m + i - table[i];
                skip = Math.max(0, table[i]);
                continue outerLoop;
            }
        }
        return m;
    }

    return -1;
}

function _strStr(haystack: string, needle: string): number {
    return haystack.indexOf(needle);
}

function test() {
    let haystack: string = '';
    let needle: string = '';
    const charPool = ['1', '2', '3'];
    try {
        for (let i = 1; i < 1000; i++) {
            haystack = Array(i)
                .fill(undefined)
                .map(() => charPool[Math.floor(Math.random() * charPool.length)])
                .join('');
            const ind1 = Math.floor(Math.random() * i);
            const ind2 = Math.floor(Math.random() * i);
            needle = haystack.substring(Math.min(ind1, ind2), Math.max(ind1, ind2));
            assert.equal(strStr(haystack, needle), _strStr(haystack, needle));
        }
        haystack = '1234567891234456489';
        needle = '123456780';
        assert.equal(strStr(haystack, needle), _strStr(haystack, needle));
        haystack = '123456780';
        needle = '1234567891234456489';
        assert.equal(strStr(haystack, needle), _strStr(haystack, needle));
        haystack = '123456780';
        needle = '';
        assert.equal(strStr(haystack, needle), _strStr(haystack, needle));
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(haystack);
            console.log(needle);
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
