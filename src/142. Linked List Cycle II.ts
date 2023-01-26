import assert from 'assert';

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function detectCycle(head: ListNode | null): ListNode | null {
    let slow = head;
    let fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow!.next;
        fast = fast.next.next;
        if (slow === fast) {
            slow = head; // let list = m + n, then fast is at (-m)%n
            while (slow !== fast) {
                slow = slow!.next;
                fast = fast!.next;
            }
        }
    }
    return null;
}

function _detectCycle(head: ListNode | null): ListNode | null {
    let curr = head;
    const mask = 1 << 17;
    let result: ListNode | null = null;
    while (curr !== null) {
        if (curr.val >= 0) {
            if ((curr.val & mask) !== 0) {
                result = curr;
                break;
            } else {
                curr.val = curr.val | mask;
            }
        } else {
            if ((~curr.val & mask) !== 0) {
                result = curr;
                break;
            } else {
                curr.val = ~(~curr.val | mask);
            }
        }
        curr = curr.next;
    }

    curr = head;
    while (curr !== null) {
        if (curr.val >= 0) {
            if ((curr.val & mask) === 0) break;
            else curr.val &= ~mask;
        } else {
            if ((~curr.val & mask) === 0) break;
            else curr.val = ~(~curr.val & ~mask);
        }

        curr = curr.next;
    }

    return result;
}

//TODO
