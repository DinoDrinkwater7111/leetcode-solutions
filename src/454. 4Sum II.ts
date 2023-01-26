import assert from 'assert';

function fourSumCount(nums1: number[], nums2: number[], nums3: number[], nums4: number[]): number {
    let result: number = 0;
    /** nums3[k]+nums4[l] */
    const num2Count = new Map<number, number>();
    for (let k = 0; k < nums3.length; k++) {
        for (let l = 0; l < nums4.length; l++) {
            const sum = nums3[k] + nums4[l];
            num2Count.set(sum, (num2Count.get(sum) ?? 0) + 1);
        }
    }
    for (let i = 0; i < nums1.length; i++) {
        for (let j = 0; j < nums2.length; j++) {
            const sum = nums1[i] + nums2[j];
            result += num2Count.get(-sum) ?? 0;
        }
    }

    return result;
}

function _fourSumCount(nums1: number[], nums2: number[], nums3: number[], nums4: number[]): number {
    let result: number = 0;
    for (let i = 0; i < nums1.length; i++) {
        for (let j = 0; j < nums2.length; j++) {
            for (let k = 0; k < nums3.length; k++) {
                for (let l = 0; l < nums4.length; l++) {
                    if (nums1[i] + nums2[j] + nums3[k] + nums4[l] === 0) {
                        result++;
                    }
                }
            }
        }
    }

    return result;
}

function test() {
    let nums1: number[] = [];
    let nums2: number[] = [];
    let nums3: number[] = [];
    let nums4: number[] = [];
    try {
        for (let n = 0; n < 10; n++) {
            for (let i = 0; i < 20; i++) {
                nums1 = Array(i)
                    .fill(undefined)
                    .map(() => Math.floor(Math.random() * 100 - 50));
                nums2 = Array(i)
                    .fill(undefined)
                    .map(() => Math.floor(Math.random() * 100 - 50));
                nums3 = Array(i)
                    .fill(undefined)
                    .map(() => Math.floor(Math.random() * 100 - 50));
                nums4 = Array(i)
                    .fill(undefined)
                    .map(() => Math.floor(Math.random() * 100 - 50));
                assert.strictEqual(
                    fourSumCount(nums1.slice(), nums2.slice(), nums3.slice(), nums4.slice()),
                    _fourSumCount(nums1.slice(), nums2.slice(), nums3.slice(), nums4.slice())
                );
            }
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(nums1);
            console.log(nums2);
            console.log(nums3);
            console.log(nums4);
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
