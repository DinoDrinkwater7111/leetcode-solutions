import assert from 'assert';

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    if (head === null) return null;

    const candidateNodes: ListNode[] = Array(n + 1).fill(undefined);
    let currentNode: ListNode | null = head;
    let ind = 0;
    while (currentNode !== null) {
        candidateNodes[ind % candidateNodes.length] = currentNode;
        currentNode = currentNode.next;
        ind++;
    }
    if (ind === n) {
        return head.next;
    } else {
        const target = candidateNodes[(ind - n) % candidateNodes.length];
        const targetPrev = candidateNodes[(ind - n - 1) % candidateNodes.length];
        targetPrev.next = target.next;
        return head;
    }
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

function test() {
    let nums: number[] = [];
    try {
        for (let i = 1; i < 100; i++) {
            for (let n = 1; n <= i; n++) {
                nums = Array(i)
                    .fill(undefined)
                    .map((v, i) => i);
                assert.deepStrictEqual(
                    list2Arr(removeNthFromEnd(arr2list(nums), n)),
                    nums.filter((v, i) => i !== nums.length - n)
                );
            }
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(nums);
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
