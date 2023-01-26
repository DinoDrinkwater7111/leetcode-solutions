import assert from 'assert';

class Node {
    val: number;
    next: Node | null;
    random: Node | null;
    constructor(val?: number, next?: Node, random?: Node) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
        this.random = random === undefined ? null : random;
    }
}

const funcs = [
    function copyRandomList(head: Node | null): Node | null {
        if (head === null) return null;
        let curr: Node | null = head;
        while (curr !== null) {
            const curr_: Node | null = curr.next;
            curr.next = new Node(curr.val);
            curr.next.next = curr_;
            curr = curr_;
        }
        curr = head;
        let newCurr: Node | null = new Node();
        while (curr !== null) {
            newCurr = curr.next;
            newCurr!.random = curr.random?.next ?? null;
            curr = curr.next!.next;
        }
        const vHead = new Node();
        curr = head;
        newCurr = vHead;
        while (curr !== null) {
            newCurr.next = curr.next!;
            curr.next = curr.next!.next;
            curr = curr.next;
            newCurr = newCurr.next;
        }

        return vHead.next;
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
