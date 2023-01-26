import assert from 'assert';

function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let end1 = m - 1;
    let end2 = n - 1;
    let end = m + n - 1;
    while (true) {
        if (end2 === -1) return;
        if (end1 === -1) {
            for (; end2 >= 0; end2--) {
                nums1[end] = nums2[end2];
                end--;
            }
            return;
        }

        if (nums1[end1] >= nums2[end2]) {
            nums1[end] = nums1[end1];
            end1--;
        } else {
            nums1[end] = nums2[end2];
            end2--;
        }
        end--;
    }
}

function _merge(nums1: number[], m: number, nums2: number[], n: number): void {
    for (let i = 0; i < nums2.length; i++) {
        nums1[m + i] = nums2[i];
    }
    nums1.sort((a, b) => a - b);
}

function test() {
    let nums1: number[] = [];
    let m: number = 0;
    let nums2: number[] = [];
    let n: number = 0;
    try {
        //TODO
    } catch (e) {
        console.log(nums1);
        console.log(m);
        console.log(nums2);
        console.log(n);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
