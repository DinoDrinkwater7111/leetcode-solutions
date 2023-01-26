import assert from 'assert';

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function partition(head: ListNode | null, x: number): ListNode | null {
    const vHead1 = new ListNode(Number.NEGATIVE_INFINITY);
    const vHead2 = new ListNode(Number.POSITIVE_INFINITY);
    let node = head;
    let p1End = vHead1;
    let p2End = vHead2;
    while (node !== null) {
        if (node.val < x) {
            p1End.next = node;
            node = node.next;
            p1End = p1End.next;
        } else {
            p2End.next = node;
            node = node.next;
            p2End = p2End.next;
        }
    }

    p1End.next = vHead2.next;
    p2End.next = null;

    return vHead1.next ?? vHead2.next;
}
