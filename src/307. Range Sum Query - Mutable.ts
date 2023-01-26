import assert from 'assert';

class NumArray {
    private readonly nums: number[] = [];
    private readonly dp: number[][] = [];
    private readonly partitionSize: number;

    constructor(nums: number[]) {
        this.nums = nums;
        this.partitionSize = Math.floor(Math.sqrt(nums.length));
        let count = 0;
        let _dp: number[] = [];
        for (const num of nums) {
            _dp[_dp.length] = (_dp[_dp.length - 1] ?? 0) + num;
            count++;
            if (count === this.partitionSize) {
                count = 0;
                this.dp.push(_dp);
                _dp = [];
            }
        }
        if (_dp.length > 0) this.dp.push(_dp);
    }

    update(index: number, val: number): void {
        const partition = this.dp[Math.floor(index / this.partitionSize)];
        for (let i = index % this.partitionSize; i < partition.length; i++) {
            partition[i] += val - this.nums[index];
        }
        this.nums[index] = val;
    }

    sumRange(left: number, right: number): number {
        const partitionStart = Math.floor(left / this.partitionSize);
        const partitionEnd = Math.floor(right / this.partitionSize);
        let sum = 0;
        if (partitionStart < partitionEnd) {
            const _partition = this.dp[partitionStart];
            sum += _partition[_partition.length - 1] - (_partition[(left % this.partitionSize) - 1] ?? 0);
            for (let i = partitionStart + 1; i <= partitionEnd - 1; i++) sum += this.dp[i][this.partitionSize - 1];
            sum += this.dp[partitionEnd][right % this.partitionSize];
        } else {
            sum +=
                this.dp[partitionEnd][right % this.partitionSize] -
                (this.dp[partitionEnd][(left % this.partitionSize) - 1] ?? 0);
        }
        return sum;
    }
}

class _NumArray {
    private readonly nums: number[] = [];
    private readonly dp: number[] = [];

    constructor(nums: number[]) {
        this.nums = nums;
        this.dp[0] = this.nums[0];
        for (let i = 1; i <= nums.length; i++) this.dp[i] = this.dp[i - 1] + this.nums[i];
    }

    update(index: number, val: number): void {
        for (let i = index; i < this.dp.length; i++) {
            this.dp[i] += val - this.nums[index];
        }
        this.nums[index] = val;
    }

    sumRange(left: number, right: number): number {
        if (this.dp.length <= right) {
            for (let i = this.dp.length; i <= right; i++) {
                this.dp[i] = this.dp[i - 1] + this.nums[i];
            }
        }
        return this.dp[right] - this.dp[left - 1];
    }
}

//TODO
