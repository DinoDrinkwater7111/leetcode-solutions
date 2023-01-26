import assert from 'assert';

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    if (k === 1) return head;

    function getGroupEndNode(node: ListNode | null): ListNode | null {
        for (let i = 0; i < k - 1; i++) {
            if (node === null) return null;
            node = node.next;
        }
        return node;
    }

    function reverse(_node: ListNode): void {
        let node = _node.next;
        for (let i = 0; i < k - 1; i++) {
            const node_ = node!.next;
            node!.next = _node;
            _node = node!;
            node = node_;
        }
    }

    let currGroupStratNode = head;
    const result = getGroupEndNode(currGroupStratNode);
    let nextGroupStartNode = result!.next;
    reverse(currGroupStratNode!);
    while (true) {
        const nextGroupEndNode = getGroupEndNode(nextGroupStartNode);
        if (nextGroupEndNode === null) {
            currGroupStratNode!.next = nextGroupStartNode;
            break;
        } else {
            currGroupStratNode!.next = nextGroupEndNode;
            currGroupStratNode = nextGroupStartNode;
            nextGroupStartNode = nextGroupEndNode.next;
            reverse(currGroupStratNode!);
        }
    }

    return result;
}


//TODO