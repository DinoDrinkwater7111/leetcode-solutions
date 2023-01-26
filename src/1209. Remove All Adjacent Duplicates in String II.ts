import assert from 'assert';

function removeDuplicates(s: string, k: number): string {
    const charStack: string[] = [s[0]];
    const charCountStack: number[] = [1];
    for (let i = 1; i < s.length; i++) {
        charStack.push(s[i]);
        if (s[i] !== charStack[charStack.length - 2]) {
            charCountStack.push(1);
        } else {
            charCountStack[charCountStack.length - 1]++;
            if (charCountStack[charCountStack.length - 1] === k) {
                for (let n = 0; n < k; n++) {
                    charStack.pop();
                }
                charCountStack.pop();
            }
        }
    }
    return charStack.join('');
}

function _removeDuplicates(s: string, k: number): string {
    let candidateCharStartInd = 0;
    let candidateCharCount = 1;
    const candidateResultCharArr: string[] = [];
    for (let i = 1; i <= s.length; i++) {
        const candidateChar = s[candidateCharStartInd];
        const char = s[i];
        if (char !== candidateChar) {
            for (let j = candidateCharStartInd; j < i; j++) {
                candidateResultCharArr.push(s[j]);
            }
            candidateCharStartInd = i;
            candidateCharCount = 1;
        } else {
            candidateCharCount++;
            if (candidateCharCount === k) {
                i++;
                candidateCharStartInd = i;
                candidateCharCount = 1;
            }
        }
    }

    const candidateResult = candidateResultCharArr.join('');
    return candidateResultCharArr.length === s.length ? candidateResult : _removeDuplicates(candidateResult, k);
}

function test() {
    let s: string = '';
    let k: number = 0;
    const charPool = ['1', '2', '3', '4', '5', '6', '7', '8'];
    try {
        for (let i = 1; i < 10000; i++) {
            s = Array(i)
                .fill(undefined)
                .map(() => charPool[Math.floor(Math.random() * charPool.length)])
                .join('');
            k = Math.floor(Math.random() * s.length) + 2;
            assert.equal(removeDuplicates(s, k), _removeDuplicates(s, k));
        }
    } catch (e) {
        console.log(s);
        console.log(k);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
