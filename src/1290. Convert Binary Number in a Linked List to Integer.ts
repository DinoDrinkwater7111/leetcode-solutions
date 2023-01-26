import assert from 'assert';

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function getDecimalValue(head: ListNode | null): number {
    let curr = head;
    let result = 0;
    while (curr !== null) {
        result = (result << 1) | curr.val;
        curr = curr.next;
    }

    return result;
}

//TODO
