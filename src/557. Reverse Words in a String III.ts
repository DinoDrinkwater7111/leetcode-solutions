import assert from 'assert';

function reverseWords(s: string): string {
    function reverse(arr: unknown[], start: number, end: number) {
        if (start >= end) return;
        for (let i = start; i <= Math.floor((start + end) / 2); i++) {
            const temp = arr[i];
            arr[i] = arr[end - i + start];
            arr[end - i + start] = temp;
        }
    }

    let charArr: string[] = Array.from(s);
    let currentWordInd = 0;
    while (currentWordInd < charArr.length) {
        while (charArr[currentWordInd] === ' ') {
            currentWordInd++;
        }
        let i = currentWordInd + 1;
        while (i < charArr.length && charArr[i] !== ' ') {
            i++;
        }
        reverse(charArr, currentWordInd, i - 1);
        currentWordInd = i + 1;
    }

    return charArr.join('');
}

function _reverseWords(s: string): string {
    return s
        .split(' ')
        .map((w) => Array.from(w).reverse().join(''))
        .join(' ');
}

function test() {
    let s: string = '';
    const pool = Array(10)
        .fill(undefined)
        .map((v, i) => i.toString());
    pool.push(' ');
    try {
        for (let i = 2; i < 1000; i++) {
            s = Array(i)
                .fill(undefined)
                .map(() => pool[Math.floor(Math.random() * pool.length)])
                .join('');
            assert.deepStrictEqual(reverseWords(s), _reverseWords(s));
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(s);
            console.log(e.message);
        } else {
            console.log(s);
            console.error(e);
        }
    }
}
test();
