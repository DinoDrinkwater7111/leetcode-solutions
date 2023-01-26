import assert from 'assert';

function lengthOfLongestSubstring(s: string): number {
    let candidate = 0;
    const charArr = Array.from(s);
    let char2Index = new Map<string, number>();
    let start = 0;
    for (let i = 0; i < charArr.length; i++) {
        const char = charArr[i];
        if (char2Index.has(char)) {
            candidate = Math.max(char2Index.size, candidate);
            const newStart = char2Index.get(char)! + 1;
            for (let j = start; j < newStart; j++) {
                char2Index.delete(charArr[j]);
            }
            start = newStart;
        }
        char2Index.set(char, i);
    }
    candidate = Math.max(char2Index.size, candidate);

    return candidate;
}

function _lengthOfLongestSubstring(s: string): number {
    let result = 0;
    for (let start = 0; start < s.length; start++) {
        for (let end = 0; end < s.length; end++) {
            const subStr = s.substring(start, end + 1);
            const charSet = new Set(Array.from(subStr));
            if (charSet.size === subStr.length) {
                result = Math.max(result, charSet.size);
            }
        }
    }

    return result;
}

function test() {
    let s: string = '';
    const charPool = ['0', '1', '2'];
    try {
        for (let i = 1; i < 100; i++) {
            s = Array(i)
                .fill(undefined)
                .map(() => charPool[Math.floor(Math.random() * charPool.length)])
                .join();
            assert.strictEqual(lengthOfLongestSubstring(s), _lengthOfLongestSubstring(s));
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
