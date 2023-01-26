import assert from 'assert';

function findAndReplacePattern(words: string[], pattern: string): string[] {
    function isMatch(word: string): boolean {
        const wordChar2patternCharCode: number[] = [];
        const patternCharCode2wordChar: number[] = [];
        for (let i = 0; i < word.length; i++) {
            const wordCharCode = word.charCodeAt(i);
            const patternCharCode = pattern.charCodeAt(i);
            wordChar2patternCharCode[wordCharCode] ??= patternCharCode;
            if (wordChar2patternCharCode[wordCharCode] !== patternCharCode) return false;
            patternCharCode2wordChar[patternCharCode] ??= wordCharCode;
            if (patternCharCode2wordChar[patternCharCode] !== wordCharCode) return false;
        }
        return true;
    }

    return words.filter((word) => isMatch(word));
}

function _findAndReplacePattern(words: string[], pattern: string): string[] {

}

//TODO
