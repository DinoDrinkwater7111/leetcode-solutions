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
    function reorderList(head: ListNode | null): void {
        if (head === null || head.next === null || head.next.next === null) return;
        let slow = head;
        let fast = head;
        while (fast.next !== null && fast.next.next !== null) {
            slow = slow.next!;
            fast = fast.next.next;
        }
        if (fast.next !== null) fast = fast.next;
        //reverse
        {
            let curr = slow.next!;
            let next = curr.next;
            while (next !== null) {
                const next_ = next.next;
                next.next = curr;
                curr = next;
                next = next_;
            }
            slow.next!.next = null;
            slow.next = curr;
        }
        let _curr = head;
        let curr_: ListNode | null = slow.next;
        const slowNext = slow.next
        while (curr_ !== null) {
            const _next = _curr.next;
            const next_: ListNode | null = curr_.next;
            _curr.next = curr_;
            curr_.next = _next === slowNext ? null : _next;
            _curr = _next!;
            curr_ = next_;
        }
        if (_curr === slow) _curr.next = null;
    },
    function reorderList(head: ListNode | null): void {
        const nodes: ListNode[] = [];
        while (head !== null) {
            nodes.push(head);
            head = head.next;
        }
        let curr = new ListNode();
        let i = 0;
        while (i < nodes.length) {
            curr.next = nodes[i];
            curr = curr.next;
            if (nodes[i] === nodes[nodes.length - 1]) {
                nodes.pop();
                i++;
            } else {
                nodes[i] = nodes[nodes.length - 1];
            }
        }
        curr.next = null;
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
