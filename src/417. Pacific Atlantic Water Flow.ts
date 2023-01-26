import assert from 'assert';

const funcs = [
    function pacificAtlantic(heights: number[][]): number[][] {
        const M = heights.length;
        const N = heights[0].length;
        const mat = heights.map((row) => Array(row.length).fill(0));
        //From Aacific
        {
            let candidates = new Set<number>();
            for (let j = 0; j < N; j++) candidates.add(j);
            for (let i = 1; i < M; i++) candidates.add(i * N);
            while (candidates.size > 0) {
                const candidates_ = new Set<number>();
                for (const candidate of candidates.values()) {
                    const i = Math.floor(candidate / N);
                    const j = candidate % N;
                    if (mat[i][j] === 0) {
                        mat[i][j] = 1;
                        if (heights[i - 1]?.[j] >= heights[i][j]) candidates_.add(candidate - N);
                        if (heights[i + 1]?.[j] >= heights[i][j]) candidates_.add(candidate + N);
                        if (heights[i]?.[j - 1] >= heights[i][j]) candidates_.add(candidate - 1);
                        if (heights[i]?.[j + 1] >= heights[i][j]) candidates_.add(candidate + 1);
                    }
                }
                candidates = candidates_;
            }
        }
        //From Atlantic
        {
            let candidates = new Set<number>();
            for (let j = 0; j < N; j++) candidates.add((M - 1) * N + j);
            for (let i = 0; i < M; i++) candidates.add((i + 1) * N - 1);
            while (candidates.size > 0) {
                const candidates_ = new Set<number>();
                for (const candidate of candidates.values()) {
                    const i = Math.floor(candidate / N);
                    const j = candidate % N;
                    if ((mat[i][j] & 0b10) === 0) {
                        mat[i][j] |= 0b10;
                        if (heights[i - 1]?.[j] >= heights[i][j]) candidates_.add(candidate - N);
                        if (heights[i + 1]?.[j] >= heights[i][j]) candidates_.add(candidate + N);
                        if (heights[i]?.[j - 1] >= heights[i][j]) candidates_.add(candidate - 1);
                        if (heights[i]?.[j + 1] >= heights[i][j]) candidates_.add(candidate + 1);
                    }
                }
                candidates = candidates_;
            }
        }
        const result: number[][] = [];
        for (let i = 0; i < M; i++) for (let j = 0; j < N; j++) if (mat[i][j] === 0b11) result.push([i, j]);
        return result;
    },
];

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
