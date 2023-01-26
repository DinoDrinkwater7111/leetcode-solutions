import assert from 'assert';

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    if (list1 === null) return list2;
    if (list2 === null) return list1;
    const _result = new ListNode();
    let currentNode = _result;
    while (list1 !== null || list2 !== null) {
        const nums1 = list1?.val ?? Number.MAX_VALUE;
        const nums2 = list2?.val ?? Number.MAX_VALUE;
        if (nums1 <= nums2) {
            currentNode.next = new ListNode(nums1);
            list1 = list1?.next ?? null;
        } else {
            currentNode.next = new ListNode(nums2);
            list2 = list2?.next ?? null;
        }
        currentNode = currentNode.next;
    }
    return _result.next;
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

function _mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    return arr2list([...list2Arr(list1), ...list2Arr(list2)].sort((a, b) => a - b));
}

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
