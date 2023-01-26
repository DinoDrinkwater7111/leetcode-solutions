import assert from 'assert';

function topKFrequent(words: string[], k: number): string[] {
}

function _topKFrequent(words: string[], k: number): string[] {
    const word2count = new Map<string, number>();
    for (const word of words) word2count.set(word, (word2count.get(word) ?? 0) + 1);
    const sorted = Array.from(word2count.keys()).sort((a, b) => {
        const sign = word2count.get(b)! - word2count.get(a)!;
        if (sign === 0) return a > b ? 1 : -1;
        else return sign;
    });
    return sorted.slice(0, k);
}

//TODO