import assert from 'assert';

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function removeElements(head: ListNode | null, val: number): ListNode | null {
    let result = head;
    while (result !== null && result.val === val) {
        result = result.next;
    }
    let currentNode = result;
    while (currentNode !== null) {
        if (currentNode.next !== null) {
            if (currentNode.next.val === val) {
                currentNode.next = currentNode.next.next;
            } else {
                currentNode = currentNode.next;
            }
        } else break;
    }

    return result;
}

function list2Arr(listNode: ListNode | null): number[] {
    const result: number[] = [];
    let currentNode = listNode;
    while (currentNode !== null) {
        result.push(currentNode.val);
        currentNode = currentNode.next;
    }
    return result;
}

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

function _removeElements(head: ListNode | null, val: number): ListNode | null {}

//TODO
function test() {
    let nums1: number[] = [];
    let nums2: number[] = [];
    try {
        for (let i = 2; i < 1000; i++) {
            nums1 = Array(i)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * 100))
                .sort((a, b) => a - b);
            nums2 = Array(i)
                .fill(undefined)
                .map(() => Math.floor(Math.random() * 100))
                .sort((a, b) => a - b);
            assert.deepStrictEqual(
                mergeTwoLists(arr2list(nums1), arr2list(nums2)),
                _mergeTwoLists(arr2list(nums1), arr2list(nums2))
            );
        }
    } catch (e) {
        console.log(nums1);
        console.log(nums2);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
