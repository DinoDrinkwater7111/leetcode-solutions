import assert from 'assert';

type LinkedListNode = {
    val: number;
    next?: LinkedListNode;
};
class MyLinkedList {
    private readonly vHead: LinkedListNode = { val: Number.NaN };

    constructor() {}

    get(index: number): number {
        let curr = this.vHead;
        for (let i = 0; i <= index; i++) {
            if (curr.next === undefined) return -1;
            curr = curr.next;
        }
        return curr.val;
    }

    addAtHead(val: number): void {
        const _head = this.vHead.next;
        this.vHead.next = { val: val, next: _head };
    }

    addAtTail(val: number): void {
        let curr = this.vHead;
        while (curr.next !== undefined) {
            curr = curr.next;
        }
        curr.next = { val: val };
    }

    addAtIndex(index: number, val: number): void {
        let curr = this.vHead;
        for (let i = 0; i < index; i++) {
            if (curr.next === undefined) return;
            curr = curr.next;
        }
        const next_ = curr.next;
        curr.next = { val: val, next: next_ };
    }

    deleteAtIndex(index: number): void {
        let curr = this.vHead;
        for (let i = 0; i < index; i++) {
            if (curr.next === undefined) return;
            curr = curr.next;
        }
        curr.next = curr.next?.next;
    }
}

class _MyLinkedList {
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
