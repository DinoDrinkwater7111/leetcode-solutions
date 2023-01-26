import assert from 'assert';

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function swapPairs(head: ListNode | null): ListNode | null {
    if (head === null) return null;
    if (head.next === null) return head;
    let prev = head;
    let curr = prev.next!.next;
    prev.next!.next = head;
    head = prev.next;
    while (curr !== null && curr.next !== null) {
        prev.next = curr.next;
        prev = curr;
        curr = prev.next!.next;
        prev.next!.next = prev;
    }
    prev.next = curr;
    return head;
}

//TODO