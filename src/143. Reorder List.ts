import assert from 'assert';

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function reorderList(head: ListNode | null): void {}

function _reorderList(head: ListNode | null): void {
    const nodes: ListNode[] = [];
    while (head !== null) {
        nodes.push(head);
        head = head.next;
    }
    let curr = new ListNode();
    let i = 0;
    while (i < nodes.length) {
        curr.next = nodes[i];
        curr = curr.next;
        if (nodes[i] === nodes[nodes.length - 1]) {
            nodes.pop();
            i++;
        } else {
            nodes[i] = nodes[nodes.length - 1];
        }
    }
    curr.next = null;
}

//TODO
