import assert from 'assert';

function canJump(nums: number[]): boolean {
    const cache: boolean[] = [true];
    function canJumpEx(to: number): boolean {
        if (cache[to] !== undefined) return cache[to];
        for (let i = to - 1; i >= 0; i--) {
            if (i + nums[i] >= to) {
                let result = canJumpEx(i);
                cache[i] = canJumpEx(i);
                if (result === true) return true;
            }
        }
        return false;
    }

    return canJumpEx(nums.length - 1);
}

function _canJump(nums: number[]): boolean {
    function canJumpEx(current: number): boolean {
        if (current === nums.length - 1) return true;
        const maxStep = nums[current];
        for (let i = 1; i <= maxStep; i++) {
            if (canJumpEx(current + i)) {
                return true;
            }
        }
        return false;
    }

    return canJumpEx(0);
}

function test() {
    let nums: number[] = [];
    try {
        for(let n=0;n<100;n++){
            for (let i = 1; i <= 10; i++) {
                nums = Array(i)
                    .fill(undefined)
                    .map(() => Math.floor(Math.random() * 5));
                assert.deepStrictEqual(canJump(nums), _canJump(nums));
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
