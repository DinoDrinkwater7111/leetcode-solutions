import assert from 'assert';

const funcs = [
    function getSkyline(buildings: number[][]): number[][] {
        const heights: number[] = [];
        /** in end DESC */
        const end_heights: [number, number][] = [];
        const preResult: number[][] = [];
        function processEndSubscription(): void {
            const end_height = end_heights.pop()!;
            let l = 0;
            let r = heights.length - 1;
            while (l < r) {
                const mid = (l + r) >> 1;
                if (end_height[1] <= heights[mid]) r = mid;
                else l = mid + 1;
            }
            heights.splice(l, 1);
            if (preResult[preResult.length - 1][0] === end_height[0]) {
                preResult[preResult.length - 1][1] = heights[heights.length - 1] ?? 0;
            } else {
                preResult.push([end_height[0], heights[heights.length - 1] ?? 0]);
            }
        }
        for (let i = 0; i < buildings.length; i++) {
            const [start, end, height] = buildings[i];
            while ((end_heights[end_heights.length - 1]?.[0] ?? Number.POSITIVE_INFINITY) <= start) {
                processEndSubscription();
            }
            //subscribe end
            {
                let l = 0;
                let r = end_heights.length;
                while (l < r) {
                    const mid = (l + r) >> 1;
                    if (end_heights[mid][0] <= end) r = mid;
                    else l = mid + 1;
                }
                end_heights.splice(l, 0, [end, height]);
            }
            //add height to heights
            {
                let l = 0;
                let r = heights.length;
                while (l < r) {
                    const mid = (l + r) >> 1;
                    if (height <= heights[mid]) r = mid;
                    else l = mid + 1;
                }
                heights.splice(l, 0, height);
            }
            if (preResult[preResult.length - 1]?.[0] === start) {
                preResult[preResult.length - 1][1] = heights[heights.length - 1];
            } else {
                preResult.push([start, heights[heights.length - 1]]);
            }
        }
        while (end_heights.length > 0) processEndSubscription();
        const result = [preResult[0]];
        for (let i = 1; i < preResult.length; i++) {
            if (result[result.length - 1][1] !== preResult[i][1]) {
                result.push(preResult[i]);
            }
        }
        return result;
    },
];

type TestCase = Parameters<typeof funcs[number]>;
function* testCaseIterator(): Generator<TestCase> {
    //TODO
}

function test(testCase: TestCase, actualFuncInd: number, expectedFuncInd: number): boolean {
    try {
        const json = JSON.stringify(testCase);
        assert.deepStrictEqual(
            funcs[actualFuncInd](...(JSON.parse(json) as TestCase)),
            funcs[expectedFuncInd](...(JSON.parse(json) as TestCase))
        );
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
