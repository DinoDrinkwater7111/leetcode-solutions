import assert from 'assert';

class MyCircularQueue {
    private readonly queue: number[] = [];
    private readonly k: number;
    private head = 0;
    private length = 0;

    constructor(k: number) {
        this.k = k;
    }

    enQueue(value: number): boolean {
        if (this.isFull()) return false;
        this.queue[(this.head + this.length) % this.k] = value;
        this.length++;
        return true;
    }

    deQueue(): boolean {
        if (this.isEmpty()) return false;
        this.head = (this.head + 1) % this.k;
        this.length--;
        return true;
    }

    Front(): number {
        if (this.isEmpty()) return -1;
        return this.queue[this.head];
    }

    Rear(): number {
        if (this.isEmpty()) return -1;
        return this.queue[(this.head + this.length - 1) % this.k];
    }

    isEmpty(): boolean {
        return this.length === 0;
    }

    isFull(): boolean {
        return this.length === this.k;
    }
}
