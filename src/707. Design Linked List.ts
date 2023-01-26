import assert from 'assert';

class MyLinkedList {
    private readonly arr: number[] = [];

    constructor() {}

    get(index: number): number {
        return this.arr[index] ?? -1;
    }

    addAtHead(val: number): void {
        this.arr.unshift(val);
    }

    addAtTail(val: number): void {
        this.arr.push(val);
    }

    addAtIndex(index: number, val: number): void {
        if (index <= this.arr.length) this.arr.splice(index, 0, val);
    }

    deleteAtIndex(index: number): void {
        this.arr.splice(index, 1);
    }
}

//TODO
