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
    function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
        let count = 0;
        const vHead = new ListNode(Number.NaN, head);
        let lead = vHead;
        let delayed = vHead;
        while (lead.next !== null) {
            lead = lead.next;
            count++;
            if (count > n) delayed = delayed.next!;
        }
        delayed.next = delayed.next?.next ?? null;
        return vHead.next;
    },
    function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
        let count = 0;
        {
            let curr = head;
            while (curr !== null) {
                curr = curr.next;
                count++;
            }
        }
        const vHead = new ListNode(Number.NaN, head);
        let curr = vHead;
        for (let i = 0; i < count - n; i++) {
            curr = curr.next!;
        }
        curr.next = curr.next?.next ?? null;
        return vHead.next;
    },
    function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
        if (head === null) return null;

        const candidateNodes: ListNode[] = [];
        let currentNode: ListNode | null = head;
        let count = 0;
        while (currentNode !== null) {
            candidateNodes[count] = currentNode;
            currentNode = currentNode.next;
            count++;
        }
        if (count === n) {
            return head.next;
        } else {
            const target = candidateNodes[count - n];
            const targetPrev = candidateNodes[count - n - 1];
            targetPrev.next = target.next;
            return head;
        }
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
function* testCaseIterator(): Generator<TestCase> {}

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
