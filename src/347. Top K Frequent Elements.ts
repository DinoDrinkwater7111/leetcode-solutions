import assert from 'assert';

function topKFrequent(nums: number[], k: number): number[] {
    const num2Count: number[] = [];
    for (const num of nums) num2Count[num] = (num2Count[num] ?? 0) + 1;
    return Object.keys(num2Count)
        .sort((a, b) => num2Count[b as never] - num2Count[a as never])
        .slice(0, k)
        .map((str) => Number(str));
}

function _topKFrequent(nums: number[], k: number): number[] {

}


//TODO