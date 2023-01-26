import assert from 'assert';

function wordSubsets(words1: string[], words2: string[]): string[] {
    const charCode2count2_max: number[] = Array(26).fill(0);
    words2.forEach((word2) => {
        const charCode2Count: number[] = Array(26).fill(0);
        for (let i = 0; i < word2.length; i++) charCode2Count[word2.charCodeAt(i) - 97]++;
        charCode2Count.forEach(
            (count, charCode) => (charCode2count2_max[charCode] = Math.max(charCode2count2_max[charCode], count))
        );
    });

    return words1.filter((word1) => {
        const charCode2Count1: number[] = Array(26).fill(0);
        for (let i = 0; i < word1.length; i++) charCode2Count1[word1.charCodeAt(i) - 97]++;
        return charCode2count2_max.every((count, charCode) => count <= charCode2Count1[charCode]);
    });
}

function _wordSubsets(words1: string[], words2: string[]): string[] {
    const charCode2Counts1: number[][] = [];
    for (const word of words1) {
        const charCode2Count: number[] = [];
        for (let i = 0; i < word.length; i++)
            charCode2Count[word.charCodeAt(i)] = (charCode2Count[word.charCodeAt(i)] ?? 0) + 1;
        charCode2Counts1.push(charCode2Count);
    }

    const charCode2Counts2: number[][] = [];
    for (const word of words2) {
        const charCode2Count: number[] = [];
        for (let i = 0; i < word.length; i++)
            charCode2Count[word.charCodeAt(i)] = charCode2Count[word.charCodeAt(i)] =
                (charCode2Count[word.charCodeAt(i)] ?? 0) + 1;
        charCode2Counts2.push(charCode2Count);
    }

    const result: string[] = [];
    outer: for (let i = 0; i < words1.length; i++) {
        const charCode2Count1 = charCode2Counts1[i];
        for (const charCode2Count2 of charCode2Counts2) {
            const isSubSet = charCode2Count2.every((count2, charCode2) => count2 <= (charCode2Count1[charCode2] ?? 0));
            if (!isSubSet) continue outer;
        }
        result.push(words1[i]);
    }

    return result;
}
