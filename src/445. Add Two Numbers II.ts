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
    function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
        function reverse(head: ListNode): ListNode {
            let curr: ListNode | null = null;
            let next: ListNode | null = head;
            while (next !== null) {
                const next_: ListNode | null = next.next;
                next.next = curr;
                curr = next;
                next = next_;
            }
            return curr!;
        }

        l1 = reverse(l1!);
        l2 = reverse(l2!);
        const _result = new ListNode();
        let curr: ListNode | null = _result;
        let bring = false;
        while (l1 !== null || l2 !== null) {
            curr.next = new ListNode((l1?.val ?? 0) + (l2?.val ?? 0) + (bring ? 1 : 0));
            curr = curr.next;
            bring = curr.val >= 10;
            curr.val %= 10;
            l1 = l1?.next ?? null;
            l2 = l2?.next ?? null;
        }

        if (bring) {
            const result = new ListNode(1);
            result.next = reverse(_result.next!);
            return result;
        } else {
            return reverse(_result.next!);
        }
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
