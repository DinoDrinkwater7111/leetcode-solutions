import assert from 'assert';

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function deleteDuplicates(head: ListNode | null): ListNode | null {
    const virtualHead = new ListNode();
    virtualHead.next = head;
    let previousNode = virtualHead;
    let startNode = head;
    let endNode = head;
    while (startNode !== null) {
        while (endNode!.next !== null && endNode!.next.val === startNode.val) {
            endNode = endNode!.next;
        }
        if (startNode !== endNode) {
            previousNode.next = startNode = endNode = endNode!.next;
        } else {
            previousNode = startNode;
            startNode = endNode = endNode!.next;
        }
    }
    return previousNode.next;
}
