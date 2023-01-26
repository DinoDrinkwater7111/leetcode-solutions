import assert from 'assert';

const funcs = [
    function outerTrees(trees: number[][]): number[][] {
        const y2xMin: number[] = [];
        const y2xMax: number[] = [];
        for (let i = 0; i < trees.length; i++) {
            const [x, y] = trees[i];
            if (y2xMin[y] === undefined) {
                y2xMin[y] = x;
                y2xMax[y] = x;
            } else {
                y2xMin[y] = Math.min(y2xMin[y], x);
                y2xMax[y] = Math.max(y2xMax[y], x);
            }
        }
        const ys_y2xMin: number[] = [];
        for (let y = 0; y <= y2xMin.length; y++) if (y2xMin[y] !== undefined) ys_y2xMin.push(y);
        const ys_y2xMax = ys_y2xMin.slice();
        while (ys_y2xMin.length >= 3) {
            const len = ys_y2xMin.length;
            for (let i = 0; i <= ys_y2xMin.length - 3; i++) {
                const _y = ys_y2xMin[i];
                const _x = y2xMin[_y];
                const y = ys_y2xMin[i + 1];
                const x = y2xMin[y];
                const y_ = ys_y2xMin[i + 2];
                const x_ = y2xMin[y_];
                if ((y_ - _y) * _x + (y - _y) * (x_ - _x) < (y_ - _y) * x) ys_y2xMin.splice(i + 1, 1);
            }
            if (ys_y2xMin.length === len) break;
        }
        while (ys_y2xMax.length >= 3) {
            const len = ys_y2xMax.length;
            for (let i = 0; i <= ys_y2xMax.length - 3; i++) {
                const _y = ys_y2xMax[i];
                const _x = y2xMax[_y];
                const y = ys_y2xMax[i + 1];
                const x = y2xMax[y];
                const y_ = ys_y2xMax[i + 2];
                const x_ = y2xMax[y_];
                if ((y_ - _y) * _x + (y - _y) * (x_ - _x) > (y_ - _y) * x) ys_y2xMax.splice(i + 1, 1);
            }
            if (ys_y2xMax.length === len) break;
        }
        const result: number[][] = [];
        for (let i = 1; i < ys_y2xMin.length - 1; i++) {
            const y = ys_y2xMin[i];
            result.push([y2xMin[y], y]);
        }
        for (let i = 1; i < ys_y2xMax.length - 1; i++) {
            const y = ys_y2xMax[i];
            if (ys_y2xMin.includes(y) && y2xMin[y] === y2xMax[y]) continue;
            result.push([y2xMax[y], y]);
        }
        for (let i = 0; i < trees.length; i++) {
            if (trees[i][1] === ys_y2xMin[0] || trees[i][1] === ys_y2xMin[ys_y2xMin.length - 1]) result.push(trees[i]);
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
