import assert from 'assert';

function generateParenthesis(n: number): string[] {
    const result: string[] = [];
    function generateParenthesisEx(nRemain: number, nOpened: number, str: string): void {
        if (nRemain <= 0 || nOpened < 0 || nRemain < nOpened) return;
        if (nRemain === 1 && nOpened === 1) {
            result.push(str + ')');
            return;
        }
        generateParenthesisEx(nRemain - 1, nOpened - 1, str + ')');
        generateParenthesisEx(nRemain - 1, nOpened + 1, str + '(');
    }

    generateParenthesisEx(n * 2, 0, '');
    return result;
}

function _generateParenthesis(n: number): string[] {
    const dp: string[][][] = Array(n * 2 + 1)
        .fill(undefined)
        .map(() => []);
    dp[1][1] = [')'];
    function generateParenthesisEx(nRemain: number, nOpened: number): string[] {
        if (dp[nRemain][nOpened] === undefined) {
            if (nRemain <= 0 || nOpened < 0 || nRemain < nOpened) return [];
            const startWith0 = generateParenthesisEx(nRemain - 1, nOpened - 1).map((s) => ')' + s);
            const startWith1 = generateParenthesisEx(nRemain - 1, nOpened + 1);
            for (const s of startWith1) startWith0.push('(' + s);
            dp[nRemain][nOpened] = startWith0;
        }
        return dp[nRemain][nOpened];
    }

    return generateParenthesisEx(n * 2, 0);
}

function test() {
    let n: number = 0;
    try {
        for (let i = 1; i <= 8; i++) {
            const result = generateParenthesis(n);
            const _result = _generateParenthesis(n);
            assert.deepStrictEqual(result, _result);
        }
    } catch (e) {
        console.log(n);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
