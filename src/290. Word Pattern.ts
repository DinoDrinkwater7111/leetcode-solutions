import assert from 'assert';

function wordPattern(pattern: string, s: string): boolean {
    const words = s.split(' ');
    if (pattern.length !== words.length) return false;
    const charCode2word: string[] = [];
    const wordSet = new Set<string>();
    for (let i = 0; i < pattern.length; i++) {
        const charCode = pattern.charCodeAt(i);
        if (charCode2word[charCode] === undefined) {
            if (wordSet.has(words[i])) {
                return false;
            } else {
                charCode2word[charCode] = words[i];
                wordSet.add(words[i]);
            }
        } else {
            if (charCode2word[charCode] !== words[i]) return false;
        }
    }

    return true;
}

function _wordPattern(pattern: string, s: string): boolean {}

//TODO
