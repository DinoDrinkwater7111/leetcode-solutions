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