import assert from 'assert';

function minDistance_(word1: string, word2: string): number {
    if (word1.length === 0) return word2.length;
    if (word2.length === 0) return word1.length;
    let dp: number[] = [word2[0] === word1[0] ? 0 : 1];
    for (let end1 = 1; end1 < word1.length; end1++) {
        if (word2[0] === word1[end1]) {
            dp[end1] = end1;
        } else {
            dp[end1] = dp[end1 - 1] + 1;
        }
    }

    for (let end2 = 1; end2 < word2.length; end2++) {
        const dp_: number[] = [];
        if (word2[end2] === word1[0]) {
            dp_[0] = end2;
        } else {
            dp_[0] = dp[0] + 1;
        }
        for (let end1 = 1; end1 < word1.length; end1++) {
            if (word1[end1] === word2[end2]) {
                dp_[end1] = dp[end1 - 1];
            } else {
                dp_[end1] = Math.min(dp_[end1 - 1], dp[end1 - 1], dp[end1]) + 1;
            }
        }
        dp = dp_;
    }

    return dp[word1.length - 1];
}

function minDistance(word1: string, word2: string): number {
    // i -> word2.substring(0,i+1), j -> word1.substring(0,j+1) , dp[i][j]=minimal step
    if (word1.length === 0) return word2.length;
    if (word2.length === 0) return word1.length;
    const dp: number[][] = [[word2[0] === word1[0] ? 0 : 1]];
    for (let end2 = 1; end2 < word2.length; end2++) {
        dp[end2] = [];
        if (word2[end2] === word1[0]) {
            dp[end2][0] = end2;
        } else {
            dp[end2][0] = dp[end2 - 1][0] + 1;
        }
    }
    for (let end1 = 1; end1 < word1.length; end1++) {
        if (word2[0] === word1[end1]) {
            dp[0][end1] = end1;
        } else {
            dp[0][end1] = dp[0][end1 - 1] + 1;
        }
    }

    for (let end2 = 1; end2 < word2.length; end2++) {
        for (let end1 = 1; end1 < word1.length; end1++) {
            if (word1[end1] === word2[end2]) {
                dp[end2][end1] = dp[end2 - 1][end1 - 1];
            } else {
                dp[end2][end1] = Math.min(dp[end2][end1 - 1], dp[end2 - 1][end1 - 1], dp[end2 - 1][end1]) + 1;
            }
        }
    }

    return dp[word2.length - 1][word1.length - 1];
}

function _minDistance(word1: string, word2: string): number {
    //newWord1, count
    let dp = new Map<string, number>([[word1, 0]]);
    let result = Number.POSITIVE_INFINITY;
    let current2 = 0;
    while (dp.size > 0) {
        const _dp = new Map<string, number>();
        for (const [w1, count] of dp) {
            if (count >= result) continue;
            if (w1.length === 0) {
                //1 ended but 2 not ended, insert only
                if (current2 < word2.length) {
                    result = Math.min(result, count + word2.length - current2);
                }
                //both ended
                else {
                    result = Math.min(result, count);
                }
                continue;
            }
            //2 ended but 1 not ended, remove only
            if (current2 >= word2.length) {
                result = Math.min(result, count + w1.length);
                continue;
            }
            //same char
            if (w1[0] === word2[current2]) {
                const _w1 = w1.substring(1);
                _dp.set(_w1, Math.min(_dp.get(_w1) ?? Number.POSITIVE_INFINITY, count));
                continue;
            }
            //replace
            {
                const _w1 = w1.substring(1);
                _dp.set(_w1, Math.min(_dp.get(_w1) ?? Number.POSITIVE_INFINITY, count + 1));
            }
            //remove
            {
                let n = 0;
                while (w1[n] !== word2[current2] && n < w1.length) {
                    n++;
                }
                //need insert
                const _w1 = w1.substring(n + 1);
                if (n === w1.length) {
                    _dp.set(_w1, Math.min(_dp.get(_w1) ?? Number.POSITIVE_INFINITY, n + count + 1));
                } else {
                    _dp.set(_w1, Math.min(_dp.get(_w1) ?? Number.POSITIVE_INFINITY, n + count));
                }
            }
            //insert
            {
                _dp.set(w1, Math.min(_dp.get(w1) ?? Number.POSITIVE_INFINITY, count + 1));
            }
        }
        dp = _dp;
        current2++;
    }
    return result;
}

function test() {
    let word1: string = '';
    let word2: string = '';
    const charPool = Array(26)
        .fill(97)
        .map((v, i) => String.fromCodePoint(v + i));
    try {
        for (let i = 0; i < 1000; i++) {
            word1 = Array(i)
                .fill(undefined)
                .map(() => charPool[Math.floor(Math.random() * charPool.length)])
                .join('');
            word2 = Array(Math.floor(Math.random() * 2 * 5))
                .fill(undefined)
                .map(() => charPool[Math.floor(Math.random() * charPool.length)])
                .join('');
            const result_ = minDistance_(word1, word2);
            const result = minDistance(word1, word2);
            const _result = _minDistance(word1, word2);
            assert.deepStrictEqual(_result, result);
            assert.deepStrictEqual(result, result_);
        }
    } catch (e) {
        console.log(word1);
        console.log(word2);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
