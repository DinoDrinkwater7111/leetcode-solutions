import assert from 'assert';

function twoSum(numbers: number[], target: number): number[] {
    let start = 0;
    let end = numbers.length - 1;
    while (start < end) {
        const substracted = target - numbers[start];
        while (numbers[end] > substracted) {
            end--;
        }
        if (numbers[end] === substracted) {
            return [start + 1, end + 1];
        } else {
            start++;
        }
    }
    throw new Error();
}

function _twoSum(numbers: number[], target: number): number[] {
    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            if (i === j) continue;
            if (numbers[i] + numbers[j] === target) {
                return [i + 1, j + 1];
            }
        }
    }
    throw new Error();
}

function test() {
    let numbers: number[] = [];
    let target: number = 0;
    try {
        for (let i = 2; i < 1000; i++) {
            numbers = Array.from(
                new Set(
                    Array(i)
                        .fill(undefined)
                        .map(() => Math.floor(Math.random() * 1000) - 1000)
                )
            ).sort((a, b) => a - b);
            const i1 = Math.floor(Math.random() * numbers.length);
            let i2 = Math.floor(Math.random() * numbers.length);
            while (i2 === i1) i2 = Math.floor(Math.random() * i);
            target = numbers[i1] + numbers[i2];
            assert.deepStrictEqual(twoSum(numbers, target), _twoSum(numbers, target));
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(numbers);
            console.log(target);
            console.log(e.message);
        } else {
            console.log(numbers);
            console.log(target);
            console.error(e);
        }
    }
}
test();
