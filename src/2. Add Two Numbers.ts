import assert from 'assert';

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
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

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const _result: ListNode = new ListNode(-1);
    let node_list1: ListNode | null = l1;
    let node_list2: ListNode | null = l2;
    let node__result = _result;
    while (node_list1 !== null || node_list2 !== null) {
        node__result.next = new ListNode((node_list1?.val ?? 0) + (node_list2?.val ?? 0));
        node_list1 = node_list1?.next ?? null;
        node_list2 = node_list2?.next ?? null;
        node__result = node__result.next;
    }

    const result = _result.next!;
    let node_result: ListNode | null = result;
    while (node_result !== null) {
        let nextOffset = 0;
        if (node_result.val >= 10) {
            node_result.val -= 10;
            nextOffset = 1;
        }
        if (node_result.next === null) {
            if (nextOffset > 0) {
                node_result.next = new ListNode(nextOffset);
            }
        } else {
            node_result.next.val += nextOffset;
        }
        node_result = node_result.next;
    }
    return result;
}

function _addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    if (l1 === null) return null;
    if (l2 === null) return null;

    let numStr1 = '';
    let node1: ListNode | null = l1;
    while (node1 !== null) {
        numStr1 = node1.val + numStr1;
        node1 = node1.next;
    }

    let numStr2 = '';
    let node2: ListNode | null = l2;
    while (node2 !== null) {
        numStr2 = node2.val + numStr2;
        node2 = node2.next;
    }

    const numStrResult = (BigInt(numStr1) + BigInt(numStr2)).toString();
    const result = new ListNode();
    let currentNode = result;
    for (let i = numStrResult.length - 1; i >= 0; i--) {
        currentNode.next = new ListNode(parseInt(numStrResult.charAt(i)));
        currentNode = currentNode.next;
    }

    return result.next;
}

function test() {
    let nums1: number[] = [];
    let nums2: number[] = [];
    try {
        for (let k = 0; k < 10; k++) {
            for (let i = 1; i < 10; i++) {
                for (let j = 1; j < 10; j++) {
                    nums1 = Array(i)
                        .fill(undefined)
                        .map(() => Math.floor(Math.random() * 10));
                    if (nums1[nums1.length - 1] === 0) nums1[nums1.length - 1] = 1;
                    nums2 = Array(j)
                        .fill(undefined)
                        .map(() => Math.floor(Math.random() * 10));
                    if (nums2[nums2.length - 1] === 0) nums2[nums2.length - 1] = 2;
                }
                const actual = addTwoNumbers(arr2LinkedList(nums1), arr2LinkedList(nums2));
                const expected = _addTwoNumbers(arr2LinkedList(nums1), arr2LinkedList(nums2));
                let actualNode = actual;
                let expectedNode = expected;
                while (actualNode !== null) {
                    assert.notStrictEqual(expectedNode, null);
                    assert.strictEqual(actualNode.val, expectedNode!.val);
                    actualNode = actualNode.next;
                    expectedNode = expectedNode!.next;
                }
                assert.strictEqual(expectedNode, null);
            }
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(nums1);
            console.log(nums2);
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
