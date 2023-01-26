import assert from 'assert';

class MyQueue {
    //FILO
    private readonly stack1: number[] = [];
    //reverse of stack1
    private readonly stack2: number[] = [];

    constructor() {}

    push(x: number): void {
        if (this.empty()) {
            this.stack2.push(x);
        } else {
            this.stack1.push(x);
        }
    }

    pop(): number {
        if (this.stack2.length === 0) {
            while (this.stack1.length > 0) {
                this.stack2.push(this.stack1.pop()!);
            }
        }
        return this.stack2.pop()!;
    }

    peek(): number {
        if (this.stack2.length === 0) {
            while (this.stack1.length > 0) {
                this.stack2.push(this.stack1.pop()!);
            }
        }
        return this.stack2[this.stack2.length - 1];
    }

    empty(): boolean {
        return this.stack1.length === 0 && this.stack2.length === 0;
    }
}
