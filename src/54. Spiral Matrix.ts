import assert from 'assert';

function spiralOrder(matrix: number[][]): number[] {
    let minRow = 0;
    let maxRow = matrix.length - 1;
    let minCol = 0;
    let maxCol = matrix[0].length - 1;
    const result: number[] = [];
    while (true) {
        for (let j = minCol; j <= maxCol; j++) result.push(matrix[minRow][j]);
        minRow++;
        if (minRow > maxRow || minCol > maxCol) break;
        for (let i = minRow; i <= maxRow; i++) result.push(matrix[i][maxCol]);
        maxCol--;
        if (minRow > maxRow || minCol > maxCol) break;
        for (let j = maxCol; j >= minCol; j--) result.push(matrix[maxRow][j]);
        maxRow--;
        if (minRow > maxRow || minCol > maxCol) break;
        for (let i = maxRow; i >= minRow; i--) result.push(matrix[i][minCol]);
        minCol++;
        if (minRow > maxRow || minCol > maxCol) break;
    }
    return result;
}

function _spiralOrder(matrix: number[][]): number[] {
    const directionOffsets: [number, number][] = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];
    const result: number[] = [];
    let directionOffsetInd = 0;
    let currentRow = 0;
    let currentCol = 0;
    while (matrix[currentRow]?.[currentCol] !== undefined) {
        result.push(matrix[currentRow][currentCol]);
        matrix[currentRow][currentCol] = undefined as never;
        if (
            matrix[currentRow + directionOffsets[directionOffsetInd][0]]?.[
                currentCol + directionOffsets[directionOffsetInd][1]
            ] === undefined
        ) {
            directionOffsetInd = (directionOffsetInd + 1) % directionOffsets.length;
        }
        currentRow += directionOffsets[directionOffsetInd][0];
        currentCol += directionOffsets[directionOffsetInd][1];
    }
    return result;
}
