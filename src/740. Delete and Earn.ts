import assert from 'assert';

function deleteAndEarn(nums: number[]): number {
    const value2Points = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
        value2Points.set(nums[i], (value2Points.get(nums[i]) ?? 0) + nums[i]);
    }

    const values = Array.from(value2Points.keys()).sort((a, b) => a - b);
    const points: number[] = [];
    for (let i = 0; i < values.length; i++) {
        const _value = values[i - 1] ?? -1;
        const value = values[i];
        if (_value + 1 < value) {
            points.push(0);
        }
        points.push(value2Points.get(value)!);
    }

    if (points.length === 1) return points[0];
    if (points.length === 2) return Math.max(points[0], points[1]);
    if (points.length === 3) return Math.max(points[0] + points[2], points[1]);
    for (let i = 3; i < points.length; i++) {
        points[i] += Math.max(points[i - 2], points[i - 3]);
    }

    return Math.max(points[points.length - 1], points[points.length - 2]);
}

function _deleteAndEarn(nums: number[]): number {
    function deleteAndEarnEx(value2Count: Map<number, number>, total: number): number {
        if (value2Count.size === 0) return total;
        if (value2Count.size === 1) {
            const value = value2Count.keys().next().value as number;
            return total + value2Count.get(value)! * value;
        }
        let max = 0;
        for (const val of value2Count.keys()) {
            const _value2Count = new Map(value2Count);
            _value2Count.delete(val - 1);
            _value2Count.delete(val);
            _value2Count.delete(val + 1);
            max = Math.max(max, deleteAndEarnEx(_value2Count, total + val * value2Count.get(val)!));
        }
        return max;
    }

    const value2Count = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
        value2Count.set(nums[i], (value2Count.get(nums[i]) ?? 0) + 1);
    }
    return deleteAndEarnEx(value2Count, 0);
}

function test() {
    let nums: number[] = [];
    try {
        for (let k = 0; k < 1000; k++) {
            for (let i = 1; i <= 10; i++) {
                nums = Array(i)
                    .fill(undefined)
                    .map(() => Math.floor(Math.random() * 10));
                assert.strictEqual(deleteAndEarn(nums.slice()), _deleteAndEarn(nums.slice()));
            }
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(nums);
            console.log(e.message);
        } else {
            console.log(nums);
            console.error(e);
        }
    }
}
test();
