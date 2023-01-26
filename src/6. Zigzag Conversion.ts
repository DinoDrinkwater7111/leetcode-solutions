import assert from 'assert';

function convert(s: string, numRows: number): string {
    if (numRows === 1) return s;

    const charArr = Array.from(s);
    const reusltCharArr: string[] = [];
    const nCharInPeriod = 2 * numRows - 2;

    for (let row = 0; row < numRows; row++) {
        let strInd = row;
        while (strInd < charArr.length) {
            if (strInd < charArr.length) {
                reusltCharArr.push(charArr[strInd]);
            }
            if (row !== 0 && row !== numRows - 1) {
                const ind2 = strInd + (numRows - 1 - row) * 2;
                if (ind2 < charArr.length) {
                    reusltCharArr.push(charArr[ind2]);
                }
            }
            strInd += nCharInPeriod;
        }
    }

    return reusltCharArr.join('');
}

function _convert(s: string, numRows: number): string {
    if (numRows === 1) return s;

    const matrix: string[][] = Array(numRows)
        .fill(undefined)
        .map(() => []);
    let row = 0;
    let col = 0;
    let stringInd = 0;
    while (stringInd < s.length) {
        const currCol = col % (numRows - 1);
        if (currCol === 0) {
            matrix[row][col] = s.charAt(stringInd);
            stringInd++;
        } else {
            if (row === numRows - 1 - currCol) {
                matrix[row][col] = s.charAt(stringInd);
                stringInd++;
            } else {
                matrix[row][col] = ' ';
            }
        }
        if (row !== numRows - 1) {
            row++;
        } else {
            row = 0;
            col++;
        }
    }
    const reusltCharArr: string[] = [];

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] !== ' ') reusltCharArr.push(matrix[i][j]);
        }
    }
    return reusltCharArr.join('');
}

function test() {
    let s: string = '';
    let nRow = 1;
    const charPool = Array(10)
        .fill(undefined)
        .map((v, i) => i.toString());
    try {
        for (let i = 1; i < 1000; i++) {
            nRow = Math.floor(Math.random() * 10) + 1;
            s = Array(i)
                .fill(undefined)
                .map(() => charPool[Math.floor(Math.random() * charPool.length)])
                .join('');
            assert.equal(convert(s, nRow), _convert(s, nRow));
        }
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            console.log(s);
            console.log(nRow);
            console.log(e.message);
        } else {
            console.error(e);
        }
    }
}
test();
