import assert from 'assert';

function hIndex(citations: number[]): number {
    const citation2Count: number[] = Array(citations.length + 1).fill(0);
    for (const citation of citations) {
        citation2Count[Math.min(citation, citations.length)]++;
    }
    for (let i = citations.length; i >= 1; i--) {
        if (citation2Count[i] >= i) return i;
        else citation2Count[i - 1] += citation2Count[i];
    }
    return 0;
}

function _hIndex(citations: number[]): number {
    citations.sort((a, b) => b - a);
    let result = 0;
    for (let i = 0; i < citations.length; i++) result = Math.max(result, Math.min(i + 1, citations[i]));
    return result;
}

//TODO
