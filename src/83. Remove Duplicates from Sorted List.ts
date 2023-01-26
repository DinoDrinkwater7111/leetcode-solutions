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
    let currentNode = head;
    while (currentNode !== null) {
        if (currentNode.next !== null && currentNode.next.val === currentNode.val) {
            currentNode.next = currentNode.next.next;
        } else {
            currentNode = currentNode.next;
        }
    }
    return head;
}

function _deleteDuplicates(head: ListNode | null): ListNode | null {}

function arr2list(nums: number[]): ListNode | null {
    if (nums.length === 0) return null;
    const resultPrev = new ListNode();
    let currentNode = resultPrev;
    for (const num of nums) {
        currentNode.next = new ListNode(num);
        currentNode = currentNode.next;
    }
    return resultPrev.next;
}

function _reverseList(head: ListNode | null): ListNode | null {
    return arr2list(list2Arr(head).reverse());
}

function test() {
    let nums1: number[] = [];
    try {
        for (let i = 2; i < 1000; i++) {
            nums1 = Array(i)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * 100))
                .sort((a, b) => a - b);
            assert.deepStrictEqual(reverseList(arr2list(nums1)), _reverseList(arr2list(nums1)));
        }
    } catch (e) {
        console.log(nums1);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
