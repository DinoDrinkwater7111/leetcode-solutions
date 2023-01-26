import assert from 'assert';

function getRow(rowIndex: number): number[] {
    const result: number[] = [1];
    for (let n = 2; n <= rowIndex + 1; n++) {
        let _temp = result[-1] ?? 0;
        let temp_ = result[0] ?? 0;
        for (let i = 0; i < n; i++) {
            result[i] = _temp + temp_;
            _temp = temp_;
            temp_ = result[i + 1] ?? 0;
        }
    }
    return result;
}

function _getRow(rowIndex: number): number[] {
    if (rowIndex === 0) return [1];
    const result: number[] = [];
    const previousRow = _getRow(rowIndex - 1);
    for (let i = 0; i < rowIndex + 1; i++) {
        result.push((previousRow[i - 1] ?? 0) + (previousRow[i] ?? 0));
    }
    return result;
}

function test() {
    let numRows: number = 0;
    try {
        for (numRows = 1; numRows < 50; numRows++) {
            assert.deepStrictEqual(getRow(numRows), _getRow(numRows));
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
