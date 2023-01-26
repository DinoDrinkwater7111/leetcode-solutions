import * as assert from 'assert';

function trap(height: number[]): number {
    let result = 0;
    let leftMax = height[0];
    for (let i = 1; i < height.length - 1; i++) {
        leftMax = Math.max(leftMax, height[i]);
        result += leftMax;
    }
    leftMax = Math.max(leftMax, height[height.length - 1]);
    let rightMax = height[height.length - 1];
    for (let i = height.length - 2; i >= 0; i--) {
        if (rightMax === leftMax) break;
        rightMax = Math.max(rightMax, height[i]);
        result -= leftMax - rightMax;
    }
    for (let i = 1; i < height.length - 1; i++) {
        result -= height[i];
    }

    return result;
}

function _trap(height: number[]): number {
    const cache: number[] = [];
    for (let i = 0; i < height.length; i++) {
        cache[i] = Math.max(cache[i - 1] ?? 0, height[i], height[i + 1] ?? 0);
    }
    let leftMax = height[0];
    for (let i = 1; i < cache.length; i++) {
        cache[i] = Math.max(Math.min(leftMax, cache[i]), height[i]);
        leftMax = Math.max(leftMax, cache[i]);
    }
    let rightMax = height[height.length - 1];
    for (let i = height.length - 2; i >= 0; i--) {
        cache[i] = Math.max(Math.min(rightMax, cache[i]), height[i]);
        rightMax = Math.max(rightMax, cache[i]);
    }
    let result = 0;
    for (let i = 1; i < height.length - 1; i++) {
        result += cache[i] - height[i];
    }
    return result;
}

function test() {
    let height: number[] = [];
    try {
        for (let i = 1; i < 1000; i++) {
            height = Array(i)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * 1000));
            const result = trap(height);
            const _result = _trap(height);
            assert.equal(result, _result);
        }
    } catch (e) {
        console.log(height);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
