import assert from 'assert';

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    let nodeA = headA;
    let nodeB = headB;
    while (nodeA !== nodeB) {
        nodeA = nodeA === null ? headB : nodeA.next;
        nodeB = nodeB === null ? headA : nodeB.next;
    }
    return nodeA;
}

function _getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    function count(node: ListNode): number {
        let result = 1;
        while (node.next !== null) {
            node = node.next;
            result++;
        }
        return result;
    }

    const nA = count(headA!);
    const nB = count(headB!);
    let currA: ListNode | null = headA!;
    let currB: ListNode | null = headB!;
    if (nA > nB) {
        for (let i = 0; i < nA - nB; i++) currA = currA.next!;
    } else {
        for (let i = 0; i < nB - nA; i++) currB = currB.next!;
    }

    while (currA !== null) {
        if (currA === currB) return currA;
        currA = currA.next;
        currB = currB!.next;
    }
    return null;
}

//TODO
