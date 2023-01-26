import assert from 'assert';

function lastStoneWeight(stones: number[]): number {
    stones.sort((a, b) => a - b);
    function findSupInd(target: number): number {
        let start = 0;
        let end = stones.length;
        while (start < end) {
            const mid = (start + end) >> 1;
            if (target <= stones[mid]) end = mid;
            else start = mid + 1;
        }
        return start;
    }

    while (stones.length > 1) {
        const newStone = stones.pop()! - stones.pop()!;
        if (newStone !== 0) {
            const supInd = findSupInd(newStone);
            stones.splice(supInd, 0, newStone);
        }
    }
    return stones[0] ?? 0;
}

function _lastStoneWeight(stones: number[]): number {}

//TODO
