import assert from 'assert';

function longestPalindromeSubseq(s: string): number {
    let cache: number[] = [];
    cache[s.length - 1] = 1;
    for (let i = s.length - 2; i >= 0; i--) {
        const currentCache: number[] = [];
        currentCache[i] = 1;
        for (let j = i + 1; j < s.length; j++) {
            let max = 1;
            if (s[i] === s[j]) {
                max = (cache[j - 1] ?? 0) + 2;
            } else {
                max = Math.max(currentCache[j - 1], cache[j]);
            }
            currentCache.push(max);
        }
        cache = currentCache;
    }
    return cache[cache.length - 1];
}

function _longestPalindromeSubseq(s: string): number {
    const cache: number[][] = [];
    const result = longestPalindromeSubseqEx(0, s.length - 1);
    return result;
    function longestPalindromeSubseqEx(start: number, end: number): number {
        if (start > end) return 0;
        if (start == end) return 1;
        cache[start] ??= [];
        if (cache[start][end] != undefined) return cache[start][end];
        if (s.charAt(start) == s.charAt(end)) {
            cache[start][end] = 2 + longestPalindromeSubseqEx(start + 1, end - 1);
        } else {
            const option1 = longestPalindromeSubseqEx(start + 1, end);
            const option2 = longestPalindromeSubseqEx(start, end - 1);
            cache[start][end] = Math.max(option1, option2);
        }
        return cache[start][end];
    }
}

function __longestPalindromeSubseq(s: string): number {
    let result = 1;

    function longestPalindromeSubseqEx(start: number, end: number, count: number): void {
        if (start === end) {
            result = Math.max(result, count + 1);
            return;
        }
        if (start > end) {
            result = Math.max(result, count);
            return;
        }
        longestPalindromeSubseqEx(start + 1, end, count);
        for (let j = end; j > start; j--) {
            if (s[start] === s[j]) {
                longestPalindromeSubseqEx(start + 1, j - 1, count + 2);
            }
        }
    }

    for (let start = 0; start < s.length - 1; start++) {
        longestPalindromeSubseqEx(start, s.length - 1, 0);
    }
    return result;
}

function test() {
    let s: string = '';
    const charPool = ['a', 'b', 'c', 'd', 'e'];
    try {
        for (let i = 1; i < 10; i++) {
            s = Array(i)
                .fill(undefined)
                .map(() => charPool[Math.floor(Math.random() * charPool.length)])
                .join('');
            const result = longestPalindromeSubseq(s);
            const _result = _longestPalindromeSubseq(s);
            const __result = __longestPalindromeSubseq(s);
            assert.equal(result, _result);
            assert.equal(_result, __result);
        }
    } catch (e) {
        console.log(s);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
