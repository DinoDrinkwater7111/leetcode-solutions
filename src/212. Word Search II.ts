import assert from 'assert';

const funcs = [
    function findWords(board: string[][], words: string[]): string[] {
        //TODO
    },
    /** memory optimized */
    function findWords(board: string[][], words: string[]): string[] {
        words.sort();
        function findInfInd(start: number, end: number, char: string, charInd: number): number {
            while (start < end) {
                const mid = Math.ceil((start + end) / 2);
                if ((words[mid][charInd] ?? '`') <= char) start = mid;
                else end = mid - 1;
            }
            return start;
        }
        function findSupInd(start: number, end: number, char: string, charInd: number): number {
            while (start < end) {
                const mid = (start + end) >> 1;
                if ((words[mid][charInd] ?? '`') >= char) end = mid;
                else start = mid + 1;
            }
            if (words[start][charInd] !== char) return Number.NaN;
            else return start;
        }

        const m = board.length;
        const n = board[0].length;
        const resultSet = new Set<string>();
        function dfs(i: number, j: number, start: number, end: number, charInd: number): void {
            if (board[i]?.[j] === undefined) return;
            const char = board[i][j];
            start = findSupInd(start, end, char, charInd);
            if (Number.isNaN(start)) return;
            end = findInfInd(start, end, char, charInd);
            if (charInd === words[start].length - 1) resultSet.add(words[start]);

            board[i][j] = undefined as never;
            dfs(i + 1, j, start, end, charInd + 1);
            dfs(i - 1, j, start, end, charInd + 1);
            dfs(i, j + 1, start, end, charInd + 1);
            dfs(i, j - 1, start, end, charInd + 1);
            board[i][j] = char;
        }

        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                dfs(i, j, 0, words.length - 1, 0);
            }
        }
        return Array.from(resultSet);
    },
    function findWords(board: string[][], words: string[]): string[] {
        type TreeNode = { hasWord?: boolean; nodes?: { [char: string]: TreeNode } };
        const root: TreeNode = {};
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            let curr = root;
            for (let j = 0; j < word.length; j++) {
                const char = word[j];
                curr.nodes ??= {};
                curr.nodes[char] ??= {};
                curr = curr.nodes[char];
            }
            curr.hasWord = true;
        }

        const result: string[] = [];
        const steps: [number, number][] = [];
        const offsets_i = [-1, 1, 0, 0];
        const offsets_j = [0, 0, -1, 1];
        function dfs(i: number, j: number, previous: TreeNode): void {
            const char = board[i]?.[j];
            const curr = previous.nodes?.[char];
            if (char === undefined || curr === undefined) return;
            steps.push([i, j]);
            if (curr.hasWord) {
                result.push(steps.map((step) => board[step[0]][step[1]]).join(''));
                curr.hasWord = false;
            }
            for (let k = 0; k < 4; k++) {
                const i_ = i + offsets_i[k];
                const j_ = j + offsets_j[k];
                if (steps.find((step) => step[0] === i_ && step[1] === j_)) continue;
                dfs(i_, j_, curr);
            }
            steps.pop();
        }

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                dfs(i, j, root);
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
