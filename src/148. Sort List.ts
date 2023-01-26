import assert from 'assert';

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

const funcs = [
    function sortList(head: ListNode | null): ListNode | null {
        /** @return new head */
        function mergeSort(head1: ListNode, tail1: ListNode, head2: ListNode, tail2: ListNode): ListNode {
            const vHead = new ListNode(Number.NaN);
            let curr = vHead;
            const mergedNext = tail2.next;
            while (head1 !== tail1.next && head2 !== tail2.next) {
                if (head1.val <= head2.val) {
                    curr.next = head1;
                    head1 = head1.next!;
                } else {
                    curr.next = head2;
                    head2 = head2.next!;
                }
                curr = curr.next;
            }
            if (head1 === tail1.next) {
                curr.next = head2;
            } else {
                curr.next = head1;
                tail1.next = mergedNext;
            }
            return vHead.next!;
        }

        function getTail(head: ListNode, maxLength: number): ListNode {
            let curr = new ListNode(Number.NaN, head);
            for (let i = 0; i < maxLength && curr.next !== null; i++) {
                curr = curr.next;
            }
            return curr;
        }

        const vHead = new ListNode(Number.NaN, head);
        if (vHead.next === null) return null;
        for (let subLen = 1; ; subLen <<= 1) {
            let subHead1 = vHead.next;
            let subTail1 = getTail(subHead1!, subLen);
            if (subTail1.next === null) break;
            let _subTail = vHead;
            while (subHead1 !== null) {
                const subHead2: ListNode | null = subTail1?.next ?? null;
                if (subHead2 === null) break;
                const subTail2: ListNode | null = getTail(subHead2, subLen)!;
                const mergedNext: ListNode | null = subTail2!.next;
                _subTail.next = mergeSort(subHead1, subTail1!, subHead2, subTail2!);
                if (mergedNext === null) break;
                _subTail = subTail1.next === mergedNext ? subTail1 : subTail2;
                subHead1 = mergedNext;
                subTail1 = getTail(subHead1, subLen);
            }
        }

        return vHead.next;
    },
    function sortList(head: ListNode | null): ListNode | null {
        if (head === null || head.next === null) return head;
        let vHead = new ListNode(Number.NaN, head);
        let slow = vHead;
        let fast = vHead;
        while (fast.next !== null && fast.next.next !== null) {
            slow = slow.next!;
            fast = fast.next.next;
        }
        let sorted2 = sortList(slow.next);
        slow.next = null;
        let sorted1 = sortList(vHead.next);
        const resultVhead = new ListNode(Number.NaN);
        let resultCurr = resultVhead;
        while (sorted1 !== null && sorted2 !== null) {
            if (sorted1.val <= sorted2.val) {
                resultCurr.next = sorted1;
                sorted1 = sorted1.next;
            } else {
                resultCurr.next = sorted2;
                sorted2 = sorted2.next;
            }
            resultCurr = resultCurr.next;
        }
        if (sorted1 === null) resultCurr.next = sorted2;
        else resultCurr.next = sorted1;
        return resultVhead.next;
    },
    function sortList(head: ListNode | null): ListNode | null {
        const arr: ListNode[] = [];
        while (head !== null) {
            arr.push(head);
            head = head.next;
        }
        arr.sort((a, b) => a.val - b.val);
        const vHead = new ListNode(Number.NaN);
        let curr = vHead;
        for (const node of arr) {
            curr.next = node;
            curr = curr.next;
        }
        curr.next = null;
        return vHead.next;
    },
    function sortList(head: ListNode | null): ListNode | null {
        const resultVHead = new ListNode(Number.NaN);
        let resultCurr = resultVHead;
        const vHead = new ListNode(Number.NaN, head);
        while (vHead.next !== null) {
            let minNodePrev = vHead;
            let minNode = vHead.next;
            let curr = vHead.next;
            while (curr.next !== null) {
                if (curr.next.val < minNode.val) {
                    minNodePrev = curr;
                    minNode = curr.next;
                }
                curr = curr.next;
            }
            minNodePrev.next = minNode.next;
            resultCurr.next = minNode;
            resultCurr = resultCurr.next;
            resultCurr.next = null;
        }
        return resultVHead.next;
    },
];

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

type TestCase = Parameters<typeof funcs[number]>;
function* testCaseIterator(): Generator<TestCase> {
    //TODO
}

function test(testCase: TestCase, actualFuncInd: number, expectedFuncInd: number): boolean {
    try {
        assert.deepStrictEqual(funcs[actualFuncInd](...testCase), funcs[expectedFuncInd](...testCase));
        return true;
    } catch (e) {
        console.log('❌'.repeat(32));
        console.log(`actualFuncInd: ${actualFuncInd}`);
        console.log(`expectedFuncInd: ${expectedFuncInd}`);
        console.log(`testCase: ${JSON.stringify(testCase)}`);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
        return false;
    }
}

{
    let count = 0;
    outer: for (const testCase of testCaseIterator()) {
        if (++count < 10) {
            console.log('----------------------------------------------------');
            console.log(`Testcase ${count}:`);
            console.log(JSON.stringify(testCase, undefined, 2));
        }
        for (let i = 0; i < funcs.length - 1; i++) {
            if (!test(testCase, i, i + 1)) break outer;
        }
    }
}
