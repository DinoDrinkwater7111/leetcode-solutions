import assert from 'assert';

function maxProduct_(words: string[]): number {
    words.sort((a, b) => b.length - a.length);
    const charExistanceNums: number[] = [];
    for (const word of words) {
        let charExistanceNum = 0;
        for (let i = 0; i < word.length; i++) charExistanceNum |= 1 << (word.charCodeAt(i) - 97);
        charExistanceNums.push(charExistanceNum);
    }
    let result = 0;
    let endUpperBound = words.length;
    loop_start: for (let start = 0; start < endUpperBound; start++) {
        loop_end: for (let end = start + 1; end < endUpperBound; end++) {
            const prod = words[start].length * words[end].length;
            if (prod <= result) continue loop_start;
            if ((charExistanceNums[start] & charExistanceNums[end]) !== 0) continue loop_end;
            result = prod;
            endUpperBound = end + 1;
            break;
        }
    }

    return result;
}

function maxProduct(words: string[]): number {
    words.sort((a, b) => b.length - a.length);
    const charSets: null[][] = [];
    for (const word of words) {
        const charSet: null[] = [];
        for (let i = 0; i < word.length; i++) charSet[word.charCodeAt(i)] = null;
        charSets.push(charSet);
    }
    let result = 0;
    loop_start: for (let start = 0; start < words.length; start++) {
        loop_end: for (let end = start + 1; end < words.length; end++) {
            const prod = words[start].length * words[end].length;
            if (prod <= result) continue loop_start;
            for (let i = 0; i < words[end].length; i++) {
                if (charSets[start][words[end].charCodeAt(i)] === null) continue loop_end;
            }
            result = prod;
            break;
        }
    }

    return result;
}

function _maxProduct(words: string[]): number {
    let result = 0;
    for (let i = 0; i < words.length; i++) {
        loop_j: for (let j = i + 1; j < words.length; j++) {
            const prod = words[i].length * words[j].length;
            if (prod <= result) continue;
            const chars_i: null[] = [];
            for (const char_i of words[i]) chars_i[char_i.charCodeAt(0)] = null;
            for (const char_j of words[j]) if (chars_i[char_j.charCodeAt(0)] === null) continue loop_j;
            result = Math.max(result, prod);
        }
    }
    return result;
}

function test() {
    let words: string[] = [];
    try {
        for (let i = 2; i < 100; i++) {
            words = Array(i)
                .fill(undefined)
                .map(() =>
                    Array(Math.floor(Math.random() * 100) + 1)
                        .fill(undefined)
                        .map(() => Math.floor(Math.random() * 9))
                        .join('')
                );
            const result_ = maxProduct_(words);
            const result = maxProduct(words);
            assert.deepStrictEqual(result_, result);
            const _result = _maxProduct(words);
            assert.deepStrictEqual(result, _result);
        }
    } catch (e) {
        console.log(words);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
