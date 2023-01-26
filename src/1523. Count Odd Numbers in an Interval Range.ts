import assert from "assert";

function countOdds(low: number, high: number): number {
    const min = (low & 1) === 0 ? low + 1 : low;
    const max = (high & 1) === 0 ? high - 1 : high;
    return Math.max((max - min) / 2 + 1, 0);
}

//TODO
