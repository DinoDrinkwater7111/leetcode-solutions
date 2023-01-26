import assert from 'assert';

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function middleNode(head: ListNode | null): ListNode | null {
    let fast = head;
    let slow = head;
    while (fast !== null && fast.next !== null) {
        slow = slow!.next;
        fast = fast.next.next;
    }
    return slow;
}

function _middleNode(head: ListNode | null): ListNode | null {
    const nodeArr: ListNode[] = [];
    let currentNode = head;
    while (currentNode !== null) {
        nodeArr.push(currentNode);
        currentNode = currentNode.next;
    }
    return nodeArr[Math.floor(nodeArr.length / 2)];
}

function arr2LinkedList(arr: readonly number[]): ListNode {
    const linkedList: ListNode = new ListNode(arr[0]!);
    let currentNode = linkedList;
    for (let i = 1; i < arr.length; i++) {
        currentNode.next = new ListNode(arr[i]!);
        currentNode = currentNode.next;
    }
    return linkedList;
}

function test() {
    let nums: number[] = [];
    try {
        for (let n = 1; n < 1000; n++) {
            for (let i = 1; i <= 100; i++) {
                nums = Array(i)
                    .fill(undefined)
                    .map(() => Math.floor(Math.random() * 100));
                const head = arr2LinkedList(nums);
                assert.strictEqual(middleNode(head), _middleNode(head));
            }
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(nums);
            console.log(e.message);
        } else {
            console.log(nums);
            console.error(e);
        }
    }
}
test();
