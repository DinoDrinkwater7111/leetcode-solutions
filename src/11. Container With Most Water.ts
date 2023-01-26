import assert from 'assert';

function maxArea(height: number[]): number {
    let result = 0;
    let start = 0;
    let end = height.length - 1;

    while (start < end) {
        result = Math.max(result, Math.min(height[start], height[end]) * (end - start));
        if (height[start] < height[end]) {
            start++;
        } else {
            end--;
        }
    }
    return result;
}

function _maxArea(height: number[]): number {
    function areaOf(start: number, end: number) {
        return Math.min(height[start], height[end]) * (end - start);
    }

    let result = 0;
    for (let start = 0; start < height.length; start++) {
        for (let end = start + 1; end < height.length; end++) {
            result = Math.max(areaOf(start, end), result);
        }
    }
    return result;
}

function test() {
    let height: number[] = [];
    try {
        for (let i = 2; i <= 1000; i++) {
            height = Array(i)
                .fill(undefined)
                .map(() => Math.random() * 1000);
            assert.equal(maxArea(height), _maxArea(height));
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(height);
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
