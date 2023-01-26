import assert from 'assert';

class MyHashSet {
    private readonly arr: number[] = [];

    constructor() {}

    add(key: number): void {
        if (!this.contains(key)) {
            this.arr.push(key);
        }
    }

    remove(key: number): void {
        const ind = this.arr.indexOf(key);
        if (ind !== -1) {
            [this.arr[ind], this.arr[this.arr.length - 1]] = [this.arr[this.arr.length - 1], this.arr[ind]];
            this.arr.pop();
        }
    }

    contains(key: number): boolean {
        return this.arr.includes(key);
    }
}
