import assert from 'assert';

const funcs = [
    function numBusesToDestination(routes: number[][], source: number, target: number): number {
        if (source === target) return 0;
        const busStop2routeInds = new Map<number, Set<number>>();
        for (let i = 0; i < routes.length; i++) {
            for (const busStop of routes[i]) {
                const routes = busStop2routeInds.get(busStop) ?? new Set();
                routes.add(i);
                busStop2routeInds.set(busStop, routes);
            }
        }
        //number of bus required to target at route i
        const dp = new Map<number, number>();
        const tookRouteIndSet = new Set<number>();
        const routeWithTarget = busStop2routeInds.get(target);
        if (routeWithTarget === undefined) return -1;
        function numBusesToDestinationEx(i: number): number {
            if (!dp.has(i)) {
                if (tookRouteIndSet.has(i)) return Number.POSITIVE_INFINITY;
                if (routeWithTarget!.has(i)) {
                    dp.set(i, 1);
                } else {
                    tookRouteIndSet.add(i);
                    let min = Number.POSITIVE_INFINITY;
                    for (const busStop of routes[i]) {
                        const routeInds = busStop2routeInds.get(busStop)!;
                        for (const routeInd of routeInds) {
                            min = Math.min(min, numBusesToDestinationEx(routeInd) + 1);
                        }
                    }
                    dp.set(i, min);
                    tookRouteIndSet.delete(i);
                }
            }
            return dp.get(i)!;
        }
        let result = Number.POSITIVE_INFINITY;
        for (const i of busStop2routeInds.get(source)!) result = Math.min(result, numBusesToDestinationEx(i));
        return result === Number.POSITIVE_INFINITY ? -1 : result;
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
