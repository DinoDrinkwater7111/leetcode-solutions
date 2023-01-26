import assert from 'assert';

function generate(numRows: number): number[][] {
    const result: number[][] = [[1]];
    for (let n = 2; n <= numRows; n++) {
        const row: number[] = [];
        for (let i = 0; i < n; i++) {
            row.push((result[n - 2][i - 1] ?? 0) + (result[n - 2][i] ?? 0));
        }
        result.push(row);
    }
    return result;
}

function _generate(numRows: number): number[][] {
    function generateEx(n: number): number[] {
        if (n === 1) return [1];
        const result: number[] = [];
        const previousRow = generateEx(n - 1);
        for (let i = 0; i < n; i++) {
            result.push((previousRow[i - 1] ?? 0) + (previousRow[i] ?? 0));
        }
        return result;
    }
    const result: number[][] = [];
    for (let n = 1; n <= numRows; n++) {
        result.push(generateEx(n));
    }
    return result;
}

function test() {
    let numRows: number = 0;
    try {
        for (numRows = 1; numRows < 50; numRows++) {
            assert.deepStrictEqual(generate(numRows), _generate(numRows));
        }
    } catch (e) {
        console.log(numRows);
        if (e instanceof assert.AssertionError) {
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
