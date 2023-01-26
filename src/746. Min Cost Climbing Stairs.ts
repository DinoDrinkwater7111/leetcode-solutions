import assert from 'assert';

function minCostClimbingStairs(cost: number[]): number {
    for (let i = 2; i < cost.length; i++) {
        cost[i] += Math.min(cost[i - 1], cost[i - 2]);
    }
    return Math.min(cost[cost.length - 1], cost[cost.length - 2]);
}

function _minCostClimbingStairs(cost: number[]): number {
    const cache: number[] = [];
    function findMinCost(end: number): number {
        if (end < 0) return 0;
        if (cache[end] !== undefined) {
            return cache[end];
        }
        const result = Math.min(
            findMinCost(end - 1) + (cost[end - 1] ?? 0),
            findMinCost(end - 2) + (cost[end - 2] ?? 0)
        );
        cache[end] = result;
        return result;
    }

    return findMinCost(cost.length);
}

function test() {
    let cost: number[] = [];
    try {
        for (let i = 2; i <= 1000; i++) {
            cost = Array(i)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * 1000));
            assert.deepStrictEqual(minCostClimbingStairs(cost.slice()), _minCostClimbingStairs(cost.slice()));
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(cost);
            console.log(e.message);
        } else {
            console.log(cost);
            console.error(e);
        }
    }
}
test();
