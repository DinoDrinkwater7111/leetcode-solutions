import assert from 'assert';

function wordBreak(s: string, wordDict: string[]): boolean {
    const words = new Set(wordDict);
    const cache: boolean[] = [true];
    function wordBreakEx(n: number): boolean {
        for (let len = 0; len < n; len++) {
            if (cache[len] && words.has(s.substring(len, n))) {
                return true;
            }
        }
        return false;
    }
    for (let n = 1; n <= s.length; n++) {
        cache[n] = wordBreakEx(n);
    }

    return cache[s.length];
}

function _wordBreak(s: string, wordDict: string[]): boolean {
    const str2canbreak = new Map<string, boolean>();
    function wordBreakEx(s: string): boolean {
        const cache = str2canbreak.get(s);
        if (cache !== undefined) return cache;
        if (s.length === 0) return true;
        for (const word of wordDict) {
            if (s.startsWith(word)) {
                if (wordBreakEx(s.substring(word.length))) {
                    str2canbreak.set(s, true);
                    return true;
                }
            }
        }
        str2canbreak.set(s, false);
        return false;
    }
    return wordBreakEx(s);
}

function __wordBreak(s: string, wordDict: string[]): boolean {
    if (s.length === 0) return true;
    for (const word of wordDict) {
        if (s.startsWith(word)) {
            if (__wordBreak(s.substring(word.length), wordDict)) {
                return true;
            }
        }
    }
    return false;
}

function ___wordBreak(s: string, wordDict: string[]): boolean {
    const words = new Set(wordDict);
    let partial = '';
    const candidateStack: [string, number][] = [];
    for (let i = 0; i < s.length; i++) {
        partial += s[i];
        if (words.has(partial)) {
            candidateStack.push([partial, i]);
            partial = '';
            continue;
        }
        if (i === s.length - 1) {
            if (candidateStack.length > 0) {
                const candidate = candidateStack.pop()!;
                partial = candidate[0];
                i = candidate[1];
            } else {
                return false;
            }
        }
    }
    return true;
}

function test() {
    let s: string = '';
    let wordDict: string[] = [];
    try {
        for (let n = 2; n < 3; n++) {
            s = Math.floor(Math.random() * 10 ** 20).toString();
            wordDict = Array.from(
                new Set(
                    Array(20)
                        .fill(undefined)
                        .map(() => Math.floor(Math.random() * 100).toString())
                )
            );

            assert.deepStrictEqual(wordBreak(s, wordDict), _wordBreak(s, wordDict));
            assert.deepStrictEqual(wordBreak(s, wordDict), __wordBreak(s, wordDict));
            assert.deepStrictEqual(wordBreak(s, wordDict), ___wordBreak(s, wordDict));
        }
    } catch (e) {
        console.log(s);
        console.log(wordDict);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
