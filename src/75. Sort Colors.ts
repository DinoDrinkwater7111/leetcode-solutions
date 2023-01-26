import assert from 'assert';

function sortColors(nums: number[]): void {
    let start = 0;
    let end = nums.length - 1;

    function swap(i: number, j: number) {
        const temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    let i = 0;
    while (i <= end) {
        switch (nums[i]) {
            case 0:
                swap(start++, i++);
                break;
            case 1:
                i++;
                break;
            case 2:
                swap(i, end--);
                break;
        }
    }
}

function _sortColors(nums: number[]): void {
    let start = 0;
    let end = nums.length - 1;

    let i = 0;
    while (i <= end) {
        switch (nums[i]) {
            case 0:
                if (i > start) {
                    [nums[i], nums[start]] = [nums[start], nums[i]];
                    start++;
                } else {
                    i++;
                }
                break;
            case 1:
                i++;
                break;
            case 2:
                [nums[i], nums[end]] = [nums[end], nums[i]];
                end--;
                break;
        }
    }
}

//TODO
