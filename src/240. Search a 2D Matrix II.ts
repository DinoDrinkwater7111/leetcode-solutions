import assert from 'assert';

function searchMatrix(matrix: number[][], target: number): boolean {
    function findRowSupInd(rowInd: number, start: number, end: number, target: number): number {
        if (target < matrix[rowInd][start]) return start - 1;
        if (target > matrix[rowInd][end]) return end + 1;
        while (start < end) {
            const mid = (start + end) >> 1;
            if (matrix[rowInd][mid] < target) {
                start = mid + 1;
            } else {
                end = mid;
            }
        }
        return start;
    }

    function findColSupInd(colInd: number, start: number, end: number, target: number): number {
        if (target < matrix[start][colInd]) return start - 1;
        if (target > matrix[end][colInd]) return end + 1;
        while (start < end) {
            const mid = (start + end) >> 1;
            if (matrix[mid][colInd] < target) {
                start = mid + 1;
            } else {
                end = mid;
            }
        }
        return start;
    }

    let row = 0;
    let col = 0;
    let rowEnd = matrix[0].length - 1;
    let colEnd = matrix.length - 1;
    while (rowEnd >= col && colEnd >= row) {
        rowEnd = findRowSupInd(row, 0, rowEnd, target);
        if (matrix[row][rowEnd] === target) return true;
        colEnd = findColSupInd(col, 0, colEnd, target);
        if (matrix[colEnd]?.[col] === target) return true;
        row++;
        col++;
        rowEnd--;
        colEnd--;
    }
    return false;
}

function _searchMatrix(matrix: number[][], target: number): boolean {

}

//TODO