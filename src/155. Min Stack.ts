import assert from 'assert';

class MinStack {
    private readonly minDesc: number[] = [];
    private readonly stack: number[] = [];

    constructor() {}

    push(val: number): void {
        this.stack.push(val);
        if (!(this.minDesc[this.minDesc.length - 1] < val)) this.minDesc.push(val);
    }

    pop(): void {
        const val = this.stack.pop()!;
        if (this.minDesc[this.minDesc.length - 1] === val) this.minDesc.pop();
    }

    top(): number {
        return this.stack[this.stack.length - 1];
    }

    getMin(): number {
        return this.minDesc[this.minDesc.length - 1];
    }
}

class _MinStack {
    private readonly sortedArr: number[] = [];
    private readonly stack: number[] = [];

    constructor() {}

    private findSupInd(target: number): number {
        if (!(target <= this.sortedArr[this.sortedArr.length - 1])) return this.sortedArr.length;

        let start = 0;
        let end = this.sortedArr.length - 1;
        while (start < end) {
            const mid = (start + end) >> 1;
            if (this.sortedArr[mid] < target) {
                start = mid + 1;
            } else {
                end = mid;
            }
        }
        return start;
    }

    push(val: number): void {
        this.stack.push(val);
        this.sortedArr.splice(this.findSupInd(val), 0, val);
    }

    pop(): void {
        const val = this.stack.pop()!;
        this.sortedArr.splice(this.findSupInd(val), 1);
    }

    top(): number {
        return this.stack[this.stack.length - 1];
    }

    getMin(): number {
        return this.sortedArr[0];
    }
}
