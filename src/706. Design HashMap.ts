import assert from 'assert';

class MyHashMap {
    private readonly arr: [number, number][] = [];

    constructor() {}

    put(key: number, value: number): void {
        let i = 0;
        while (i < this.arr.length && this.arr[i][0] !== key) {
            i++;
        }
        this.arr[i] = [key, value];
    }

    remove(key: number): void {
        for (let i = 0; i < this.arr.length; i++) {
            if (this.arr[i][0] === key) {
                [this.arr[i], this.arr[this.arr.length - 1]] = [this.arr[this.arr.length - 1], this.arr[i]];
                this.arr.pop();
                break;
            }
        }
    }

    get(key: number): number {
        let i = 0;
        while (i < this.arr.length && this.arr[i][0] !== key) {
            i++;
        }
        return this.arr[i]?.[1] ?? -1;
    }
}
