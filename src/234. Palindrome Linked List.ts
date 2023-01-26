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
    function isPalindrome(head: ListNode | null): boolean {
        if (head!.next === null) return true;

        function reverse(start: ListNode): ListNode {
            let curr = start;
            let next = start.next;
            start.next = null;
            while (next !== null) {
                const next_ = next.next;
                next.next = curr;
                curr = next;
                next = next_;
            }
            return curr;
        }

        const vHead = new ListNode(Number.NaN, head);
        let slow = vHead;
        let fast = vHead;
        while (fast.next !== null && fast.next.next !== null) {
            slow = slow.next!;
            fast = fast.next.next;
        }
        let right: ListNode | null = fast.next === null ? reverse(slow.next!) : reverse(slow.next!.next!);
        let left = vHead.next!;
        while (right !== null && right.val === left.val) {
            left = left.next!;
            right = right.next;
        }
        return right === null;
    },
];

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
