import assert from 'assert';

const funcs = [
    function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
        if (n === 1) return true;
        const from2tos = new Map<number, Set<number>>();
        function setFrom2tos(from: number, to: number) {
            const tos = from2tos.get(from) ?? new Set();
            tos.add(to);
            from2tos.set(from, tos);
        }
        for (let i = 0; i < edges.length; i++) {
            setFrom2tos(edges[i][0], edges[i][1]);
            setFrom2tos(edges[i][1], edges[i][0]);
        }
        let currVertices = [source];
        while (currVertices.length > 0) {
            const currVertices_ = new Set<number>();
            for (let i = 0; i < currVertices.length; i++) {
                const from = currVertices[i];
                const tos = from2tos.get(from);
                if (tos === undefined) continue;
                for (const to of tos) {
                    if (to === destination) return true;
                    currVertices_.add(to);
                }
                from2tos.delete(from);
            }
            currVertices = Array.from(currVertices_);
        }
        return false;
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
